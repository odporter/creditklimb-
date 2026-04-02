import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const status = searchParams.get('status') || 'all'
    const source = searchParams.get('source') || 'all'
    const limit = Math.min(parseInt(searchParams.get('limit') || '500'), 2000)

    // Check if we should use service role
    const useAdmin = request.headers.get('x-admin-key') === process.env.SUPABASE_SERVICE_ROLE_KEY

    // For now, return demo data that shows what the export looks like
    // Once Supabase is connected, this will export real data
    const demoLeads = [
      {
        id: 'DEMO-001',
        timestamp: new Date().toISOString(),
        name: 'Michael R.',
        email: 'michael@example.com',
        phone: '314-555-0101',
        score_range: 'Poor (300-579)',
        goal: 'Remove negative items',
        timeline: 'ASAP',
        tradeline_interest: '',
        source: 'creditklimb-landing',
        status: 'new',
        urgency: 'high',
        state: 'MO'
      },
      {
        id: 'DEMO-002',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        name: 'Jennifer T.',
        email: 'jennifer@example.com',
        phone: '314-555-0102',
        score_range: 'Fair (580-669)',
        goal: 'Improve score',
        timeline: '1-3 months',
        tradeline_interest: 'yes',
        source: 'reddit',
        status: 'new',
        urgency: 'medium',
        state: 'IL'
      }
    ]

    if (format === 'csv') {
      const headers = ['id', 'timestamp', 'name', 'email', 'phone', 'score_range', 'goal', 'timeline', 'tradeline_interest', 'source', 'status', 'state']
      const rows = demoLeads.map(lead => [
        lead.id,
        lead.timestamp,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        `"${lead.score_range}"`,
        `"${lead.goal}"`,
        `"${lead.timeline}"`,
        lead.tradeline_interest,
        lead.source,
        lead.status,
        lead.state
      ].join(','))

      const csv = [headers.join(','), ...rows].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    return NextResponse.json({
      success: true,
      note: 'Connect Supabase env vars to export real leads',
      leads: demoLeads,
      total: demoLeads.length,
      export_url: '/api/leads/export?format=csv'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
