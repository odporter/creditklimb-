import { NextRequest, NextResponse } from 'next/server'
import { writeFile, appendFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

/*
 * CREDITFIX LEAD CAPTURE API
 * 
 * Captures qualified leads and stores them for:
 * - Partner distribution (auto dealers, real estate agents, credit shops)
 * - Internal follow-up
 * - Tradeline referrals
 * 
 * Leads are stored in JSON Lines format for easy export.
 */

interface Lead {
  id: string
  timestamp: string
  name: string
  email: string
  phone: string
  scoreRange: string
  goal: string
  timeline: string
  tradelineInterest: string
  additionalInfo: string
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
      scoreRange: SCORE_LABELS[scoreRange] || scoreRange || 'Unknown',
      goal: GOAL_LABELS[goal] || goal || 'Unknown',
      timeline: TIMELINE_LABELS[timeline] || timeline || 'Unknown',
      tradelineInterest: tradelineInterest || '',
      additionalInfo: additionalInfo || '',
      source: 'creditfix-landing',
    }

    // Store lead
    const leadsDir = path.join(process.cwd(), 'data', 'leads')
    if (!existsSync(leadsDir)) {
      await mkdir(leadsDir, { recursive: true })
    }

    const leadLine = JSON.stringify(lead) + '\n'
    await appendFile(path.join(leadsDir, 'leads.jsonl'), leadLine, 'utf8')

    // TODO (production): Send welcome email via SendGrid/Resend
    // TODO (production): Add to email sequence
    // TODO (production): Score and route to relevant partners
    // TODO (production): Send SMS via Twilio if phone provided

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
  // Simple admin view to count leads (in production, add auth)
  try {
    const leadsFile = path.join(process.cwd(), 'data', 'leads', 'leads.jsonl')
    
    if (!existsSync(leadsFile)) {
      return NextResponse.json({ leads: 0, total: 0 })
    }

    const { readFile } = await import('fs/promises')
    const content = await readFile(leadsFile, 'utf8')
    const lines = content.trim().split('\n').filter(Boolean)
    const leads = lines.map(line => JSON.parse(line))

    const byGoal: Record<string, number> = {}
    const byScore: Record<string, number> = {}
    const byTimeline: Record<string, number> = {}
    let tradelineInterested = 0

    leads.forEach((lead: Lead) => {
      byGoal[lead.goal] = (byGoal[lead.goal] || 0) + 1
      byScore[lead.scoreRange] = (byScore[lead.scoreRange] || 0) + 1
      byTimeline[lead.timeline] = (byTimeline[lead.timeline] || 0) + 1
      if (lead.tradelineInterest === 'yes') tradelineInterested++
    })

    return NextResponse.json({
      total: leads.length,
      byGoal,
      byScore,
      byTimeline,
      tradelineInterested,
      recent: leads.slice(-10).reverse(),
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
