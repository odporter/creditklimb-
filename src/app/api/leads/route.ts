import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin, Lead } from '@/lib/supabase'
import { sendLeadNotification, sendLeadAutoReply } from '@/lib/email'

/*
 * CREDITKLIMB — LEADS API
 *
 * Captures qualified leads and stores them in Supabase (or memory as fallback).
 * Falls back to in-memory storage if Supabase is not configured.
 *
 * Privacy-conscious: No Supabase = no data leaves the server.
 */

const GOAL_LABELS: Record<string, string> = {
  'buy-house': 'Buy a house',
  'buy-car': 'Buy a car',
  'credit-card': 'Get a credit card',
  'lower-rate': 'Lower interest rates',
  'improve-score': 'Improve score',
  'remove-negative': 'Remove negative items',
  'other': 'Other',
}

const TIMELINE_LABELS: Record<string, string> = {
  'asap': 'ASAP',
  '1-3months': '1-3 months',
  '3-6months': '3-6 months',
  '6-12months': '6-12 months',
  'just-exploring': 'Just exploring',
}

const SCORE_LABELS: Record<string, string> = {
  'poor': 'Poor (300-579)',
  'fair': 'Fair (580-669)',
  'good': 'Good (670-739)',
  'very-good': 'Very Good (740-799)',
  'excellent': 'Excellent (800+)',
}

// In-memory fallback (Vercel serverless compatible)
const memoryLeads: Lead[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      scoreRange,
      goal,
      timeline,
      tradelineInterest,
      additionalInfo,
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const leadId = `CK-${Date.now().toString(36).toUpperCase()}`
    const timestamp = new Date().toISOString()

    const lead: Lead = {
      id: leadId,
      timestamp,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      score_range: SCORE_LABELS[scoreRange] || scoreRange || 'Unknown',
      goal: GOAL_LABELS[goal] || goal || 'Unknown',
      timeline: TIMELINE_LABELS[timeline] || timeline || 'Unknown',
      tradeline_interest: tradelineInterest || '',
      additional_info: additionalInfo?.trim() || '',
      source: 'creditklimb-landing',
    }

    // Try Supabase first, fall back to memory
    if (supabase) {
      const { error } = await supabase.from('leads').insert([lead])
      if (error) {
        console.error('Supabase insert error, falling back to memory:', error.message)
        memoryLeads.push(lead)
      }
    } else {
      memoryLeads.push(lead)
      console.log('[Leads API] Supabase not configured — stored in memory:', leadId)
    }

    // Send email notifications (graceful — won't fail the request if not configured)
    try {
      await sendLeadNotification(lead)
      await sendLeadAutoReply(lead)
    } catch (emailError) {
      console.warn('[Leads API] Email notification failed:', (emailError as Error).message)
    }

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Lead captured successfully',
    })
  } catch (error: unknown) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500)

    // Use service role client for admin dashboard (bypasses RLS for full data)
    const dbClient = supabaseAdmin || supabase

    // Try Supabase first
    if (dbClient) {
      const { data, error } = await dbClient
        .from('leads')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Supabase fetch error:', error.message)
        return NextResponse.json({
          total: memoryLeads.length,
          leads: memoryLeads.slice(-limit).reverse(),
          source: 'memory',
          note: 'Supabase query failed — using in-memory fallback',
        })
      }

      const leads = (data as Lead[]) || []

      // Aggregate analytics
      const byGoal: Record<string, number> = {}
      const byScore: Record<string, number> = {}
      const byTimeline: Record<string, number> = {}
      const byStatus: Record<string, number> = {}
      let tradelineInterested = 0
      let newCount = 0

      leads.forEach(lead => {
        byGoal[lead.goal] = (byGoal[lead.goal] || 0) + 1
        byScore[lead.score_range] = (byScore[lead.score_range] || 0) + 1
        byTimeline[lead.timeline] = (byTimeline[lead.timeline] || 0) + 1
        byStatus[lead.status || 'new'] = (byStatus[lead.status || 'new'] || 0) + 1
        if (lead.tradeline_interest === 'yes') tradelineInterested++
        if (lead.status === 'new') newCount++
      })

      // Revenue potential: leads by urgency
      const urgentCount = (byTimeline['ASAP'] || 0) + (byTimeline['1-3 months'] || 0)
      const highIntentCount = leads.filter(
        l => l.tradeline_interest === 'yes' || l.score_range.includes('Poor') || l.score_range.includes('Fair')
      ).length

      return NextResponse.json({
        total: leads.length,
        newLeads: newCount,
        byGoal,
        byScore,
        byTimeline,
        byStatus,
        tradelineInterested,
        highIntentLeads: highIntentCount,
        urgentLeads: urgentCount,
        recent: leads.slice(0, 10),
        source: 'supabase',
      })
    }

    // No Supabase — return memory leads
    const recent = memoryLeads.slice(-limit).reverse()
    return NextResponse.json({
      total: memoryLeads.length,
      leads: recent,
      source: 'memory',
      note: 'Supabase not configured — using in-memory storage. Data resets on server restart.',
    })
  } catch (error: unknown) {
    console.error('Leads fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

// DELETE — remove a lead (admin only in production)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const dbClient = supabaseAdmin || supabase

    if (dbClient) {
      const { error } = await dbClient.from('leads').delete().eq('id', id)
      if (error) {
        console.error('Supabase delete error:', error.message)
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
      }
      return NextResponse.json({ success: true, deleted: id })
    }

    // Memory fallback
    const idx = memoryLeads.findIndex(l => l.id === id)
    if (idx !== -1) {
      memoryLeads.splice(idx, 1)
      return NextResponse.json({ success: true, deleted: id, source: 'memory' })
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  } catch (error: unknown) {
    console.error('Lead delete error:', error)
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}

// PATCH — update lead status (e.g., mark as contacted)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, emailSent, followUpSent } = body

    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const updates: Partial<Lead> = {}
    if (status) updates.status = status
    if (typeof emailSent === 'boolean') updates.email_sent = emailSent
    if (typeof followUpSent === 'boolean') updates.follow_up_sent = followUpSent

    const dbClient = supabaseAdmin || supabase

    if (dbClient) {
      const { error } = await dbClient.from('leads').update(updates).eq('id', id)
      if (error) {
        console.error('Supabase update error:', error.message)
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
      }
      return NextResponse.json({ success: true, updated: id })
    }

    // Memory fallback
    const lead = memoryLeads.find(l => l.id === id)
    if (lead) {
      Object.assign(lead, updates)
      return NextResponse.json({ success: true, updated: id, source: 'memory' })
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  } catch (error: unknown) {
    console.error('Lead update error:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
