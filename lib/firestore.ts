import { db } from './firebase'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

// Type des produits
export interface Product {
  id: string
  nom: string
  categorie: string
  number: number
  quantity: number
  expired: Date
}

export const addProduct = async (
  userId: string,
  product: {
    nom: string
    categorie: string
    number: number
    quantity: number
    expired: Date
  }
) => {
  if (!userId) {
    throw new Error("L'utilisateur n'est pas authentifié.")
  }

  if (!product.nom || !product.categorie) {
    throw new Error('Nom et catégorie sont obligatoires')
  }
  const productsRef = collection(db, `users/${userId}/products`)
  await addDoc(productsRef, product)
}

export const getProducts = async (userId: string): Promise<Product[]> => {
  const productsRef = collection(db, `users/${userId}/products`)
  const querySnapshot = await getDocs(productsRef)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      nom: data.nom || 'Inconnu', // Assure une valeur par défaut si `nom` est absent
      categorie: data.categorie || 'Non spécifié', // Valeur par défaut pour `categorie`
      number: data.number || 0, // Valeur par défaut pour `number`
      quantity: data.quantity || 0, // Valeur par défaut pour `quantity`
      expired: data.expired ? new Date(data.expired.toDate()) : new Date(), // Conversion en Date
    } as Product
  })
}

export const updateProduct = async (
  userId: string,
  productId: string,
  updatedProduct: { nom?: string; categorie?: string }
) => {
  const productRef = doc(db, `users/${userId}/products/${productId}`)
  await updateDoc(productRef, updatedProduct)
}

export const deleteProduct = async (userId: string, productId: string) => {
  const productRef = doc(db, `users/${userId}/products/${productId}`)
  await deleteDoc(productRef)
}
