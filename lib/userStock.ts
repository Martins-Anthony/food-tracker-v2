import { getDocs, collection } from 'firebase/firestore'
import { db } from './firebase'
import { Product } from './types/product'

// Fonction pour récupérer le stock utilisateur
export const fetchUserStock = async (
  userId: string
): Promise<{ nom: string; expired: string }[]> => {
  if (!userId) {
    throw new Error("L'utilisateur n'est pas authentifié.")
  }

  const stockRef = collection(db, `users/${userId}/products`)
  const querySnapshot = await getDocs(stockRef)

  // Récupérer à la fois le nom et la date d'expiration
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      nom: data.nom || 'Inconnu', // Nom du produit
      expired: data.expired || '', // Date d'expiration
    }
  })
}
/*
export const fetchUserStock = async (userId: string): Promise<string[]> => {
  if (!userId) throw new Error("L'utilisateur n'est pas authentifié.")
  const stockRef = collection(db, `users/${userId}/products`)
  const querySnapshot = await getDocs(stockRef)
  return querySnapshot.docs.map((doc) => doc.data().nom as string)
}
*/
// Fonction pour filtrer les produits expirés
export const filterExpiredProducts = (products: Product[]): Product[] => {
  const now = new Date().toISOString()
  return products.filter((product) => product.expired > now)
}

// Fonction pour organiser le stock par catégorie
export const groupStockByCategory = (
  products: Product[]
): Record<string, Product[]> => {
  return products.reduce((acc, product) => {
    const category = product.categorie || 'Non spécifié'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {} as Record<string, Product[]>)
}
