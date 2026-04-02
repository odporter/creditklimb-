'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import {
  Users,
  TrendingUp,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Loader2,
  BarChart3,
  Phone,
  Mail,
} from 'lucide-react'

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
  status?: string
  score?: number // computed lead score (0-100)
}

interface Analytics {
  total: number
  newLeads: number
  byGoal: Record<string, number>
  byScore: Record<string, number>
  byTimeline: Record<string, number>
  byStatus: Record<string, number>
  tradelineInterested: number
  highIntentLeads: number
  urgentLeads: number
  recent: Lead[]
}

// Compute a lead score (0-100) based on urgency signals
function computeLeadScore(lead: Lead): number {
  let score = 0
  // Timeline: ASAP = 40pts, 1-3 months = 25pts, 3-6 = 15pts
  if (lead.timeline?.toLowerCase().includes('asap')) score += 40
  else if (lead.timeline?.includes('1-3')) score += 25
  else if (lead.timeline?.includes('3-6')) score += 15
  // Poor/Fair credit = 30pts (they need help most)
  if (lead.score_range?.includes('Poor')) score += 30
  else if (lead.score_range?.includes('Fair')) score += 20
  // Tradeline interest = 20pts (high-value upsell signal)
  if (lead.tradeline_interest === 'yes') score += 20
  // Phone provided = 10pts (easier to contact)
  if (lead.phone) score += 10
  return Math.min(score, 100)
}

function isHighIntent(lead: Lead): boolean {
  const s = computeLeadScore(lead)
  return s >= 80 || lead.timeline?.toLowerCase().includes('asap')
}

