import { Logo } from './_components/logo'
import { Section } from './_containers/layout/Section'
import { Spacing } from './_containers/layout/Spacing'

export default function Home() {
  return (
    <>
      <Spacing size={'2xl'} />
      <Section className="flex justify-center">
        <Logo size={'text-7xl'} />
      </Section>
    </>
  )
}
