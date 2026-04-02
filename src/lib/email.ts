/**
 * CreditKlimb Email Utilities
 * 
 * Sends transactional emails via Resend (https://resend.com).
 * Resend has a generous free tier and is privacy-conscious.
 * 
 * All functions are fire-and-forget — email failures never block the main request.
 */

import { Lead, Contact } from './supabase'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM || 'CreditKlimb <noreply@creditklimb.com>'
const ADMIN_EMAIL = 'support@creditklimb.com'

function isEmailConfigured(): boolean {
  return !!RESEND_API_KEY
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

async function sendEmail(options: EmailOptions): Promise<void> {
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured — would send:', options.subject, '→', options.to)
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: options.from || EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${response.status} — ${error}`)
  }
}

/**
 * Sends a lead notification to the admin when a new lead submits the intake form.
 */
export async function sendLeadNotification(lead: Lead): Promise<void> {
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured — new lead notification:', lead.email)
    return
  }

  const scoreColor = lead.score_range.includes('Poor') ? '#ef4444' 
    : lead.score_range.includes('Fair') ? '#f59e0b'
    : '#22c55e'

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🧗 New Lead — CreditKlimb</h1>
      </div>
      
      <div style="padding: 24px; background: #f8fafc;">
        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #2563eb;">${lead.email}</a></td>
            </tr>
            ${lead.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0;"><a href="tel:${lead.phone}" style="color: #2563eb;">${lead.phone}</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Credit Score</td>
              <td style="padding: 8px 0;">
                <span style="background: ${scoreColor}20; color: ${scoreColor}; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">
                  ${lead.score_range}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Goal</td>
              <td style="padding: 8px 0;">${lead.goal}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Timeline</td>
              <td style="padding: 8px 0;">${lead.timeline}</td>
            </tr>
            ${lead.tradeline_interest === 'yes' ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Tradeline?</td>
              <td style="padding: 8px 0;"><span style="background: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">YES — High Priority</span></td>
            </tr>
            ` : ''}
            ${lead.additional_info ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Notes</td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px;">${lead.additional_info}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Lead ID</td>
              <td style="padding: 8px 0; font-family: monospace; font-size: 12px; color: #94a3b8;">${lead.id}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Timestamp</td>
              <td style="padding: 8px 0; font-size: 14px; color: #94a3b8;">${new Date(lead.timestamp).toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <a href="mailto:${lead.email}?subject=Re: Your Free Credit Analysis — CreditKlimb" 
             style="flex: 1; background: #2563eb; color: white; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Reply to ${lead.email.split('@')[0]}
          </a>
          <a href="tel:${lead.phone || ''}" 
             style="flex: 1; background: #22c55e; color: white; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Call Now
          </a>
        </div>
        
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
          Reply to this email to respond directly to ${lead.name.split(' ')[0]}.
        </p>
      </div>
    </div>
  `

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `📥 New Lead: ${lead.name} — ${lead.score_range} — ${lead.goal}`,
    html,
  })
}

/**
 * Sends a lead notification to the admin when a new contact form is submitted.
 */
export async function sendContactNotification(contact: Contact): Promise<void> {
  if (!isEmailConfigured()) {
    console.log('[Email] Resend not configured — contact notification:', contact.email)
    return
  }

  const subjectLabel = contact.subject === 'general' ? 'General Inquiry' 
    : contact.subject === 'support' ? 'Support Request'
    : contact.subject === 'billing' ? 'Billing Question'
    : contact.subject === 'partnership' ? 'Partnership'
    : contact.subject === 'feedback' ? 'Feedback'
    : contact.subject

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">✉️ New Contact — CreditKlimb</h1>
      </div>
      
      <div style="padding: 24px; background: #f8fafc;">
        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${contact.email}" style="color: #2563eb;">${contact.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subject</td>
              <td style="padding: 8px 0;">
                <span style="background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">
                  ${subjectLabel}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #334155; font-size: 14px; line-height: 1.6;">${contact.message.replace(/\n/g, '<br/>')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Received</td>
              <td style="padding: 8px 0; font-size: 14px; color: #94a3b8;">${new Date(contact.timestamp).toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 16px;">
          <a href="mailto:${contact.email}?subject=Re: ${subjectLabel} — CreditKlimb" 
             style="display: block; background: #10b981; color: white; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Reply to ${contact.name}
          </a>
        </div>
      </div>
    </div>
  `

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `✉️ Contact: ${contact.name} — ${subjectLabel}`,
    html,
  })
}

/**
 * Sends an auto-reply to the lead confirming their submission.
 */
export async function sendLeadAutoReply(lead: Lead): Promise<void> {
  if (!isEmailConfigured()) {
    console.log('[Email] Would send auto-reply to:', lead.email)
    return
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🧗 CreditKlimb™</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Your Free Credit Analysis</p>
      </div>
      
      <div style="padding: 32px; background: #f8fafc;">
        <h2 style="margin: 0 0 16px; font-size: 22px;">Thanks ${lead.name.split(' ')[0]},</h2>
        
        <p style="line-height: 1.7; color: #475569; margin: 0 0 20px;">
          We've received your free credit analysis request. Here's what happens next:
        </p>
        
        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 16px;">📋 Your Submission</h3>
          <p style="margin: 4px 0; color: #64748b; font-size: 14px;">
            <strong>Goal:</strong> ${lead.goal}
          </p>
          <p style="margin: 4px 0; color: #64748b; font-size: 14px;">
            <strong>Timeline:</strong> ${lead.timeline}
          </p>
          ${lead.score_range !== 'Unknown' ? `
          <p style="margin: 4px 0; color: #64748b; font-size: 14px;">
            <strong>Score Range:</strong> ${lead.score_range}
          </p>
          ` : ''}
        </div>
        
        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 16px;">🚀 What to Do While You Wait</h3>
          <ol style="margin: 0; padding-left: 20px; color: #475569; line-height: 2;">
            <li><a href="https://www.annualcreditreport.com" style="color: #2563eb;">Get your free credit reports</a> from all 3 bureaus</li>
            <li><a href="https://creditklimb.com/dispute" style="color: #2563eb;">Start generating dispute letters</a> for any errors you find</li>
            <li>Use our <a href="https://creditklimb.com/tools" style="color: #2563eb;">free credit tools</a> to plan your strategy</li>
          </ol>
        </div>
        
        <p style="line-height: 1.7; color: #475569; margin: 0 0 20px;">
          ${lead.phone ? `A specialist may call you at <strong>${lead.phone}</strong> within 24 hours.` : `A specialist may reach out within 24 hours if you'd like personalized help.`}
        </p>
        
        <p style="line-height: 1.7; color: #475569; margin: 0 0 24px;">
          <strong>Important:</strong> We'll never sell your information. Your data stays private.
        </p>
        
        <a href="https://creditklimb.com/dispute" 
           style="display: block; background: #2563eb; color: white; text-align: center; padding: 16px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; margin-bottom: 24px;">
          Start Your Free Dispute Letters →
        </a>
        
        <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 0;">
          CreditKlimb™ — Don't just check your credit. Climb it.<br/>
          <a href="mailto:support@creditklimb.com" style="color: #94a3b8;">support@creditklimb.com</a>
        </p>
      </div>
    </div>
  `

  await sendEmail({
    to: lead.email,
    subject: `✅ Your Free Credit Analysis — CreditKlimb™`,
    html,
  })
}
