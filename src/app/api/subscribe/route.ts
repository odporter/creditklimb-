import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

/*
 * CREDITKLIMB — NEWSLETTER SUBSCRIBE API
 *
 * Stores newsletter signups in data/subscribers.json
 * and sends admin notification when Resend is configured.
 */

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

async function readSubscribers(): Promise<Record<string, unknown>[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeSubscribers(subscribers: Record<string, unknown>[]) {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true })
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const subscribers = await readSubscribers()

    // Deduplicate
    const existing = subscribers.find((s: any) => s.email === email.toLowerCase().trim())
    if (existing) {
      return NextResponse.json({ success: true, message: 'Already subscribed' })
    }

    const subscriber = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      email: email.toLowerCase().trim(),
      source: source || 'footer',
      subscribedAt: new Date().toISOString(),
    }

    subscribers.push(subscriber)
    await writeSubscribers(subscribers)

    // Send admin notification via Resend (when configured)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'noreply@creditklimb.com',
          to: process.env.ADMIN_EMAIL || 'support@creditklimb.com',
          subject: `📬 New newsletter subscriber: ${email}`,
          html: `<p><strong>${email}</strong> subscribed via ${source || 'footer'} at ${new Date().toLocaleString()}.</p>`,
        }),
      }).catch(err => console.warn('[Subscribe API] Resend notification failed:', err))
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
