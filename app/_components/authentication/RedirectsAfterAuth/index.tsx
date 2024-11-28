'use client'

import { useAuth } from '@/lib/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '../../Spinner'

const RedirectsAfterAuth = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirection après connexion réussie
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <Spinner />
  }

  return null // Si pas de redirection nécessaire
}

export default RedirectsAfterAuth
