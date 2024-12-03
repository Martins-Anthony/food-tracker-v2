import { HomeIcon, PlusIcon, ClipboardIcon } from '@heroicons/react/24/outline'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export const links = [
  { name: 'Accueil', href: '/dashboard', icon: HomeIcon },
  { name: 'Ajouter', href: '/dashboard/add', icon: PlusIcon },
  {
    name: 'Produits',
    href: '/dashboard/products',
    icon: ClipboardIcon,
  },
]
