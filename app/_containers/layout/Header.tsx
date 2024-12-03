'use client'

import Link from 'next/link'
import { Logo } from '@/app/_components/Logo'
import AuthLink from '@/app/_components/authentication/AuthLink'

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <Logo size={'text-xl'} />
          </Link>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <AuthLink />
        </div>
      </nav>
    </header>
  )
}
