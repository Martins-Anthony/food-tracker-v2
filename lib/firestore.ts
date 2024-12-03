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
  expired: string
}

export const addProduct = async (
  userId: string,
  product: Omit<Product, 'id'>
) => {
  /*
  if (!userId) {
    throw new Error("L'utilisateur n'est pas authentifié.")
  }

  if (!product.nom || !product.categorie) {
    throw new Error('Nom et catégorie sont obligatoires')
  }
  */
  const productsRef = collection(db, `users/${userId}/products`)
  await addDoc(productsRef, {
    ...product,
    expired: new Date(product.expired).toISOString(), // Toujours convertir en ISO
  })
}

export const getProducts = async (userId: string): Promise<Product[]> => {
  const productsRef = collection(db, `users/${userId}/products`)
  const querySnapshot = await getDocs(productsRef)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()

    // Vérifiez et traitez correctement la valeur de `expired`
    let expiredDate: string
    if (data.expired) {
      try {
        expiredDate =
          typeof data.expired === 'string'
            ? data.expired
            : new Date(data.expired).toISOString()
      } catch {
        expiredDate = new Date().toISOString() // Valeur par défaut en cas d'erreur
      }
    } else {
      expiredDate = new Date().toISOString() // Valeur par défaut si absent
    }

    return {
      id: doc.id,
      nom: data.nom || 'Inconnu', // Assure une valeur par défaut si `nom` est absent
      categorie: data.categorie || 'Non spécifié', // Valeur par défaut pour `categorie`
      number: data.number || 0, // Valeur par défaut pour `number`
      quantity: data.quantity || 0, // Valeur par défaut pour `quantity`
      expired: expiredDate,
    } as Product
  })
}

export const updateProduct = async (
  userId: string,
  productId: string,
  updatedProduct: Partial<Omit<Product, 'id'>>
) => {
  const productRef = doc(db, `users/${userId}/products/${productId}`)
  await updateDoc(productRef, {
    ...updatedProduct,
    expired: updatedProduct.expired
      ? new Date(updatedProduct.expired).toISOString()
      : undefined,
  })
}

export const deleteProduct = async (userId: string, productId: string) => {
  const productRef = doc(db, `users/${userId}/products/${productId}`)
  await deleteDoc(productRef)
}
