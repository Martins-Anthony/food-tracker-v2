'use client'

import { useState } from 'react'
import { addProduct } from '../../../lib/firestore'
import {
  getDaysRemaining,
  getBackgroundGradient,
  getDaysRemainingText,
} from '../../../lib/dateUtils'

const AddProductForm = ({ userId }: { userId: string }) => {
  const [nom, setNom] = useState('')
  const [categorie, setCategorie] = useState('')
  const [number, setNumber] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [expired, setExpired] = useState('') // Utilise une chaîne pour gérer la date au format ISO
  const [daysRemainingText, setDaysRemainingText] = useState('')
  const [backgroundGradient, setBackgroundGradient] = useState('')
  const defaultClassNameInput =
    'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  //'mt-1 block w-full bg-transparent rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3'
  const defaultClassNameLabel =
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  // "block text-sm font-medium text-gray-700"
  const handleDateChange = (value: string) => {
    setExpired(value)

    if (value) {
      const daysRemaining = getDaysRemaining(value)
      const newGradient = getBackgroundGradient(value)

      console.log('Date sélectionnée:', value)
      console.log('Days remaining:', daysRemaining)
      console.log('Background Gradient:', newGradient)

      setDaysRemainingText(getDaysRemainingText(daysRemaining))
      setBackgroundGradient(newGradient) // Mise à jour de l'état
    } else {
      setDaysRemainingText('')
      setBackgroundGradient('')
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
        expired: new Date(expired), // Convertir la chaîne en objet Date
      })
      setNom('')
      setCategorie('')
      setNumber(1)
      setQuantity(1)
      setExpired('')
      setDaysRemainingText('')
      setBackgroundGradient('')
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit :', error)
    }
  }

  return (
    <form
      key={backgroundGradient}
      onSubmit={handleSubmit}
      className={`space-y-4 p-4 rounded-lg transition-colors duration-500 ease-in-out ${backgroundGradient}`}
    >
      <ul className="space-y-4">
        <li className="grid gap-2">
          <label htmlFor="nom" className={defaultClassNameLabel}>
            Nom
          </label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className={defaultClassNameInput}
            required
          />
        </li>

        <li className="grid gap-2">
          <label
            htmlFor="categorie"
            className="block text-sm font-medium text-gray-700"
          >
            Catégorie
          </label>
          <select
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className={defaultClassNameInput}
            required
          >
            <option value="">Choisir une catégorie</option>
            <option value="Légumes">Légumes</option>
            <option value="Viandes">Viandes</option>
            <option value="Epicerie">Epicerie</option>
            <option value="Produits Laitiers">Produits Laitiers</option>
          </select>
        </li>

        <li className="grid gap-2">
          <ul className="flex gap-6">
            <li className="w-full grid gap-2">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="number"
                id="number"
                min={1}
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className={defaultClassNameInput}
                required
              />
            </li>

            <li className="w-full grid gap-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantité
              </label>
              <input
                type="number"
                id="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={defaultClassNameInput}
                required
              />
            </li>
          </ul>
        </li>

        <li className="grid gap-2">
          <label
            htmlFor="expired"
            className="block text-sm font-medium text-gray-700"
          >
            Date d'expiration
          </label>
          <input
            type="date"
            id="expired"
            value={expired}
            onChange={(e) => handleDateChange(e.target.value)}
            className={defaultClassNameInput}
            required
          />
          {daysRemainingText && (
            <p className="mt-2 text-sm font-semibold">{daysRemainingText}</p>
          )}
        </li>
      </ul>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90"
      >
        Ajouter
      </button>
    </form>
  )
}

export default AddProductForm
