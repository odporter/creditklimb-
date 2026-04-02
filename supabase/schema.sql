-- ============================================================
-- CreditKlimb Database Setup (Run in Supabase SQL Editor)
-- https://supabase.com/dashboard/project/tsdjmiqczgxnkpvirkya/sql
-- ============================================================

-- Leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  score_range TEXT DEFAULT 'Unknown',
  goal TEXT DEFAULT 'Unknown',
  timeline TEXT DEFAULT 'Unknown',
  tradeline_interest TEXT DEFAULT '',
  additional_info TEXT DEFAULT '',
  source TEXT DEFAULT 'creditklimb',
  unlock_method TEXT DEFAULT NULL,
  tier TEXT DEFAULT NULL,
  email_sent BOOLEAN DEFAULT FALSE,
  follow_up_sent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new',
  ip_address TEXT DEFAULT NULL
);

-- Email list (for newsletter/growth)
CREATE TABLE IF NOT EXISTS public.email_list (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'dispute_page',
  opted_in BOOLEAN DEFAULT TRUE
);

-- Stripe payments log
CREATE TABLE IF NOT EXISTS public.payments (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  name TEXT DEFAULT '',
  tier TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  stripe_session_id TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  unlock_method TEXT DEFAULT 'paid'
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public read/write on leads (service role needed for writes from API)
CREATE POLICY "Public can read leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Service role can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update leads" ON public.leads FOR UPDATE USING (true);

-- Email list policies
CREATE POLICY "Public can subscribe" ON public.email_list FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read email_list" ON public.email_list FOR SELECT USING (true);

-- Payments policies
CREATE POLICY "Public can read payments" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Service role can insert payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update payments" ON public.payments FOR UPDATE USING (true);
