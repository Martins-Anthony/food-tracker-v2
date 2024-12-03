'use client'

import AddProductForm from '@/app/_components/form/AddProductFrom'
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
    <Section>
      {/* Formulaire d'ajout */}
      <div className="bg-card shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
        <AddProductForm userId={user.uid} />
      </div>
    </Section>
  )
}
