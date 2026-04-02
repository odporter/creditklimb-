import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Price IDs from env (created via Stripe dashboard or API)
const PRICES: Record<string, { priceId: string; name: string; price: number }> = {
  starter: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter_placeholder',
    name: 'CreditKlimb Starter — 1 Bureau Letter',
    price: 1,
  },
  full: {
    priceId: process.env.STRIPE_FULL_PRICE_ID || 'price_full_placeholder',
    name: 'CreditKlimb Full Repair — All Letters',
    price: 29,
  },
  'mail-service': {
    priceId: process.env.STRIPE_MAIL_SERVICE_PRICE_ID || 'price_mail_placeholder',
    name: 'CreditKlimb Mail Service — We Handle It',
    price: 49,
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tier, successUrl, cancelUrl, email, name } = body

    const plan = PRICES[tier]
    if (!plan) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const stripe = new Stripe(stripeKey)

    // Create or retrieve customer
    let customer: Stripe.Customer | undefined
    if (email) {
      const existing = await stripe.customers.list({ email, limit: 1 })
      customer = existing.data[0] || await stripe.customers.create({ email, name: name || '' })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer?.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: `CreditKlimb ${tier} — instant access after payment`,
            },
            unit_amount: plan.price * 100, // cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://creditklimb.com'}/dispute/${tier}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://creditklimb.com'}/dispute`,
      metadata: {
        tier,
        customer_email: email || '',
        customer_name: name || '',
      },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}

// GET — retrieve session status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey)
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return NextResponse.json({
    status: session.payment_status,
    tier: session.metadata?.tier,
    customerEmail: session.customer_details?.email,
    amount: session.amount_total,
  })
}
