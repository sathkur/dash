'use client'
import { useBreadcrumbs } from '@/context/BreadcrumbContext'
import { useEffect } from 'react'

export default function SubscriptionPage() {
  const { setBreadcrumbs } = useBreadcrumbs()

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Subscription' }
    ])
  }, [setBreadcrumbs])

  return (
    <h1 className="text-2xl font-bold">Subscription</h1>
  )
}
