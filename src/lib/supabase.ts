import { createClient } from '@supabase/supabase-js'

// ─── Supabase Client Setup ────────────────────────────────────────────────────
//
// Privacy-conscious: Supabase is self-hostable and data stays with you.
// We only connect IF credentials are provided. Falls back gracefully.
//
// For local/self-hosted Supabase:
//   docker run -d --name supabase -e POSTGRES_PASSWORD=password -p 5432:5432 supabase/postgres
//
// For managed Supabase (cloud):
//   Create project at supabase.com and add credentials to .env.local
//

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Server-side admin client (service role) — only for trusted server operations
export const supabaseAdmin =
  supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null

// ─── Database Schema (run in Supabase SQL editor) ──────────────────────────────
/*
-- Leads table for tracking inbound leads
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
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
  email_sent BOOLEAN DEFAULT FALSE,
  follow_up_sent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new' -- new, contacted, converted, lost
);

-- Contacts table for general inquiries
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' -- new, read, replied, resolved
);

-- Disputes table for tracking dispute letters generated
CREATE TABLE IF NOT EXISTS disputes (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_id TEXT,
  full_name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  ssn_last4 TEXT DEFAULT '',
  account_name TEXT NOT NULL,
  account_number TEXT DEFAULT '',
  bureau TEXT NOT NULL,
  dispute_type TEXT DEFAULT '',
  reason TEXT DEFAULT '',
  letters_generated INTEGER DEFAULT 1,
  mail_service BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'generated' -- generated, mailed, disputed, resolved
);

-- Enable Row Level Security (privacy-first)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Public read/write for leads and contacts (anonymous submissions)
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read leads" ON leads FOR SELECT USING (true);
CREATE POLICY "Public can read contacts" ON contacts FOR SELECT USING (true);

-- Service role can do everything (for admin dashboard)
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access contacts" ON contacts FOR ALL USING (auth.role() = 'service_role');
*/

// ─── Type Helpers ─────────────────────────────────────────────────────────────

export interface Lead {
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
  email_sent?: boolean
  follow_up_sent?: boolean
  status?: string
}

export interface Contact {
  id: string
  timestamp: string
  name: string
  email: string
  subject: string
  message: string
  status?: string
}

export interface Dispute {
  id: string
  timestamp: string
  user_id?: string
  full_name: string
  address: string
  city: string
  state: string
  zip: string
  ssn_last4: string
  account_name: string
  account_number: string
  bureau: string
  dispute_type: string
  reason: string
  letters_generated: number
  mail_service: boolean
  status: string
}

// ─── Connection Check ──────────────────────────────────────────────────────────

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}

export function isSupabaseAdminConfigured(): boolean {
  return !!(supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
