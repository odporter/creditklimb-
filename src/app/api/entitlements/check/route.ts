import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * GET /api/entitlements/check?email=X&product=Y
 * Checks Porterful entitlements table for product access.
 * Porterful product_id for CreditKlimb: 'credit-klimb'
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')?.toLowerCase().trim()
  const product = searchParams.get('product') || 'credit-klimb'

  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from('entitlements')
    .select('id, granted_at')
    .eq('buyer_email', email)
    .eq('product_id', product)
    .eq('status', 'active')
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    email,
    product,
    has_access: !!data,
    entitlement_id: data?.id || null,
    granted_at: data?.granted_at || null,
  })
}