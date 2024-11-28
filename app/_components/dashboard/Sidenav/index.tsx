import Link from 'next/link'

import NavLinks from '../NavLinks'
import { Logo } from '../../Logo'
import AuthLink from '../../authentication/AuthLink'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        href="/"
      >
        <Logo size="text-2xl" />
      </Link>
      <div className="hidden md:flex grow justify-between flex-col space-x-0 space-y-2">
        <NavLinks />
        <div className="h-auto w-full grow rounded-md bg-gray-100"></div>
        <AuthLink />
      </div>
    </div>
  )
}
