'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Shield, FileText, CreditCard, Send, CheckCircle, Clock, AlertTriangle, ArrowRight, LogOut, User, Star, ChevronRight } from 'lucide-react'

interface UserData {
  id: string
  email: string
  plan: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if logged in by trying to fetch session
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) {
          setUser(data.user)
        } else {
          router.push('/auth/login')
        }
      })
      .catch(() => router.push('/auth/login'))
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    router.push('/')
  }

  const plans: Record<string, any> = {
    'free': { 
      name: 'Free', 
      color: 'bg-gray-100 text-gray-700', 
      features: ['Credit score calculator', 'Debt payoff planner', 'Basic dispute letters'],
      upgrade: { name: 'Full Repair', price: '$29', href: '/dispute/full' }
    },
    'starter': { 
      name: 'Starter', 
      color: 'bg-blue-100 text-blue-700', 
      features: ['1 bureau dispute letter', 'Step-by-step guidance', 'Certified mail instructions'],
      upgrade: { name: 'Full Repair', price: '$29', href: '/dispute/full' }
    },
    'full': { 
      name: 'Full Repair', 
      color: 'bg-green-100 text-green-700', 
      features: ['Unlimited bureau letters', 'All sub-bureaus', 'Furnisher notices', '60-day escalation letters', 'Pay-for-delete templates'],
      upgrade: null
    },
    'mail-service': { 
      name: 'We Handle It', 
      color: 'bg-purple-100 text-purple-700', 
      features: ['Everything in Full Repair', 'We mail all letters', 'Certified mail included', '30 and 60-day follow-up', 'Dedicated advisor'],
      upgrade: null
    },
  }

  const currentPlan = user ? (plans[user.plan] || plans['free']) : plans['free']

  if (loading) {
    return (
      <div className="min-h-screen bg-cr-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cr-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cr-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <div className="cr-container py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}</h1>
            <p className="text-cr-muted">Your credit repair dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 text-cr-muted hover:text-cr-text">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="cr-card mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full font-medium ${currentPlan.color}`}>
                {currentPlan.name} Plan
              </div>
              <div className="text-cr-muted text-sm">
                {user?.plan === 'free' ? 'Start with $1 dispute letter' : 'Full access enabled'}
              </div>
            </div>
            {currentPlan.upgrade && (
              <Link href={currentPlan.upgrade.href} className="cr-btn cr-btn-primary">
                Upgrade to {currentPlan.upgrade.name} — {currentPlan.upgrade.price}
              </Link>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          <Link href="/dispute/starter" className="cr-card hover:border-cr-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-cr-primary/10 flex items-center justify-center">
                <FileText className="text-cr-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold">Generate Letter</h3>
                <p className="text-cr-muted text-sm">Start for $1</p>
              </div>
            </div>
            <p className="text-cr-muted text-sm">
              Create a dispute letter for any bureau. Takes 3 minutes.
            </p>
            <div className="flex items-center gap-1 text-cr-primary text-sm font-medium mt-4">
              Start now <ArrowRight size={16} />
            </div>
          </Link>

          <Link href="/dispute/full" className="cr-card hover:border-cr-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CreditCard className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold">Full System</h3>
                <p className="text-cr-muted text-sm">All bureaus + sub-bureaus</p>
              </div>
            </div>
            <p className="text-cr-muted text-sm">
              Generate letters for all 3 bureaus, sub-bureaus, furnishers, and escalation.
            </p>
            <div className="flex items-center gap-1 text-cr-primary text-sm font-medium mt-4">
              Access system <ArrowRight size={16} />
            </div>
          </Link>

          <Link href="/learn" className="cr-card hover:border-cr-primary transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold">Learn</h3>
                <p className="text-cr-muted text-sm">Credit education</p>
              </div>
            </div>
            <p className="text-cr-muted text-sm">
              Understand how credit works. Know your rights under the FCRA.
            </p>
            <div className="flex items-center gap-1 text-cr-primary text-sm font-medium mt-4">
              Start learning <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Plan Features */}
        <div className="cr-card mb-8">
          <h2 className="text-lg font-bold mb-4">Your Plan Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {currentPlan.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="text-cr-success flex-shrink-0" size={20} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {user?.plan === 'free' && (
            <div className="mt-6 p-4 bg-cr-primary/5 border border-cr-primary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Upgrade to unlock:</h3>
              <ul className="text-sm text-cr-muted space-y-1">
                <li>• Furnisher dispute letters (directly to banks/lenders)</li>
                <li>• Sub-bureau coverage (LexisNexis, ChexSystems, etc.)</li>
                <li>• 60-day escalation letters</li>
                <li>• Pay-for-delete negotiation templates</li>
              </ul>
              <Link href="/dispute/full" className="cr-btn cr-btn-primary mt-4">
                Get Full Access — $29
              </Link>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="cr-card">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-cr-primary" size={24} />
              <h3 className="font-bold">The 30-Day Rule</h3>
            </div>
            <p className="text-cr-muted text-sm mb-4">
              When you send a dispute letter, bureaus have 30 days to investigate and respond. 
              If they don't respond, the item must be removed by law.
            </p>
            <div className="p-3 bg-cr-surface rounded-lg border border-cr-border text-sm">
              <strong>Pro tip:</strong> Send your letters via certified mail with return receipt. 
              This is your proof of mailing and creates legal accountability.
            </div>
          </div>

          <div className="cr-card">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-cr-warning" size={24} />
              <h3 className="font-bold">What Happens Next</h3>
            </div>
            <p className="text-cr-muted text-sm mb-4">
              After you mail your letters, the bureaus will typically update your report within 30-45 days. 
              If items are removed, check your updated report to confirm.
            </p>
            <div className="p-3 bg-cr-surface rounded-lg border border-cr-border text-sm">
              <strong>Note:</strong> Negative items that are accurate won't be removed. 
              Focus on items that are errors, duplicates, or not yours.
            </div>
          </div>
        </div>

        {/* CTA for Mail Service */}
        {user?.plan !== 'mail-service' && user?.plan !== 'full' && (
          <div className="cr-card mt-8 bg-gradient-to-r from-cr-primary to-blue-700 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Let Us Handle the Mailing</h3>
                <p className="opacity-90">
                  We print, sign, and mail all your letters via certified mail. You do nothing.
                </p>
              </div>
              <Link href="/dispute/mail-service" className="px-6 py-3 bg-white text-cr-primary font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                Mail Service — $49
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
