import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/*
 * CREDITFIX CONTACT API
 * 
 * Handles contact form submissions.
 * Stores in Supabase, falls back to in-memory if not configured.
 */

interface Contact {
  id: string
  timestamp: string
  name: string
  email: string
  subject: string
  message: string
}

// In-memory fallback for development
const memoryContacts: Contact[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 })
    }

    const contact: Contact = {
      id: `CONTACT-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: subject || 'general',
      message,
    }

    // Try Supabase first
    if (supabase) {
      const { error } = await supabase
        .from('contacts')
        .insert([contact])

      if (error) {
        console.error('Supabase insert error:', error)
        // Fall back to memory
        memoryContacts.push(contact)
      }
    } else {
      // No Supabase, use in-memory
      memoryContacts.push(contact)
      console.log('Contact stored in memory (Supabase not configured):', contact.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Message received. We\'ll get back to you within 24 hours.',
      contactId: contact.id,
    })
  } catch (error: any) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Supabase fetch error:', error)
        return NextResponse.json({ total: 0, contacts: [], error: 'Database error' })
      }

      return NextResponse.json({
        total: data?.length || 0,
        contacts: data || [],
      })
    }

    // No Supabase, return memory contacts
    return NextResponse.json({
      total: memoryContacts.length,
      contacts: memoryContacts.slice(-50).reverse(),
      note: 'Using in-memory storage. Configure Supabase for persistence.',
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}