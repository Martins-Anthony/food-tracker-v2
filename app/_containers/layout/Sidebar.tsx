import { HomeIcon, ListBulletIcon, CogIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Sidebar = ({ user }: { user: boolean }) => {
  const navItems = user
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Mes Produits', href: '/products', icon: ListBulletIcon },
        { name: 'Paramètres', href: '/settings', icon: CogIcon },
      ]
    : [
        { name: 'Accueil', href: '/', icon: HomeIcon },
        { name: 'À propos', href: '/about', icon: CogIcon },
      ]

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4 text-lg font-bold">Food Tracker</div>
      <nav className="px-4 py-6 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-gray-700"
          >
            <item.icon className="h-5 w-5 text-gray-400" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
