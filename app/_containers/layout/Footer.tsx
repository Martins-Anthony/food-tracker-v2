'use client'

import { scrollToSection } from '../../../lib/scrollToSection'
import { Section } from './Section'

export const Footer = () => {
  const date = new Date()

  const handleClick = () => {
    setTimeout(() => {
      scrollToSection('header')
    }, 100)
  }

  return (
    <footer className="bg-primary">
      <Section className="py-8">
        <p
          className="text-muted-foreground text-sm hover:text-secondary-foreground hover:cursor-pointer w-40"
          onClick={handleClick}
        >
          © {date.getFullYear()} Anthony Martins
        </p>
      </Section>
    </footer>
  )
}
