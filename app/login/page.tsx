// login/page.tsx

'use client'

import { useState } from 'react'
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
} from '../../lib/auth'
import { Spacing } from '../_containers/layout/Spacing'
import { Section } from '../_containers/layout/Section'
import { Logo } from '../_components/Logo'
import GoogleLoginButton from '../_components/authentication/GoogleLoginButton'
import EmailPasswordForm from '../_components/authentication/EmailPasswordForm'
import ResetPasswordForm from '../_components/authentication/ResetPasswordForm'
import { useRouter } from 'next/navigation'
import { Header } from '../_containers/layout/Header'
import { Footer } from '../_containers/layout/Footer'
import RedirectsAfterAuth from '../_components/authentication/RedirectsAfterAuth'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const router = useRouter()

  // Centraliser la logique de connexion
  const handleLogin = async (loginMethod: () => Promise<any>) => {
    try {
      await loginMethod()
      router.push('/dashboard')
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      alert(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      )
    }
  }

  const handleGoogleLogin = () => handleLogin(signInWithGoogle)

  const handleEmailLogin = () => {
    if (isNewUser) {
      return handleLogin(() => signUpWithEmail(email, password))
    }
    return handleLogin(() => signInWithEmail(email, password))
  }

  const handlePasswordReset = async () => {
    await resetPassword(email)
    alert('Un email pour réinitialiser votre mot de passe a été envoyé.')
  }

  return (
    <>
      <RedirectsAfterAuth />
      <Header />
      <Spacing size={'lg'} />
      <div className="flex justify-center mt-8">
        <Logo size={'sm:text-5xl text-3xl'} />
      </div>
      <Spacing size={'sm'} />
      <Section className="max-w-96 w-full">
        {showResetPassword ? (
          <ResetPasswordForm
            email={email}
            setEmail={setEmail}
            onSubmit={handlePasswordReset}
            onCancel={() => {
              setShowResetPassword(false)
            }}
          />
        ) : (
          <>
            <div className="flex justify-center">
              <GoogleLoginButton onClick={handleGoogleLogin} />
            </div>
            <div className="flex flex-row flex-nowrap items-center">
              <div className="h-0.5 bg-secondary w-full"></div>
              <div className="w-full text-nowrap p-4">
                Ou {isNewUser ? "s'inscrire" : 'se connecter'} avec
              </div>
              <div className="h-0.5 bg-secondary w-full"></div>
            </div>
            <EmailPasswordForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              isNewUser={isNewUser}
              onSubmit={handleEmailLogin}
              toggleNewUser={() => setIsNewUser(!isNewUser)}
              onResetPassword={() => setShowResetPassword(true)}
            />
          </>
        )}
      </Section>
      <Spacing size={'lg'} />
      <Footer />
    </>
  )
}

export default LoginPage
