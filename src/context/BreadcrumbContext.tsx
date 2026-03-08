'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export interface Breadcrumb {
  label: string
  href?: string
}

interface BreadcrumbContextType {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (crumbs: Breadcrumb[]) => void
  resetBreadcrumbs: () => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null)
const DEFAULT_BREADCRUMBS: Breadcrumb[] = [{ label: 'Dashboard' }]

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(() => DEFAULT_BREADCRUMBS)

  // Reset breadcrumbs when route changes
  useEffect(() => {
    setBreadcrumbs(DEFAULT_BREADCRUMBS)
  }, [pathname])

  const resetBreadcrumbs = () => {
    setBreadcrumbs(DEFAULT_BREADCRUMBS)
  }

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs, resetBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumbs must be used within BreadcrumbProvider')
  }
  return context
}
