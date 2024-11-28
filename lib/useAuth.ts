'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User, signOut } from 'firebase/auth'
import { auth } from './firebase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error)
    }
  }

  return { user, logout, loading }
}
