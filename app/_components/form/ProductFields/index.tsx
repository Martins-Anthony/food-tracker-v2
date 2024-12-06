import React from 'react'
import Fields from '../Fields'

const optionsSelect = [
  'Choisir une catégorie',
  'Légumes',
  'Fruits',
  'Viandes',
  'Poissons & Fruits de Mer',
  'Produits Laitiers',
  'Pâtes & Riz',
  'Épicerie Salée',
  'Épicerie Sucrée',
  'Boissons',
  'Surgelés',
  'Condiments & Sauces',
  'Pain & Viennoiseries',
  'Snacks & Apéritifs',
  'Plats Préparés',
  'Soupes',
]

interface ProductFieldsProps {
  nom: string
  setNom: (value: string) => void
  categorie: string
  setCategorie: (value: string) => void
  number: number
  setNumber: (value: number) => void
  quantity: number
  setQuantity: (value: number) => void
  expired: string
  setExpired: (value: string) => void
  handleDateChange: (value: string) => void
  daysRemainingText?: string
}

const ProductFields: React.FC<ProductFieldsProps> = ({
  nom,
  setNom,
  categorie,
  setCategorie,
  number,
  setNumber,
  quantity,
  setQuantity,
  expired,
  handleDateChange,
  daysRemainingText,
}) => {
  return (
    <ul className="space-y-4">
      <Fields
        type="text"
        id="nom"
        label="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required={true}
      />
      <Fields
        type="select"
        id="categorie"
        label="Catégorie"
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        required={true}
        options={optionsSelect}
      />
      <li className="grid gap-2">
        <ul className="flex gap-6">
          <Fields
            type="number"
            id="number"
            label="Nombre"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            required={true}
            className="w-full"
          />
          <Fields
            type="number"
            id="quantity"
            label="Quantité"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required={true}
            className="w-full"
          />
        </ul>
      </li>
      <Fields
        type="date"
        id="expired"
        label="Date d'expiration"
        value={expired.split('T')[0]}
        onChange={(e) => handleDateChange(e.target.value)}
        required={true}
      />

      <li className="mt-2 text-sm font-semibold text-gray-700">
        {daysRemainingText}
      </li>
    </ul>
  )
}

export default ProductFields
