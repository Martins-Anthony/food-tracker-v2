'use client'

import AddProductForm from '@/app/_components/AddProductFrom'
import RedirectsAfterAuth from '@/app/_components/authentication/RedirectsAfterAuth'
import DateComponent from '@/app/_components/DateComponent'
import ProductList from '@/app/_components/ProductList'
import { Section } from '@/app/_containers/layout/Section'
import { useAuth } from '@/lib/useAuth'

export default function Page() {
  const { user } = useAuth()
  if (!user) {
    return <RedirectsAfterAuth />
  }

  return (
    <Section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Formulaire d'ajout */}
      <div className="col-span-1 xl:col-span-1 bg-card shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
        <AddProductForm userId={user.uid} />
      </div>

      {/* Liste des produits */}
      <div className="col-span-1 xl:col-span-2 bg-card shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mes Produits</h2>
        <ProductList userId={user.uid} />
      </div>
    </Section>
  )
}
