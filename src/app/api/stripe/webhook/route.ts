import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin, isSupabaseConfigured, createPurchase, findPurchaseBySession } from '@/lib/purchases'

let stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', {
      // @ts-ignore - allow runtime API version from environment
    apiVersion: (process.env.STRIPE_API_VERSION || '2026-03-25.dahlia') as any,
    })
  }
  return stripe
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder'

export async function POST(request: NextRequest) {
  const stripeClient = getStripe()
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') || ''

  let event: Stripe.Event

  try {
    event = stripeClient.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('CreditKlimb Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutComplete(session)
      break
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('✅ CreditKlimb PaymentIntent succeeded:', paymentIntent.id)
      break
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error('❌ CreditKlimb Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message)
      break
    }
    default:
      console.log(`CreditKlimb: Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const email = session.customer_email || session.customer_details?.email || ''
  const name = session.customer_details?.name || session.metadata?.customer_name || ''
  const tier = session.metadata?.plan || session.metadata?.tier || 'full'
  const amount = session.amount_total || 0
  const sessionId = session.id
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : ''

  console.log('✅ CreditKlimb Payment succeeded:', sessionId)
  console.log('  Amount:', amount / 100, session.currency)
  console.log('  Tier:', tier)
  console.log('  Customer:', email)
  console.log('  Name:', name)

  // ── DB Write (Supabase) ────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    try {
      // Check if already recorded
      const existing = await findPurchaseBySession(sessionId)
      if (existing) {
        console.log('[ck-db] Purchase already recorded:', existing.id)
      } else {
        const purchaseId = await createPurchase({
          email,
          name,
          plan: tier,
          amountCents: amount,
          stripeSessionId: sessionId,
          stripePaymentIntentId: paymentIntentId,
        })
        console.log('[ck-db] Purchase recorded:', purchaseId)
      }
    } catch (err) {
      console.error('[ck-db] Failed to record purchase:', err)
    }
  } else {
    console.log('[ck-db] Supabase not configured — logging payment data')
    console.log('[ck-db]', JSON.stringify({
      customer_email: email,
      customer_name: name,
      plan: tier,
      amount_paid: amount / 100,
      stripe_session_id: sessionId,
      stripe_payment_intent: paymentIntentId,
      status: 'payment_received',
      paid_at: new Date().toISOString(),
    }))
  }

  // ── Send Confirmation Email ───────────────────────────────────────────────
  if (email) {
    sendConfirmationEmail(email, name, tier, amount / 100, sessionId).catch(err =>
      console.error('[creditklimb-webhook] Confirmation email failed:', err)
    )
  }
}

async function sendConfirmationEmail(
  email: string,
  name: string,
  tier: string,
  amount: number,
  sessionId: string
) {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.warn('[creditklimb-email] RESEND_API_KEY not set — skipping confirmation')
    console.log('[creditklimb-email] Would send to:', email, '| Plan:', tier, '| Amount:', amount)
    return
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creditklimb.com'
  const fromAddress = process.env.EMAIL_FROM || 'CreditKlimb <noreply@creditklimb.com>'

  const tierLabels: Record<string, string> = {
    starter: 'Starter — 1 Bureau Letter',
    full: 'Full Repair — All Letters',
    'mail-service': 'Mail Service — We Handle It',
  }
  const tierLabel = tierLabels[tier] || tier
  const tierDescription = tier === 'starter'
    ? 'We\'ll focus on one credit bureau to start. You\'ll receive a tailored dispute letter you can use immediately.'
    : tier === 'mail-service'
    ? 'We\'ll print, sign, and mail your dispute letters to all three bureaus — you don\'t lift a finger.'
    : 'We\'ll provide comprehensive dispute letters for all three bureaus: Equifax, Experian, and TransUnion.'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 18px; font-weight: 900; color: #fff; }
    .logo span { color: #10b981; }
    h1 { font-size: 28px; font-weight: 900; margin: 0 0 12px; color: #fff; }
    p { color: #9ca3af; line-height: 1.7; font-size: 15px; margin: 0 0 16px; }
    .card { background: #0f0f0f; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .card-title { font-size: 12px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .detail { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1f2937; }
    .detail:last-child { border-bottom: none; }
    .detail-label { color: #6b7280; font-size: 13px; }
    .detail-value { color: #fff; font-size: 13px; font-weight: 600; }
    .footer { text-align: center; color: #4b5563; font-size: 12px; margin-top: 40px; border-top: 1px solid #1f2937; padding-top: 24px; }
    .next-steps { background: #064e3b; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .next-steps p { color: #6b7280; margin: 0; font-size: 13px; }
    .next-steps strong { color: #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Credit<span>Klimb</span></div>
    </div>

    <h1>Payment Confirmed ✅</h1>
    <p>Thank you${name ? `, ${name}` : ''}! Your payment of <strong style="color:#fff">$${amount.toFixed(2)}</strong> has been received. Your credit repair letters are being prepared.</p>

    <div class="card">
      <div class="card-title">Service Details</div>
      <div class="detail">
        <span class="detail-label">Plan</span>
        <span class="detail-value">${tierLabel}</span>
      </div>
      <div class="detail">
        <span class="detail-label">Amount Paid</span>
        <span class="detail-value">$${amount.toFixed(2)}</span>
      </div>
      <div class="detail">
        <span class="detail-label">Session ID</span>
        <span class="detail-value" style="font-size:11px">${sessionId}</span>
      </div>
    </div>

    <div class="next-steps">
      <p><strong>Next step:</strong> Check your inbox — your credit repair letter(s) will be ready shortly. Visit your dashboard to track your progress.</p>
    </div>

    <div class="footer">
      CreditKlimb™ — Credit repair letters that work<br>
      Built by people who\'ve been through the system.
    </div>
  </div>
</body>
</html>
`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject: `✅ CreditKlimb payment confirmed — your letters are coming`,
      html,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Resend error: ${response.status} ${err}`)
  }

  const data = await response.json() as { id: string }
  console.log(`[creditklimb-email] Confirmation sent: ${data.id}`)
}