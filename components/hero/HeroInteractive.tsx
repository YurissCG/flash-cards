'use client'

import { useState, type ReactNode } from 'react'
import { CardDeck } from './CardDeck'
import { CtaButton } from '@/components/ui/CtaButton'
import { Badge } from '@/components/ui/Badge'
import { HERO_COPY } from '@/content/copy'
import type { HeroCard } from '@/content/hero-cards'

export interface HeroInteractiveProps {
  headline: string
  subheadline: string
  cards: HeroCard[]
  ctaLabel: string
  // Aceito para honrar o contrato de §4.2, mas não usado diretamente: todo CTA
  // passa por CtaButton, que já resolve para SITE.checkoutUrl como fonte única.
  ctaHref: string
  microcopy: string
}

// O trecho entre *asteriscos* vira <mark> (marcação de destaque "controlada",
// §4.2) — evita tanto string com HTML embutido quanto JSX hardcoded no content.
function renderHeadlineWithMark(headline: string): ReactNode {
  const match = headline.match(/^([\s\S]*?)\*([\s\S]+?)\*([\s\S]*)$/)
  if (!match) return headline
  const [, before, marked, after] = match
  return (
    <>
      {before}
      <mark className="bg-transparent text-amarelo-400">{marked}</mark>
      {after}
    </>
  )
}

export function HeroInteractive({ headline, subheadline, cards, ctaLabel, microcopy }: HeroInteractiveProps) {
  const [completed, setCompleted] = useState(false)

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
      <Badge color="roxo" className="w-fit lg:col-start-1">
        {HERO_COPY.badge}
      </Badge>

      <h1 className="text-balance font-display text-hero font-semibold text-white lg:col-start-1">
        {renderHeadlineWithMark(headline)}
      </h1>

      <p className="max-w-prose text-lead text-roxo-100 lg:col-start-1">{subheadline}</p>

      <div className="flex justify-center lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
        <CardDeck cards={cards} onComplete={() => setCompleted(true)} />
      </div>

      {!completed && (
        <div className="flex flex-col items-start gap-3 lg:col-start-1">
          <CtaButton label={ctaLabel} origem="hero" size="lg" />
          <p className="font-sans text-sm text-roxo-100">{microcopy}</p>
        </div>
      )}
    </div>
  )
}
