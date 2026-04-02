import { NextRequest, NextResponse } from 'next/server'

/*
 * CREDITKLIMB — PREMIUM / CHECKOUT API
 *
 * GET:  Returns available plans
 * POST: Creates a Stripe Checkout Session and redirects to Stripe
 */

const PLANS = {
  premium: {
    name: 'Full Repair',
    price: 29,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium_placeholder',
    description: 'Everything you need to fix your credit report',
  },
  'mail-service': {
    name: 'We Handle It',
    price: 49,
    priceId: process.env.STRIPE_MAIL_SERVICE_PRICE_ID || 'price_mailservice_placeholder',
    description: 'We print, sign, and mail all dispute letters for you',
  },
}

export async function GET() {
  return NextResponse.json({ plans: PLANS })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan } = body

    const selectedPlan = PLANS[plan as keyof typeof PLANS]
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan. Use "premium" or "mail-service".' }, { status: 400 })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey || stripeSecretKey.startsWith('sk_test_your')) {
      // Demo mode — not yet configured
      return NextResponse.json({
        success: false,
        error: 'Stripe not configured',
        demo: true,
        message: 'Add STRIPE_SECRET_KEY to .env.local to enable payments',
        configureUrl: '/SETUP.md',
      })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Dynamically import stripe to avoid loading if not needed
    const Stripe = (await import('stripe')).default
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripe = new Stripe(stripeSecretKey)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `CreditKlimb™ — ${selectedPlan.name}`,
              description: selectedPlan.description,
            },
            unit_amount: selectedPlan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${origin}/dispute`,
      metadata: {
        plan,
        customer_email: body.email || '',
      },
    })

    return NextResponse.json({ success: true, checkoutUrl: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 })
  }
}
