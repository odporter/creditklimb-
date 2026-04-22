'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface EntitlementGateProps {
  children: React.ReactNode
  product?: string
  upgradeUrl?: string
  fallbackUrl?: string
}

/**
 * EntitlementGate
 * Wraps protected product content.
 * Checks with Porterful entitlements table before granting access.
 * 
 * @param product - Porterful product_id (default: 'credit-klimb')
 * @param upgradeUrl - Where to redirect if no entitlement (default: /dispute)
 * @param fallbackUrl - Where to redirect if not logged in (default: /auth/login)
 */
export function EntitlementGate({ 
  children, 
  product = 'credit-klimb', 
  upgradeUrl = '/dispute',
  fallbackUrl = '/auth/login',
}: EntitlementGateProps) {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    const checkEntitlement = async () => {
      try {
        // Get logged-in user's email from auth
        const authRes = await fetch('/api/auth/me')
        const authData = await authRes.json()
        
        if (!authData?.user?.email) {
          router.push(fallbackUrl)
          return
        }

        const email = authData.user.email

        // Check Porterful entitlements via local API
        const entRes = await fetch(`/api/entitlements/check?email=${encodeURIComponent(email)}&product=${encodeURIComponent(product)}`)
        const entData = await entRes.json()

        if (entRes.ok && entData.has_access) {
          setHasAccess(true)
        } else {
          router.push(upgradeUrl)
        }
      } catch {
        // On error, default to locked
        router.push(upgradeUrl)
      }
    }

    checkEntitlement()
  }, [router, product, upgradeUrl, fallbackUrl])

  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-cr-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cr-primary" />
      </div>
    )
  }

  return <>{children}</>
}