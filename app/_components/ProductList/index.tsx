'use client'

import { useEffect, useState } from 'react'
import { getProducts, deleteProduct, Product } from '../../../lib/firestore'

const ProductList = ({ userId }: { userId: string }) => {
  const [products, setProducts] = useState<Product[]>([]) // Typage explicite

  useEffect(() => {
    const fetchProducts = async () => {
      const userProducts = await getProducts(userId)
      setProducts(userProducts)
    }
    fetchProducts()
  }, [userId])

  const handleDelete = async (productId: string) => {
    await deleteProduct(userId, productId)
    setProducts(products.filter((product) => product.id !== productId))
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className=" py-3 text-xs font-medium text-gray-500 uppercase">
              Nom
            </th>
            <th className=" py-3 text-xs font-medium text-gray-500 uppercase">
              Catégorie
            </th>
            <th className=" py-3  text-xs font-medium text-gray-500 uppercase">
              Nombre
            </th>
            <th className=" py-3  text-xs font-medium text-gray-500 uppercase">
              Quantité
            </th>
            <th className=" py-3  text-xs font-medium text-gray-500 uppercase">
              Expiration
            </th>
            <th className=" py-3  text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="text-center py-4">{product.nom}</td>
              <td className="text-center py-4">{product.categorie}</td>
              <td className="text-center py-4">{product.number}</td>
              <td className="text-center py-4">{product.quantity}</td>
              <td className="text-center py-4">
                {new Date(product.expired).toLocaleDateString()}
              </td>
              <td className="text-center py-4">
                {/* Bouton d'action stylisé */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hidden md:inline-block"
                >
                  Supprimer
                </button>

                {/* Icône d'action pour mobile */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 md:hidden"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
