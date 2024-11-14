// login/page.tsx
'use client'

import {
  signInWithGoogle,
  signInWithEmail,
  logOut,
  signUpWithEmail,
} from '../../lib/auth'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { GoogleIcon } from '../_components/icons/googleIcon'
import { Section } from '../_containers/layout/Section'
import { Logo } from '../_components/logo'
import { Spacing } from '../_containers/layout/Spacing'

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isNewUser) {
        await signUpWithEmail(email, password)
      } else {
        await signInWithEmail(email, password)
      }
    } catch (error) {
      console.error("Erreur d'authentification", error)
    }
  }

  const handleLogout = async () => {
    try {
      await logOut()
      setUser(null)
      console.log('Déconnexion réussie')
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error)
    }
  }

  console.log(`User`, user)
  return (
    <>
      <Spacing size={'lg'} />
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" />
          ) : (
            <p>Pas de photo de profil</p> // Optionnel : un message ou une image par défaut
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center mt-8">
            <Logo size={'text-5xl'} />
          </div>
          <Spacing size={'sm'} />
          <Section className="flex-col max-w-96">
            <div className="flex justify-center">
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center gap-2 text-black p-2 px-10 mb-4 rounded-md font-bold border hover:bg-slate-100"
              >
                <GoogleIcon size={24} />
                <span>Google</span>
              </button>
            </div>
            <div className="flex flex-row flex-nowrap items-center">
              <div className="h-0.5 bg-secondary w-full"></div>
              <div className="w-full text-nowrap p-4">
                Ou {isNewUser ? "s'inscrire" : 'se connecter'} avec
              </div>
              <div className="h-0.5 bg-secondary w-full"></div>
            </div>
            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md"
              >
                {isNewUser ? "S'inscrire" : 'Se connecter'}
              </button>
              <div className="flex justify-end">
                <button onClick={() => setIsNewUser(!isNewUser)}>
                  {isNewUser ? "J'ai déjà un compte" : 'Créer un compte'}
                </button>
              </div>
            </form>
          </Section>
        </>
      )}
    </>
  )
}

export default LoginPage
