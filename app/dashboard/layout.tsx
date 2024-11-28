'use client'

import { useAuth } from '@/lib/useAuth'
import AuthLink from '../_components/authentication/AuthLink'
import NavLinks from '../_components/dashboard/NavLinks'
import SideNav from '../_components/dashboard/Sidenav'
import RedirectsAfterAuth from '../_components/authentication/RedirectsAfterAuth'
import { Spacing } from '../_containers/layout/Spacing'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) {
    return <RedirectsAfterAuth />
  }

  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto pt-4">
          <Spacing size={'lg'} />
          {children}
        </div>
        <div className="flex flex-row p-3 justify-between space-x-2 md:hidden">
          <NavLinks />
          <AuthLink />
        </div>
      </div>
    </>
  )
}
