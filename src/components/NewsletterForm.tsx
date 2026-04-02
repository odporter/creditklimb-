'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState('loading')
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
    } catch {}
    setState('done')
    setEmail('')
  }

  if (state === 'done') {
    return <span className="text-sm text-green-600 font-medium">✓ Subscribed!</span>
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@email.com"
        required
        className="px-3 py-2 rounded-lg border border-cr-border bg-cr-bg text-sm focus:border-cr-primary focus:outline-none w-48"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="cr-btn cr-btn-primary text-sm py-2 disabled:opacity-50"
      >
        {state === 'loading' ? <Loader2 size={14} className="animate-spin mx-auto" /> : 'Subscribe'}
      </button>
    </form>
  )
}
