import { Container } from '@/components/ui/Container'
import { StickyCTA } from '@/components/ui/StickyCTA'
import { HeroInteractive } from '@/components/hero/HeroInteractive'
import { AnnouncementBar } from '@/components/sections/AnnouncementBar'
import { SectionDor } from '@/components/sections/SectionDor'
import { SectionMetodologia } from '@/components/sections/SectionMetodologia'
import { SectionCategorias } from '@/components/sections/SectionCategorias'
import { SectionEntrega } from '@/components/sections/SectionEntrega'
import { SectionShowcase } from '@/components/sections/SectionShowcase'
import { SectionSobre } from '@/components/sections/SectionSobre'
import { SectionProvaSocial } from '@/components/sections/SectionProvaSocial'
import { SectionBonus } from '@/components/sections/SectionBonus'
import { SectionPreco } from '@/components/sections/SectionPreco'
import { SectionGarantia } from '@/components/sections/SectionGarantia'
import { AccordionFAQ } from '@/components/sections/AccordionFAQ'
import { SectionCTAFinal } from '@/components/sections/SectionCTAFinal'
import { Footer } from '@/components/sections/Footer'
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker'
import { HERO_CARDS } from '@/content/hero-cards'
import { HERO_COPY } from '@/content/copy'
import { SITE } from '@/content/site'

export default function Home() {
  return (
    <>
      <ScrollDepthTracker />
      <AnnouncementBar />

      <main>
        <section id="hero" className="bg-roxo-500 py-[var(--section-y-mobile)] md:py-[var(--section-y-desktop)]">
          <Container>
            <HeroInteractive
              headline={HERO_COPY.headline}
              subheadline={HERO_COPY.subheadline}
              cards={HERO_CARDS}
              ctaLabel={HERO_COPY.ctaLabel}
              ctaHref={SITE.checkoutUrl}
              microcopy={HERO_COPY.microcopy}
            />
          </Container>
        </section>

        <SectionDor />
        <SectionMetodologia />
        <SectionCategorias />
        <SectionEntrega />
        <SectionShowcase />
        <SectionSobre />
        <SectionProvaSocial />
        <SectionBonus />
        <SectionPreco />
        <SectionGarantia />
        <AccordionFAQ />
        <SectionCTAFinal />
      </main>

      <Footer />
      <StickyCTA />
    </>
  )
}
