'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid'

//import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Logo } from '@/app/_components/Logo'
import { useAuth } from '@/lib/useAuth'
import AuthLink from '@/app/_components/authentication/AuthLink'

const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ChartPieIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: FingerPrintIcon,
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon,
  },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Logo size={'text-xl'} />
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <AuthLink />
        </div>
      </nav>
    </header>
  )

  /*
  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto max-w-7xl p-6 flex items-center justify-between" >
        <div className="flex items-center">
          <span className="text-lg font-bold text-indigo-600">MyApp</span>
        </div>
        <div >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg">
            <div className="p-6 flex items-center justify-between">
              <span className="text-lg font-bold text-indigo-600">MyApp</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
  */
}
