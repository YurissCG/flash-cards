import type { Metadata } from 'next'
import { LegalPageBody } from '@/components/sections/LegalPageBody'
import { Footer } from '@/components/sections/Footer'
import { TERMS_OF_USE_COPY } from '@/content/legal'

export const metadata: Metadata = {
  title: TERMS_OF_USE_COPY.heading,
  alternates: { canonical: '/termos-de-uso' },
}

export default function TermosDeUsoPage() {
  return (
    <>
      <LegalPageBody
        heading={TERMS_OF_USE_COPY.heading}
        updatedAtLabel={TERMS_OF_USE_COPY.updatedAtLabel}
        sections={TERMS_OF_USE_COPY.sections}
      />
      <Footer />
    </>
  )
}
