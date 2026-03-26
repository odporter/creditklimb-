'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Shield, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: isSignup ? 'signup' : 'login', 
          email, 
          password 
        }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      <div className="cr-container py-16">
        <div className="max-w-md mx-auto">
          <div className="cr-card">
            <div className="text-center mb-8">
              <Shield className="mx-auto mb-4 text-cr-primary" size={48} />
              <h1 className="text-2xl font-bold">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-cr-muted mt-2">
                {isSignup 
                  ? 'Sign up to access your dispute letters and dashboard'
                  : 'Sign in to access your dispute letters and dashboard'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="cr-label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cr-muted" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="cr-input pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="cr-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cr-muted" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="cr-input pl-10"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cr-btn cr-btn-primary w-full py-3"
              >
                {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
                {!loading && <ArrowRight size={18} className="ml-2" />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-cr-muted text-sm">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-cr-primary font-medium hover:underline"
                >
                  {isSignup ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>

            {!isSignup && (
              <div className="mt-6 p-4 tint-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-cr-text">
                  <strong>Demo:</strong> Enter any email and password to test the dashboard.
                  In production, this would connect to Stripe for real payments.
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-cr-border">
              <p className="text-cr-muted text-sm text-center mb-4">
                After signing up, you can upgrade to:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-3 bg-cr-bg rounded-lg text-center">
                  <div className="font-medium">Starter</div>
                  <div className="text-cr-muted">$1</div>
                </div>
                <div className="p-3 bg-cr-bg rounded-lg text-center">
                  <div className="font-medium">Full Repair</div>
                  <div className="text-cr-muted">$29</div>
                </div>
                <div className="p-3 bg-cr-bg rounded-lg text-center col-span-2">
                  <div className="font-medium">Mail Service</div>
                  <div className="text-cr-muted">$49 — We mail everything for you</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-cr-muted text-sm">
            <Link href="/" className="text-cr-primary hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
