import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/*
 * CREDITFIX LEAD CAPTURE API
 * 
 * Captures qualified leads and stores them in Supabase.
 * Falls back to in-memory storage if Supabase not configured.
 */

interface Lead {
  id: string
  timestamp: string
  name: string
  email: string
  phone: string
  score_range: string
  goal: string
  timeline: string
  tradeline_interest: string
  additional_info: string
  source: string
}

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

// In-memory fallback for development
const memoryLeads: Lead[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, scoreRange, goal, timeline, tradelineInterest, additionalInfo } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const lead: Lead = {
      id: `LEAD-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || '',
      score_range: SCORE_LABELS[scoreRange] || scoreRange || 'Unknown',
      goal: GOAL_LABELS[goal] || goal || 'Unknown',
      timeline: TIMELINE_LABELS[timeline] || timeline || 'Unknown',
      tradeline_interest: tradelineInterest || '',
      additional_info: additionalInfo || '',
      source: 'creditklimb-landing',
    }

    // Try Supabase first
    if (supabase) {
      const { error } = await supabase
        .from('leads')
        .insert([lead])

      if (error) {
        console.error('Supabase insert error:', error)
        // Fall back to memory
        memoryLeads.push(lead)
      }
    } else {
      // No Supabase, use in-memory
      memoryLeads.push(lead)
      console.log('Lead stored in memory (Supabase not configured):', lead.id)
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Lead captured successfully',
    })
  } catch (error: any) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Supabase fetch error:', error)
        return NextResponse.json({ total: 0, leads: [], error: 'Database error' })
      }

      const leads = data || []
      const byGoal: Record<string, number> = {}
      const byScore: Record<string, number> = {}
      const byTimeline: Record<string, number> = {}
      let tradelineInterested = 0

      leads.forEach((lead: Lead) => {
        byGoal[lead.goal] = (byGoal[lead.goal] || 0) + 1
        byScore[lead.score_range] = (byScore[lead.score_range] || 0) + 1
        byTimeline[lead.timeline] = (byTimeline[lead.timeline] || 0) + 1
        if (lead.tradeline_interest === 'yes') tradelineInterested++
      })

      return NextResponse.json({
        total: leads.length,
        byGoal,
        byScore,
        byTimeline,
        tradelineInterested,
        recent: leads.slice(0, 10),
      })
    }

    // No Supabase, return memory leads
    return NextResponse.json({
      total: memoryLeads.length,
      recent: memoryLeads.slice(-10).reverse(),
      note: 'Using in-memory storage. Configure Supabase for persistence.',
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}