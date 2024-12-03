'use client'

import { useState } from 'react'
import { addProduct } from '../../../../lib/firestore'
import {
  getDaysRemaining,
  getBackgroundGradient,
  getDaysRemainingText,
  todayDate,
} from '../../../../lib/dateUtils'
import { Button } from '../../Button'
import ProductFields from '../ProductFields'

const AddProductForm = ({
  userId,
  onProductAdded,
}: {
  userId: string
  onProductAdded?: () => void
}) => {
  const [nom, setNom] = useState('')
  const [categorie, setCategorie] = useState('')
  const [number, setNumber] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [expired, setExpired] = useState(todayDate()) // Utilise une chaîne pour gérer la date au format ISO
  const [daysRemainingText, setDaysRemainingText] = useState('')
  // const [backgroundGradient, setBackgroundGradient] = useState('')

  const handleDateChange = (value: string) => {
    setExpired(value)

    if (value) {
      const daysRemaining = getDaysRemaining(value)
      const newGradient = getBackgroundGradient(value)

      setDaysRemainingText(getDaysRemainingText(daysRemaining))
      // setBackgroundGradient(newGradient) // Mise à jour de l'état
    } else {
      setDaysRemainingText('')
      // setBackgroundGradient('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addProduct(userId, {
        nom,
        categorie,
        number,
        quantity,
        expired, // Convertir la chaîne en objet Date
      })
      setNom('')
      setCategorie('')
      setNumber(1)
      setQuantity(1)
      setExpired('')
      setDaysRemainingText('')
      // setBackgroundGradient('')
      if (onProductAdded) {
        onProductAdded() // Appeler le callback après l'ajout
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit :', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg">
      <ProductFields
        nom={nom}
        setNom={setNom}
        categorie={categorie}
        setCategorie={setCategorie}
        number={number}
        setNumber={setNumber}
        quantity={quantity}
        setQuantity={setQuantity}
        expired={expired}
        setExpired={setExpired}
        handleDateChange={handleDateChange}
        daysRemainingText={daysRemainingText}
      />
      <Button type="submit" label="Ajouter" className="w-full" />
    </form>
  )
}

export default AddProductForm
