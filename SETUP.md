# CreditKlimb™ — Setup Guide

This file documents third-party integrations that need manual activation.

---

## 1. Tawk.to Live Chat

**Status: Placeholder code added — needs activation**

Tawk.to provides a free live chat widget for customer support.

### Steps to Activate:

1. **Create a free Tawk.to account**
   - Go to [tawk.to](https://www.tawk.to) and sign up (free forever tier)
   - Verify your email address

2. **Get your Property ID**
   - Log in to your Tawk.to dashboard at [dashboard.tawk.to](https://dashboard.tawk.to)
   - Go to **Administration → Widgets**
   - Copy your **Property ID** (looks like: `abc1234d-5678-90ef-1234-56789abcdef`)

3. **Update the layout**
   - Open `src/app/layout.tsx`
   - Find `YOUR_PROPERTY_ID` and replace it with your actual Property ID:
   ```ts
   s1.src='https://embed.tawk.to/YOUR_ACTUAL_PROPERTY_ID/1';
   ```
   - Example: `s1.src='https://embed.tawk.to/abc1234d567890ef1234567890abcdef/1';`

4. **Customize the widget** (optional)
   - In Tawk.to dashboard: **Administration → Widgets → Customization**
   - Set your site name: `CreditKlimb™`
   - Set greeting messages to match your brand
   - Set offline message to capture leads when you're not online

### What it looks like:
The widget will appear as a floating chat button in the bottom-right corner of every page. Visitors can chat with you in real-time or leave a message when you're offline.

---

## 2. Stripe Payments

**Status: Code wired up — needs API keys**

### Steps to Activate:

1. **Get Stripe keys**
   - Sign up at [stripe.com](https://stripe.com)
   - Go to **Developers → API keys**
   - Copy your **Secret key** (`sk_live_...` or `sk_test_...`)

2. **Update `.env.local`**
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   ```

3. **Create Products in Stripe Dashboard** (optional — or use dynamic pricing)
   - Go to **Products → Add product**
   - Create: "Full Repair — $29" and "We Handle It — $49"
   - Copy the **Price IDs** and add to `.env.local`:
   ```
   STRIPE_PREMIUM_PRICE_ID=price_xxxxxxxxxxxx
   STRIPE_MAIL_SERVICE_PRICE_ID=price_yyyyyyyyyyyy
   ```

4. **Set up Webhooks** (for production)
   - Go to **Developers → Webhooks → Add endpoint**
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the **Webhook signing secret** to:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
   ```

---

## 3. Resend (Transactional Email)

**Status: Code wired up — needs API key**

### Steps to Activate:

1. **Get a Resend API key**
   - Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
   - Go to **API Keys → Create API key**
   - Copy the key (starts with `re_`)

2. **Update `.env.local`**
   ```
   RESEND_API_KEY=re_your_actual_key_here
   EMAIL_FROM=noreply@creditklimb.com
   ADMIN_EMAIL=support@creditklimb.com
   ```

3. **Verify your domain** (optional but recommended)
   - In Resend dashboard: **Domains → Add domain**
   - Add DNS records to verify ownership
   - This lets you send from your own domain (e.g., `support@creditklimb.com`)

---

## 4. Supabase (Database)

**Status: Fully configured if keys are set**

See `.env.local.example` for setup instructions. The app runs in memory-only mode without Supabase (data resets on server restart).

---

## Environment Variables Quick Reference

Copy `.env.local.example` to `.env.local` and fill in:

```bash
# Supabase (required for persistence)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (email notifications)
RESEND_API_KEY=re_your_resend_key
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Stripe (payments)
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
STRIPE_PREMIUM_PRICE_ID=price_xxx
STRIPE_MAIL_SERVICE_PRICE_ID=price_yyy

# Tawk.to (live chat)
# Just update YOUR_PROPERTY_ID in src/app/layout.tsx
```
