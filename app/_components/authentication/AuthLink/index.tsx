'use client'

import Link from 'next/link'
import { PowerIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/useAuth'

const AuthLink = () => {
  const { user, logout } = useAuth()

  return user ? (
    <Link
      href="/"
      className="flex h-[48px]  grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
      onClick={logout}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Se déconnecter</div>
    </Link>
  ) : (
    <Link
      href="/login"
      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Se connecter</div>
    </Link>
  )
}

export default AuthLink
