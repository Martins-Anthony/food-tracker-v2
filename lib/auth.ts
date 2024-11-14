// lib/auth.ts
import { auth } from './firebase'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider()
  return signInWithPopup(auth, provider)
}

// Fonction pour créer un compte utilisateur avec email et mot de passe
export const signUpWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

// Connexion par email et mot de passe
export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

// Fonction de déconnexion
export const logOut = async () => {
  return signOut(auth)
}
