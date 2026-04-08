import { createClient } from '@supabase/supabase-js'

// ─── Supabase Client Setup ─────────────────────────────────────────────────────
//
// CreditKlimb uses Supabase for storing customer payments and dispute records.
// Privacy-conscious: data stays with you.
//

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceKey)
}

// ─── Schema (run in Supabase SQL editor) ───────────────────────────────────────
/*
-- Purchases table for tracking paid orders
CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  name TEXT DEFAULT '',
  plan TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending',
  email_sent BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can insert purchases" ON purchases FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access purchases" ON purchases FOR ALL USING (auth.role() = 'service_role');
*/

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Purchase {
  id: string
  created_at: string
  email: string
  name: string
  plan: string
  amount_cents: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  status: 'pending' | 'completed' | 'refunded'
  email_sent: boolean
  completed_at: string | null
}

// ─── Operations ─────────────────────────────────────────────────────────────────

export async function createPurchase(data: {
  email: string
  name?: string
  plan: string
  amountCents: number
  stripeSessionId: string
  stripePaymentIntentId?: string
}): Promise<string> {
  if (!supabaseAdmin) throw new Error('Supabase not configured')
  
  const id = `ck_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  
  const { error } = await supabaseAdmin.from('purchases').insert({
    id,
    email: data.email.toLowerCase().trim(),
    name: data.name || '',
    plan: data.plan,
    amount_cents: data.amountCents,
    stripe_session_id: data.stripeSessionId,
    stripe_payment_intent_id: data.stripePaymentIntentId || null,
    status: 'completed',
    email_sent: false,
    completed_at: new Date().toISOString(),
  })
  
  if (error) throw error
  return id
}

export async function markPurchaseEmailSent(purchaseId: string): Promise<void> {
  if (!supabaseAdmin) throw new Error('Supabase not configured')
  
  const { error } = await supabaseAdmin
    .from('purchases')
    .update({ email_sent: true })
    .eq('id', purchaseId)
  
  if (error) throw error
}

export async function findPurchaseBySession(stripeSessionId: string): Promise<Purchase | null> {
  if (!supabaseAdmin) return null
  
  const { data } = await supabaseAdmin
    .from('purchases')
    .select('*')
    .eq('stripe_session_id', stripeSessionId)
    .maybeSingle()
  
  return data as Purchase | null
}