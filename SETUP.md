# CreditKlimb — Vercel Deploy & Setup

## Step 1: Push HeirCraft to GitHub (fix missing commits)

The HeirCraft agent made changes but couldn't push. Run this ONCE from your terminal:

```bash
cd ~/Documents/toyto
gh auth login
git push origin main
```

## Step 2: Deploy CreditKlimb to Vercel

CreditKlimb already has a live project on Vercel. After updating env vars, you'll need to redeploy:

```bash
cd ~/Documents/CreditRepair
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://tsdjmiqczgxnkpvirkya.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZGptaXFjemd4bmtwdmlya3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMjk2MzYsImV4cCI6MjA4OTYwNTYzNn0._KElR6DYtARvImBdlutAMzzpSg3bOalpvFm094WaOKA
vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZGptaXFjemd4bmtwdmlya3lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDAyOTYzNiwiZXhwIjoyMDg5NjA1NjM2fQ.7PAvqsXolPTLionRlvH0caLz20KUjQGE5-e8yHzZacc
vercel env add STRIPE_SECRET_KEY
# Get from: https://dashboard.stripe.com/apikeys (use LIVE keys)
vercel env add STRIPE_WEBHOOK_SECRET
# Get from: https://dashboard.stripe.com/webhooks (after creating endpoint)
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# From same Stripe API keys page
vercel env add STRIPE_PREMIUM_PRICE_ID
# Price ID for $29 plan: price_1THmglRz80LUYyCUz6WzSnXJ
vercel env add STRIPE_MAIL_SERVICE_PRICE_ID
# Price ID for $49 plan: price_1THmgmRz80LUYyCUg2uHapN1
vercel deploy --prod
```

## Step 3: Create Stripe Webhook (for payment confirmations)

```bash
# 1. Go to https://dashboard.stripe.com/webhooks
# 2. Click "Add endpoint"
# 3. URL: https://creditklimb.com/api/stripe/webhook
# 4. Events: checkout.session.completed, payment_intent.succeeded
# 5. Copy the webhook signing secret → add to Vercel as STRIPE_WEBHOOK_SECRET
```

## Step 4: Set up Resend for email notifications

1. Go to https://resend.com and create a free account
2. Add a domain (e.g. creditklimb.com) or use their test mode with your email
3. Get API key from https://resend.com/api-keys
4. Add to Vercel:
```bash
vercel env add RESEND_API_KEY
# Paste your key from Resend
```

## Step 5: Create Supabase tables (if using Supabase for lead storage)

Go to https://supabase.com → your project → SQL Editor → run this:

```sql
-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
  status TEXT DEFAULT 'new'
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Public can insert (from the app)
CREATE POLICY "anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "anyone can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "anyone can read leads" ON leads FOR SELECT USING (true);
CREATE POLICY "anyone can read contacts" ON contacts FOR SELECT USING (true);
```

## Step 6: Set up Tawk.to live chat

1. Create free account at https://tawk.to
2. Create a property for CreditKlimb
3. Get your Property ID (looks like `xxxxxxxxxxxx/xxxxxxxx`)
4. Add to Vercel:
```bash
vercel env add NEXT_PUBLIC_TAWK_ID
# Paste your ID in format: xxxxxxxxxxxx/xxxxxxxx
vercel deploy --prod
```
   The app conditionally loads the Tawk.to widget only when this env var is set.

## Stripe Products Created

| Product | Price ID | Amount |
|---------|----------|--------|
| CreditKlimb Full Repair | `price_1THmglRz80LUYyCUz6WzSnXJ` | $29 |
| We Handle It (mail) | `price_1THmgmRz80LUYyCUg2uHapN1` | $49 |

## Revenue Model

- **$29 plan** — Full credit repair with automated dispute letters
- **$49 plan** — We Handle It — we print, sign, and mail the letters
- **Upsell** — Tradeline interest → high-ticket ($200-500/month) referrals to credit repair partners
