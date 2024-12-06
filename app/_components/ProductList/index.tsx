'use client'

import React, { useEffect, useState } from 'react'
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from '../../../lib/firestore'
import { getDaysRemaining } from '../../../lib/dateUtils'
import Modal from '../Modal'
import EditProductForm from '../form/EditProductForm'
import Fields from '../form/Fields'
import { Product } from '@/lib/types/product'

const ProductList = ({
  userId,
  onProductsUpdated,
}: {
  userId: string
  onProductsUpdated?: () => void
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null) // Produit sélectionné pour modification/suppression
  const [showModal, setShowModal] = useState(false) // Contrôle de la modal
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null) // Type d'action

  useEffect(() => {
    const fetchProducts = async () => {
      const userProducts = await getProducts(userId)
      setProducts(userProducts)
      setFilteredProducts(userProducts)
    }
    fetchProducts()
  }, [userId, onProductsUpdated])

  useEffect(() => {
    const updatedProducts = products.filter(
      (product) =>
        product.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categorie.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProducts(updatedProducts)
  }, [searchQuery, products])

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setModalType('edit')
    setShowModal(true)
  }

  const confirmDelete = async (productId: string) => {
    await deleteProduct(userId, productId)
    setProducts((prev) => prev.filter((product) => product.id !== productId))
    setShowModal(false)
  }

  const saveEdit = async (updatedProduct: Product) => {
    if (selectedProduct) {
      await updateProduct(userId, selectedProduct.id, updatedProduct)
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? updatedProduct : product
        )
      )
      if (onProductsUpdated) {
        onProductsUpdated()
      } // Appeler la méthode de réactualisation
      setShowModal(false)
      setSelectedProduct(null)
    }
  }

  return (
    <div>
      <div className="p-4">
        {/* Champ de recherche */}
        <Fields
          type="text"
          placeholder="Rechercher par nom ou catégorie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="shearing-field"
        />

        {/* Tableau pour les écrans larges */}
        <div className="hidden lg:block overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Nom
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Catégorie
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Quantité
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Expiration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEdit(product)}
                >
                  <td className="text-center py-4 px-4">{product.nom}</td>
                  <td className="text-center py-4 px-4">{product.categorie}</td>
                  <td className="text-center py-4 px-4">{product.number}</td>
                  <td className="text-center py-4 px-4">{product.quantity}g</td>
                  <td className="text-center py-4 px-4">
                    {new Date(product.expired).toLocaleDateString()} (
                    {getDaysRemaining(product.expired)} jours)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cartes pour les écrans mobiles */}
        <div className="lg:hidden mt-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4"
            >
              <div>
                <p className="font-semibold">{product.nom}</p>
                <p className="text-sm text-gray-600">{product.categorie}</p>
                <p className="text-sm">
                  Expire dans {getDaysRemaining(product.expired)} jours
                </p>
              </div>
              <div>
                <p className="text-sm">{product.number}</p>
                <p className="text-sm">{product.quantity}g</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedProduct && modalType && (
        <Modal
          title={
            modalType === 'edit'
              ? 'Modifier le produit'
              : 'Supprimer le produit'
          }
          onClose={() => setShowModal(false)}
        >
          {modalType === 'edit' ? (
            <EditProductForm
              product={selectedProduct}
              onSave={saveEdit}
              onDelete={confirmDelete}
              onCancel={() => setShowModal(false)}
            />
          ) : (
            <div>
              <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
              {/*<div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
                
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
          
          </div>*/}
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

export default ProductList
