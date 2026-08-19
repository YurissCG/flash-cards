'use client'

import { useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import Image from 'next/image'
import { motion, useIsPresent, useMotionValue, useTransform, type PanInfo, type Variants } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'
import { EASE, SPRING } from '@/lib/motion'
import { ICONS } from '@/lib/icons'
import type { HeroCard } from '@/content/hero-cards'

const SWIPE_DISTANCE = 90 // px
const SWIPE_VELOCITY = 520 // px/s
const TAP_MAX_DISTANCE = 8 // px
const TAP_MAX_DURATION = 250 // ms

export interface ExitCustom {
  dir: 1 | -1
  velocity: number
}

// Estado de repouso por posição na pilha (§5.2.1) — i=0 é o topo.
function rest(i: number) {
  return {
    scale: 1 - i * 0.045,
    y: i * 14,
    rotate: [0, -2.2, 1.8, -1.1][i] ?? 0,
    opacity: i > 2 ? 0 : 1,
    zIndex: 100 - i,
  }
}

// A queda (§5.2.4): eixos com curvas diferentes — x desacelera (atrito do ar),
// y acelera (gravidade), rotate é linear (momento angular), opacity só cai no
// fim (o card "sai de cena", não evapora).
function exitVariant(dir: 1 | -1, velocity: number) {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 800
  return {
    x: dir * viewportWidth * 0.9,
    y: 260 + Math.abs(velocity) * 0.05,
    rotate: dir * (22 + Math.min(Math.abs(velocity) / 60, 14)),
    scale: 0.92,
    opacity: 0,
    transition: {
      x: { duration: 0.52, ease: [...EASE.out] as [number, number, number, number] },
      y: { duration: 0.52, ease: [...EASE.in] as [number, number, number, number] },
      rotate: { duration: 0.52, ease: 'linear' as const },
      scale: { duration: 0.52, ease: [...EASE.out] as [number, number, number, number] },
      opacity: { duration: 0.22, delay: 0.3 },
    },
  }
}

const REDUCED_EXIT = { opacity: 0, transition: { duration: 0.15 } }

// `exit` só aceita objeto ou label de variant — não uma função. O jeito
// correto de ler o `custom` vivo do AnimatePresence no momento da saída
// (dir/velocity do gesto que descartou o card) é via `variants` + `exit="exit"`.
const exitVariants: Variants = {
  exit: (custom: ExitCustom) => exitVariant(custom.dir, custom.velocity),
}

export interface FlashCardProps {
  card: HeroCard
  depth: number
  isTop: boolean
  custom: ExitCustom
  reducedMotion: boolean
  /** Direção a usar na próxima descarte sem eixo explícito (tap, espaço/enter). */
  nextTapDirection: 1 | -1
  onRequestDismiss?: (method: 'drag' | 'tap' | 'keyboard', dir: 1 | -1, velocity: number) => void
  /** Notifica início/fim de um arrasto real — usado para suprimir pop-ups (§5.5.3). */
  onDragActiveChange?: (active: boolean) => void
}

export function FlashCard({
  card,
  depth,
  isTop,
  custom,
  reducedMotion,
  nextTapDirection,
  onRequestDismiss,
  onDragActiveChange,
}: FlashCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // A rotação segue a mão; leve tilt 3D dá espessura ao card (§5.2.2).
  const rotate = useTransform(x, [-260, 0, 260], [-16, 0, 16])
  const rotateY = useTransform(x, [-260, 0, 260], [10, 0, -10])

  const pointerDownRef = useRef<{ x: number; y: number; t: number } | null>(null)
  const isDraggingRef = useRef(false)
  const isPresent = useIsPresent()

  const restState = rest(depth)
  // O card que está saindo fica acima de toda a pilha enquanto cai.
  const zIndex = isPresent ? restState.zIndex : 999

  function handlePointerDown(event: PointerEvent) {
    isDraggingRef.current = false
    pointerDownRef.current = { x: event.clientX, y: event.clientY, t: Date.now() }
  }

  function handleDragStart() {
    isDraggingRef.current = true
    onDragActiveChange?.(true)
  }

  function handleDragEnd(_: never, info: PanInfo) {
    onDragActiveChange?.(false)
    if (Math.abs(info.offset.x) > SWIPE_DISTANCE || Math.abs(info.velocity.x) > SWIPE_VELOCITY) {
      const dir = (Math.sign(info.offset.x) || 1) as 1 | -1
      onRequestDismiss?.('drag', dir, info.velocity.x)
    }
    // senão: o spring nativo do drag devolve o card ao lugar automaticamente
  }

  function handlePointerUp(event: PointerEvent) {
    const start = pointerDownRef.current
    pointerDownRef.current = null
    if (!start || isDraggingRef.current) return
    const dx = Math.abs(event.clientX - start.x)
    const dy = Math.abs(event.clientY - start.y)
    const dt = Date.now() - start.t
    if (Math.hypot(dx, dy) < TAP_MAX_DISTANCE && dt < TAP_MAX_DURATION) {
      onRequestDismiss?.('tap', nextTapDirection, 0)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onRequestDismiss?.('keyboard', -1, 0)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      onRequestDismiss?.('keyboard', 1, 0)
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      onRequestDismiss?.('keyboard', nextTapDirection, 0)
    }
  }

  if (!isTop) {
    return (
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex }}
        animate={{
          scale: restState.scale,
          y: restState.y,
          rotate: reducedMotion ? 0 : restState.rotate,
          opacity: restState.opacity,
        }}
        transition={reducedMotion ? { duration: 0.15 } : SPRING.deck}
        className="pointer-events-none"
      >
        <CardFace card={card} />
      </motion.div>
    )
  }

  const ariaLabel = `${card.categoria}. ${card.titulo}`

  if (reducedMotion) {
    // §5.2.8: sem drag, sem rotação, sem queda — só opacidade, funcionalidade intacta.
    return (
      <motion.div
        role="group"
        tabIndex={0}
        aria-label={ariaLabel}
        style={{ position: 'absolute', inset: 0, zIndex }}
        animate={{ scale: restState.scale, y: restState.y, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.15 }}
        exit={REDUCED_EXIT}
        custom={custom}
        onClick={() => onRequestDismiss?.('tap', nextTapDirection, 0)}
        onKeyDown={handleKeyDown}
        className="cursor-pointer"
      >
        <CardFace card={card} />
      </motion.div>
    )
  }

  return (
    <motion.div
      role="group"
      tabIndex={0}
      aria-label={ariaLabel}
      drag
      dragDirectionLock={false}
      dragConstraints={{ top: -40, bottom: 40, left: 0, right: 0 }}
      dragElastic={{ top: 0.15, bottom: 0.15, left: 0.9, right: 0.9 }}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 1.03, cursor: 'grabbing' }}
      style={{ position: 'absolute', inset: 0, x, y, rotate, rotateY, touchAction: 'pan-y', zIndex }}
      variants={exitVariants}
      animate={{ scale: restState.scale, opacity: restState.opacity }}
      transition={SPRING.deck}
      exit="exit"
      custom={custom}
      // drag={true} (ambos os eixos) faz o próprio Motion sobrescrever
      // style.touchAction para "none" internamente (lib/render/html/use-props),
      // depois que o style acima já foi lido — não dá para vencer isso via
      // style prop. !touch-pan-y gera `touch-action:pan-y !important` na
      // stylesheet, que vence o inline style não-important do Motion na
      // cascata CSS. É o único jeito de cumprir o §5.2.2 sem trocar `drag`
      // para um eixo único (o que quebraria dragConstraints/dragElastic em y).
      className="cursor-grab !touch-pan-y"
    >
      <CardFace card={card} />
    </motion.div>
  )
}

