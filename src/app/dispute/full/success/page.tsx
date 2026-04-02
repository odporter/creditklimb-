import { Suspense } from 'react'
import DisputeSuccess from '@/components/DisputeSuccess'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cr-bg" />}>
      <DisputeSuccess tier="full" />
    </Suspense>
  )
}
