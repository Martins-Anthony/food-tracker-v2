// lib/auth.ts
import { auth } from './firebase'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
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

// Fonction pour envoyer un email de réinitialisation de mot de passe
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    console.log('Email de réinitialisation envoyé.')
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation",
      error
    )
    throw error
  }
}

// Fonction de déconnexion
export const logOut = async () => {
  return signOut(auth)
}
