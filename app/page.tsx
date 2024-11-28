'use client'

import { Logo } from './_components/Logo'
import { Section } from './_containers/layout/Section'
import { Spacing } from './_containers/layout/Spacing'
import { Header } from './_containers/layout/Header'
import AuthLink from './_components/authentication/AuthLink'
import { Footer } from './_containers/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Spacing size={'2xl'} />
      <Section className="flex flex-col gap-20 mt-4 items-center">
        <h1 className="text-4xl">
          Bienvenu sur <Logo size={'text-3xl'} />
        </h1>
        <AuthLink />
      </Section>
      <Spacing size={'lg'} />
      <Footer />
    </>
  )
}
