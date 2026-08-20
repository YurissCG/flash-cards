'use client'

import { useState, type ReactNode } from 'react'
import { Hand } from 'lucide-react'
import { CardDeck } from './CardDeck'
import { CtaButton } from '@/components/ui/CtaButton'
import { Badge } from '@/components/ui/Badge'
import { HERO_COPY, DECK_HINT_COPY } from '@/content/copy'
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center lg:gap-16">
      {/* No mobile o badge "Acesso imediato" é redundante — a AnnouncementBar
          fixa no topo já mostra a mesma frase logo acima. Troca por uma dica
          de como mexer no deck, já que no mobile ele some da vista antes do
          usuário chegar na DeckHint (removida) lá embaixo do deck. No
          desktop mantém o badge original. */}
      <Badge color="roxo" className="order-1 hidden w-fit lg:order-none lg:flex lg:col-start-1">
        {HERO_COPY.badge}
      </Badge>
      <p className="order-1 flex w-fit items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-sans text-xs font-semibold text-roxo-800 lg:hidden">
        <Hand aria-hidden="true" strokeWidth={2.25} className="h-3.5 w-3.5" />
        {DECK_HINT_COPY}
      </p>

      {/* No mobile, o deck vem logo depois do badge/dica — quem abre a
          página vê e já mexe nos cards de cara, em vez de rolar por um
          headline enorme antes de chegar na parte interativa. No desktop
          (lg:), a posição explícita de coluna/linha manda e o `order` deixa
          de fazer efeito. */}
      <div className="order-2 flex justify-center lg:order-none lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
        <CardDeck cards={cards} onComplete={() => setCompleted(true)} />
      </div>

      <h1 className="order-3 text-balance font-display text-hero font-semibold text-white lg:order-none lg:col-start-1">
        {renderHeadlineWithMark(headline)}
      </h1>

      <p className="order-4 max-w-prose text-lead text-roxo-100 lg:order-none lg:col-start-1">{subheadline}</p>

      {!completed && (
        <div className="order-5 flex flex-col items-start gap-3 lg:order-none lg:col-start-1">
          <CtaButton label={ctaLabel} origem="hero" size="lg" />
          <p className="font-sans text-sm text-roxo-100">{microcopy}</p>
        </div>
      )}
    </div>
  )
}
