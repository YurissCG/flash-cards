'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { CtaButton } from '@/components/ui/CtaButton'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE, SPRING } from '@/lib/motion'
import { SITE } from '@/content/site'
import { DECK_COMPLETE_COPY } from '@/content/copy'
import { HERO_CARDS } from '@/content/hero-cards'

export interface DeckCompleteProps {
  onReset: () => void
}

// Substitui o deck no mesmo espaço reservado (CLS 0, §5.2.9).
export function DeckComplete({ onReset }: DeckCompleteProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0.15 } : { ...SPRING.card, delay: 0.25 }}
      className="relative flex h-[660px] w-[88vw] max-w-[380px] flex-col items-center justify-center gap-7 rounded-xl bg-white p-8 text-center shadow-card md:h-[650px] md:w-[360px]"
    >
      {!reducedMotion && <CompleteParticles />}

      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-verde-100">
        <CheckCircle2 aria-hidden="true" strokeWidth={2} className="h-12 w-12 text-verde-500" />
      </span>

      <div className="flex flex-col gap-2">
        <p className="font-display text-h3 font-semibold text-tinta-900">{DECK_COMPLETE_COPY.titulo}</p>
        <p className="text-tinta-600">{DECK_COMPLETE_COPY.subtitulo}</p>
      </div>

      <div aria-hidden="true" className="flex flex-wrap items-center justify-center gap-2 px-2">
        {HERO_CARDS.map((card) => (
          <span key={card.id} className="rounded-full bg-roxo-50 px-2.5 py-1 text-xs font-semibold text-roxo-700">
            {card.categoria}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <CtaButton label={DECK_COMPLETE_COPY.ctaLabel} origem="hero-deck-complete" size="md" />

        <p className="text-sm text-tinta-600">
          {SITE.priceFormatted} · {DECK_COMPLETE_COPY.precoSufixo}
        </p>
      </div>

      <Button variant="link" size="md" onClick={onReset} className="text-tinta-600">
        <RotateCcw aria-hidden="true" strokeWidth={2.25} className="h-4 w-4" />
        {DECK_COMPLETE_COPY.resetLabel}
      </Button>
    </motion.div>
  )
}

const PARTICLE_COLORS = ['#5FC96B', '#FFD54A', '#FF6E8A', '#7B6BF2']
const PARTICLE_COUNT = 10
const PARTICLE_DURATION_MS = 700

// 10 partículas de 6px, animadas por 700ms e desmontadas — sem lib de confete (§5.2.9).
function CompleteParticles() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), PARTICLE_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [])

  if (!visible) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2
        const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length]
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: Math.cos(angle) * 90, y: Math.sin(angle) * 90, scale: 0.5 }}
            transition={{ duration: PARTICLE_DURATION_MS / 1000, ease: EASE.out }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 6,
              height: 6,
              borderRadius: '9999px',
              backgroundColor: color,
            }}
          />
        )
      })}
    </div>
  )
}
