import type { Metadata } from 'next'
import { LegalPageBody } from '@/components/sections/LegalPageBody'
import { Footer } from '@/components/sections/Footer'
import { PRIVACY_POLICY_COPY } from '@/content/legal'

export const metadata: Metadata = {
  title: PRIVACY_POLICY_COPY.heading,
  alternates: { canonical: '/politica-de-privacidade' },
}

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <LegalPageBody
        heading={PRIVACY_POLICY_COPY.heading}
        updatedAtLabel={PRIVACY_POLICY_COPY.updatedAtLabel}
        sections={PRIVACY_POLICY_COPY.sections}
      />
      <Footer />
    </>
  )
}
