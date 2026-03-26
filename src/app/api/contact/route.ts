import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 })
    }

    const contact = {
      id: `CONTACT-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: subject || 'general',
      message,
    }

    const contactsDir = path.join(process.cwd(), 'data', 'contacts')
    if (!existsSync(contactsDir)) {
      await mkdir(contactsDir, { recursive: true })
    }

    const line = JSON.stringify(contact) + '\n'
    await appendFile(path.join(contactsDir, 'contacts.jsonl'), line, 'utf8')

    return NextResponse.json({
      success: true,
      message: 'Message received. We\'ll get back to you within 24 hours.',
    })
  } catch (error: any) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
