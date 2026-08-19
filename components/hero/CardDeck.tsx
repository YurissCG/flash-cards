'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { FlashCard, type ExitCustom } from './FlashCard'
import { DeckProgress } from './DeckProgress'
import { DeckHint } from './DeckHint'
import { DeckComplete } from './DeckComplete'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { track } from '@/lib/analytics'
import { setInteractionSuppression } from '@/lib/popup-suppression'
import { DECK_ARIA_LABEL_PREFIX, DECK_ARIA_ROLEDESCRIPTION, DECK_NEXT_BUTTON_LABEL } from '@/content/copy'
import type { HeroCard } from '@/content/hero-cards'

export interface CardDeckProps {
  cards: HeroCard[]
  onCardDismiss?: (index: number, method: 'drag' | 'tap' | 'keyboard') => void
  onComplete?: () => void
  visibleDepth?: number
}

const HINT_TIMEOUT_MS = 8000

export function CardDeck({ cards, onCardDismiss, onComplete, visibleDepth = 4 }: CardDeckProps) {
  const [index, setIndex] = useState(0)
  const [exitCustom, setExitCustom] = useState<ExitCustom>({ dir: 1, velocity: 0 })
  const [hintVisible, setHintVisible] = useState(true)
  const alternateDirRef = useRef<1 | -1>(1)
  const completedRef = useRef(false)
  const reducedMotion = useReducedMotion()

  const total = cards.length
  const isComplete = index >= total
  const visible = cards.slice(index, index + visibleDepth)

  useEffect(() => {
    const timeout = setTimeout(() => setHintVisible(false), HINT_TIMEOUT_MS)
    return () => clearTimeout(timeout)
  }, [])

  // Suprime pop-ups (§5.5.3) enquanto o deck é a coisa saindo do lugar embaixo do dedo.
  useEffect(() => () => setInteractionSuppression('deck', false), [])

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true
      track('deck_completed')
      onComplete?.()
    }
  }, [isComplete, onComplete])

  function dismiss(method: 'drag' | 'tap' | 'keyboard', dir: 1 | -1, velocity: number) {
    if (index >= total) return
    setExitCustom({ dir, velocity })
    setHintVisible(false)
    // Alterna a direção padrão para o próximo descarte sem eixo explícito
    // (tap, espaço/enter, botão "Próximo card") — evita monotonia (§5.2.6).
    alternateDirRef.current = dir === 1 ? -1 : 1
    track('deck_card_flip', { index, method })
    onCardDismiss?.(index, method)
    setIndex((prev) => prev + 1)
  }

  function handleReset() {
    completedRef.current = false
    setIndex(0)
  }

  if (isComplete) {
    return <DeckComplete onReset={handleReset} />
  }

  const currentCard = visible[0]

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="group"
        aria-roledescription={DECK_ARIA_ROLEDESCRIPTION}
        aria-label={`${DECK_ARIA_LABEL_PREFIX} — card ${index + 1} de ${total}`}
        className="relative h-[min(62vh,460px)] w-[88vw] max-w-[380px] md:h-[480px] md:w-[360px]"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence initial={false} mode="popLayout" custom={exitCustom}>
          {visible.map((card, i) => (
            <FlashCard
              key={card.id}
              card={card}
              depth={i}
              isTop={i === 0}
              custom={exitCustom}
              reducedMotion={reducedMotion}
              nextTapDirection={alternateDirRef.current}
              onRequestDismiss={i === 0 ? dismiss : undefined}
              onDragActiveChange={i === 0 ? (active) => setInteractionSuppression('deck', active) : undefined}
            />
          ))}
        </AnimatePresence>

        <div aria-live="polite" className="sr-only">
          {currentCard ? `${currentCard.categoria}: ${currentCard.titulo}` : ''}
        </div>
      </div>

      <DeckProgress current={index + 1} total={total} />
      <DeckHint visible={hintVisible} />

      <Button variant="ghost" size="md" onClick={() => dismiss('keyboard', alternateDirRef.current, 0)} className="text-roxo-100">
        {DECK_NEXT_BUTTON_LABEL}
        <ArrowRight aria-hidden="true" strokeWidth={2.25} className="h-4 w-4" />
      </Button>
    </div>
  )
}
