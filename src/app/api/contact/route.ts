import { NextRequest, NextResponse } from 'next/server'
import { supabase, Contact } from '@/lib/supabase'
import { sendContactNotification } from '@/lib/email'

/*
 * CREDITKLIMB — CONTACT API
 *
 * Handles contact form submissions.
 * Stores in Supabase when configured, falls back to in-memory.
 *
 * Privacy-conscious: No Supabase = no data leaves the server.
 */

// In-memory fallback
const memoryContacts: Contact[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const contactId = `CK-CONTACT-${Date.now().toString(36).toUpperCase()}`
    const timestamp = new Date().toISOString()

    const contact: Contact = {
      id: contactId,
      timestamp,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject || 'general',
      message: message.trim(),
    }

    // Try Supabase first, fall back to memory
    if (supabase) {
      const { error } = await supabase.from('contacts').insert([contact])
      if (error) {
        console.error('Supabase insert error, falling back to memory:', error.message)
        memoryContacts.push(contact)
      }
    } else {
      memoryContacts.push(contact)
      console.log('[Contact API] Supabase not configured — stored in memory:', contactId)
    }

    // Send email notification to admin (graceful — won't fail the request)
    try {
      await sendContactNotification(contact)
    } catch (emailError) {
      console.warn('[Contact API] Email notification failed:', (emailError as Error).message)
    }

    return NextResponse.json({
      success: true,
      contactId,
      message: "Message received! We'll get back to you within 24 hours.",
    })
  } catch (error: unknown) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)
    const status = searchParams.get('status')

    // Try Supabase
    if (supabase) {
      let query = supabase
        .from('contacts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit)

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase fetch error:', error.message)
        return NextResponse.json({
          total: memoryContacts.length,
          contacts: memoryContacts.slice(-limit).reverse(),
          source: 'memory',
        })
      }

      const contacts = (data as Contact[]) || []

      // Aggregate
      const bySubject: Record<string, number> = {}
      const byStatus: Record<string, number> = {}
      contacts.forEach(c => {
        bySubject[c.subject] = (bySubject[c.subject] || 0) + 1
        byStatus[c.status || 'new'] = (byStatus[c.status || 'new'] || 0) + 1
      })

      return NextResponse.json({
        total: contacts.length,
        bySubject,
        byStatus,
        contacts,
        source: 'supabase',
      })
    }

    // No Supabase
    const recent = memoryContacts.slice(-limit).reverse()
    return NextResponse.json({
      total: memoryContacts.length,
      contacts: recent,
      source: 'memory',
      note: 'Supabase not configured — using in-memory storage',
    })
  } catch (error: unknown) {
    console.error('Contact fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}