// Cabeçalho colorido por cor de acento — o "título colorido no topo" da referência,
// dentro do vocabulário de cores já existente do projeto (nada de tom novo).
const HEADER_BG: Record<HeroCard['cor'], string> = {
  roxo: 'bg-roxo-500',
  verde: 'bg-verde-500',
  amarelo: 'bg-amarelo-400',
  coral: 'bg-coral-400',
}

const HEADER_TEXT: Record<HeroCard['cor'], string> = {
  roxo: 'text-white',
  verde: 'text-tinta-900',
  amarelo: 'text-tinta-900',
  coral: 'text-tinta-900',
}

function CardFace({ card }: { card: HeroCard }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className={cn('flex items-center justify-between px-4 py-2.5', HEADER_BG[card.cor], HEADER_TEXT[card.cor])}>
        {/* Chip sempre branco sólido + texto escuro fixo — não herda a cor do
            cabeçalho, senão em cabeçalho roxo (texto branco) ficaria quase
            ilegível (texto branco sobre um branco/25 quase idêntico). */}
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-tinta-900">
          {String(card.numero).padStart(3, '0')}
        </span>
        <Badge color="roxo" className="bg-white/90 text-roxo-800">
          {card.categoria}
        </Badge>
      </div>

      <p className="px-4 pt-2 font-display text-sm font-semibold leading-tight text-tinta-900 sm:text-base">
        {card.titulo}
      </p>

      {/* Ilustração gerada sob medida por card (fundo verde removido, PNG
          transparente) — object-contain, não cover, pra não cortar os
          personagens como cortaria uma foto full-bleed. */}
      <div className="relative mt-1 h-20 w-full sm:h-24">
        <Image
          src={`/cards/${card.id}.png`}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, 88vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 px-4 pb-3">
        {card.blocos.map((bloco) => {
          const BlockIcon = ICONS[bloco.icone]
          return (
            <div key={bloco.rotulo} className="flex items-start gap-2">
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  HEADER_BG[card.cor],
                )}
              >
                <BlockIcon aria-hidden="true" strokeWidth={2.5} className={cn('h-3 w-3', HEADER_TEXT[card.cor])} />
              </span>
              <p className="text-xs leading-snug text-tinta-600 sm:text-sm">
                <span className="font-semibold text-tinta-900">{bloco.rotulo} </span>
                {bloco.texto}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
