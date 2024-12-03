import React, { useState } from 'react'
import { Product } from '../../../../lib/firestore'
import { getDaysRemaining } from '@/lib/dateUtils'
import { Button } from '../../Button'
import ProductFields from '../ProductFields'

interface EditProductFormProps {
  product: Product
  onSave: (updatedProduct: Product) => void
  onDelete: (productId: string) => void
  onCancel: () => void
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onDelete,
  onCancel,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>({
    ...product,
    expired:
      typeof product.expired === 'string'
        ? product.expired
        : new Date(product.expired).toISOString(), // Convertir si nécessaire
    categorie: product.categorie || '', // Assurez-vous que `categorie` est défini
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (field: keyof Product, value: string | number) => {
    setEditedProduct({ ...editedProduct, [field]: value })
  }

  const daysRemaining = getDaysRemaining(editedProduct.expired)

  const handleSubmit = () => {
    const updatedProduct = {
      ...editedProduct,
      expired: new Date(editedProduct.expired).toISOString(), // Formater `expired` en chaîne ISO
    }
    onSave(updatedProduct)
  }

  const confirmDelete = () => {
    onDelete(product.id)
    setShowConfirmation(false)
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4 p-4 rounded-lg"
    >
      {showConfirmation ? (
        <div>
          <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={onCancel} label="Annuler" />
            <Button type="button" onClick={confirmDelete} label="Supprimer" />
          </div>
        </div>
      ) : (
        <>
          <ProductFields
            nom={editedProduct.nom}
            setNom={(value) => handleChange('nom', value)}
            categorie={editedProduct.categorie}
            setCategorie={(value) => handleChange('categorie', value)}
            number={editedProduct.number}
            setNumber={(value) => handleChange('number', value)}
            quantity={editedProduct.quantity}
            setQuantity={(value) => handleChange('quantity', value)}
            expired={editedProduct.expired}
            setExpired={(value) => handleChange('expired', value)}
            handleDateChange={(value) => handleChange('expired', value)}
          />
          <div className="flex justify-between mt-4">
            <Button
              type="button"
              onClick={() => setShowConfirmation(true)}
              label="Supprimer"
            />
            <div className="flex space-x-2">
              <Button type="button" onClick={onCancel} label="Annuler" />
              <Button
                type="button"
                onClick={handleSubmit}
                label="Enregistrer"
              />
            </div>
          </div>
        </>
      )}
    </form>
  )
}

export default EditProductForm