export default function LeadsAdminPage() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'converted'>('all')
  const [source, setSource] = useState<string>('')

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/leads?limit=100')
      const json = await res.json()
      setData(json)
      setSource(json.source || 'unknown')
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filteredLeads = data?.recent?.filter((lead: Lead) => {
    if (filter === 'all') return true
    return lead.status === filter
  }) || []

  const scoreColor = (score: string) => {
    if (score.includes('Poor')) return 'bg-red-100 text-red-700'
    if (score.includes('Fair')) return 'bg-orange-100 text-orange-700'
    if (score.includes('Good')) return 'bg-yellow-100 text-yellow-700'
    if (score.includes('Very Good')) return 'bg-blue-100 text-blue-700'
    if (score.includes('Excellent')) return 'bg-green-100 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  const urgencyColor = (timeline: string) => {
    if (timeline.includes('ASAP')) return 'bg-red-100 text-red-700'
    if (timeline.includes('1-3')) return 'bg-orange-100 text-orange-700'
    if (timeline.includes('3-6')) return 'bg-yellow-100 text-yellow-700'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />

      <div className="cr-container py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">Lead Dashboard</h1>
              {data && (
                <span className="px-2 py-1 bg-cr-primary/10 text-cr-primary text-xs rounded-full font-medium">
                  {(data as Analytics).total || 0} total
                </span>
              )}
            </div>
            <p className="text-cr-muted text-sm">
              {source === 'supabase'
                ? 'Connected to Supabase'
                : source === 'memory'
                ? 'In-memory storage (configure Supabase for persistence)'
                : 'Loading...'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-cr-muted">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="cr-btn cr-btn-secondary text-sm"
            >
              <RefreshCw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="cr-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cr-primary/10 flex items-center justify-center">
                  <Users className="text-cr-primary" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{data.total}</div>
                  <div className="text-xs text-cr-muted">Total Leads</div>
                </div>
              </div>
            </div>

            <div className="cr-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="text-red-500" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{data.newLeads || 0}</div>
                  <div className="text-xs text-cr-muted">New (Uncontacted)</div>
                </div>
              </div>
            </div>

            <div className="cr-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Target className="text-orange-500" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{data.urgentLeads || 0}</div>
                  <div className="text-xs text-cr-muted">High Urgency</div>
                </div>
              </div>
            </div>

            <div className="cr-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="text-blue-500" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{data.highIntentLeads || 0}</div>
                  <div className="text-xs text-cr-muted">High Intent</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Analytics */}
          <div className="space-y-6">

            {/* By Score Range */}
            {data && data.byScore && Object.keys(data.byScore).length > 0 && (
              <div className="cr-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-cr-primary" />
                  Leads by Credit Score
                </h3>
                <div className="space-y-3">
                  {Object.entries(data.byScore)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([score, count]) => (
                      <div key={score} className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${scoreColor(score)}`}>
                          {score}
                        </span>
                        <div className="flex items-center gap-2 flex-1 ml-3">
                          <div className="h-2 bg-cr-border rounded-full flex-1 overflow-hidden">
                            <div
                              className="h-full bg-cr-primary rounded-full transition-all"
                              style={{ width: `${Math.min(((count as number) / (data.total || 1)) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-6 text-right">{count as number}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* By Goal */}
            {data && data.byGoal && Object.keys(data.byGoal).length > 0 && (
              <div className="cr-card">
                <h3 className="font-semibold mb-4">Leads by Goal</h3>
                <div className="space-y-3">
                  {Object.entries(data.byGoal)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([goal, count]) => (
                      <div key={goal} className="flex items-center justify-between">
                        <span className="text-sm">{goal}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-cr-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${Math.min(((count as number) / (data.total || 1)) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-5 text-right">{count as number}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* By Timeline */}
            {data && data.byTimeline && Object.keys(data.byTimeline).length > 0 && (
              <div className="cr-card">
                <h3 className="font-semibold mb-4">Leads by Urgency</h3>
                <div className="space-y-3">
                  {Object.entries(data.byTimeline)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([timeline, count]) => (
                      <div key={timeline} className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${urgencyColor(timeline)}`}>
                          {timeline}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-cr-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cr-primary rounded-full"
                              style={{ width: `${Math.min(((count as number) / (data.total || 1)) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-5 text-right">{count as number}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tradeline interest */}
            {data && (
              <div className="cr-card">
                <h3 className="font-semibold mb-3">Tradeline Interest</h3>
                <div className="text-3xl font-bold text-cr-primary mb-1">
                  {data.tradelineInterested || 0}
                </div>
                <p className="text-sm text-cr-muted">
                  leads want to learn about tradelines
                  {data.total > 0 && (
                    <span className="ml-2">
                      ({Math.round(((data.tradelineInterested || 0) / data.total) * 100)}%)
                    </span>
                  )}
                </p>
                <p className="text-xs text-cr-muted mt-2">
                  Tradeline offers are high-value upsells — prioritize these leads.
                </p>
              </div>
            )}
          </div>

          {/* Right: Recent Leads */}
          <div className="lg:col-span-2">
            <div className="cr-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Leads</h3>
                <div className="flex gap-2">
                  {(['all', 'new', 'contacted', 'converted'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        filter === f
                          ? 'bg-cr-primary text-white'
                          : 'bg-cr-bg text-cr-muted hover:bg-cr-border'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-cr-primary" size={32} />
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-cr-muted">
                  <Users className="mx-auto mb-3 opacity-30" size={40} />
                  <p>No leads yet{filter !== 'all' ? ` with status: ${filter}` : ''}</p>
                  <p className="text-sm mt-1">Share your site to start collecting leads!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLeads.map((lead: Lead) => {
                    const score = computeLeadScore(lead)
                    const highIntent = isHighIntent(lead)
                    return (
                    <div
                      key={lead.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        highIntent
                          ? 'border-red-300 bg-red-50 hover:border-red-400'
                          : 'border-cr-border bg-cr-bg hover:border-cr-primary/30'
                      }`}
                    >
                      {highIntent && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">
                            🔥 High-Intent Lead — Score {score}/100
                          </span>
                          {lead.timeline?.toLowerCase().includes('asap') && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                              ⚡ ASAP — Priority
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold">{lead.name}</span>
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-1 text-xs text-cr-muted hover:text-cr-primary"
                              >
                                <Phone size={12} />
                                {lead.phone}
                              </a>
                            )}
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1 text-xs text-cr-muted hover:text-cr-primary"
                            >
                              <Mail size={12} />
                              {lead.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className={`px-2 py-0.5 rounded font-medium ${scoreColor(lead.score_range)}`}>
                              {lead.score_range}
                            </span>
                            <span className={`px-2 py-0.5 rounded font-medium ${urgencyColor(lead.timeline)}`}>
                              {lead.timeline}
                            </span>
                            {lead.tradeline_interest === 'yes' && (
                              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                                Tradeline ✓
                              </span>
                            )}
                          </div>

                          <div className="mt-1 text-xs text-cr-muted">
                            Goal: {lead.goal}
                            {lead.additional_info && (
                              <span className="block mt-0.5 italic">
                                Note: {lead.additional_info.slice(0, 80)}
                                {lead.additional_info.length > 80 ? '...' : ''}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-cr-muted">
                            {new Date(lead.timestamp).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </div>
                          <div className="text-xs text-cr-muted mt-0.5">
                            ID: {lead.id.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              )}

              {/* CTA for more */}
              {data && data.total > 10 && (
                <div className="mt-6 p-4 bg-cr-primary/5 rounded-lg border border-cr-primary/20">
                  <p className="text-sm text-cr-muted text-center">
                    Showing 10 most recent of {data.total} total leads.{' '}
                    <Link href="/api/leads?limit=500" className="text-cr-primary underline">
                      View all in JSON format
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Action items */}
            {data && (data.newLeads || 0) > 0 && (
              <div className="cr-card mt-4 border-red-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <div className="font-semibold">
                      {data.newLeads} new lead{(data.newLeads || 0) !== 1 ? 's' : ''} need{(data.newLeads || 0) === 1 ? 's' : ''} follow-up
                    </div>
                    <p className="text-sm text-cr-muted">
                      {data.tradelineInterested > 0
                        ? `${data.tradelineInterested} interested in tradelines — prioritize these!`
                        : 'Check your email or dashboard for new submissions.'}
                    </p>
                  </div>
                  <Link href="/dashboard" className="cr-btn cr-btn-primary text-sm">
                    View Dashboard <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Setup notice for memory mode */}
        {source === 'memory' && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-bold text-blue-900 mb-2">💡 Supabase Not Configured</h3>
            <p className="text-sm text-blue-800 mb-3">
              Currently using in-memory storage. Data resets on server restart. To persist leads:
            </p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside mb-4">
              <li>Create a Supabase project at <a href="https://supabase.com" className="underline" target="_blank" rel="noopener">supabase.com</a> (or self-host)</li>
              <li>Add credentials to <code className="bg-blue-100 px-1 rounded">.env.local</code></li>
              <li>Run the SQL schema from <code className="bg-blue-100 px-1 rounded">src/lib/supabase.ts</code></li>
              <li>Restart the server</li>
            </ol>
            <code className="text-xs bg-blue-100 p-2 rounded block text-blue-900">
              NEXT_PUBLIC_SUPABASE_URL=your-url<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key<br />
              SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
            </code>
          </div>
        )}
      </div>
    </div>
  )
}
