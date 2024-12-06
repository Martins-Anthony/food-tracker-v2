'use client'

import { useEffect, useState } from 'react'
import AddProductForm from '@/app/_components/form/AddProductForm'
import RedirectsAfterAuth from '@/app/_components/authentication/RedirectsAfterAuth'
import ProductList from '@/app/_components/ProductList'
import { Section } from '@/app/_containers/layout/Section'
import { useAuth } from '@/lib/useAuth'
import { getProducts } from '@/lib/firestore'
import { Product } from '@/lib/types/product'

export default function Page() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (user) {
      // Charger la liste des produits à la connexion
      fetchProducts()
    }
  }, [user])

  const fetchProducts = async () => {
    if (user) {
      try {
        const userProducts = await getProducts(user.uid)
        setProducts(userProducts) // Met à jour l'état local
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error)
      }
    }
  }

  const handleProductAdded = async () => {
    await fetchProducts() // Réactualiser la liste des produits après l'ajout
  }

  if (!user) {
    return <RedirectsAfterAuth />
  }

  return (
    <Section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Formulaire d'ajout */}
      <div className="col-span-1 xl:col-span-1 bg-card shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
        <AddProductForm userId={user.uid} onProductAdded={handleProductAdded} />
      </div>

      {/* Liste des produits */}
      <div className="col-span-1 xl:col-span-2 bg-card shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mes Produits</h2>
        <ProductList userId={user.uid} onProductsUpdated={fetchProducts} />
      </div>
    </Section>
  )
}
