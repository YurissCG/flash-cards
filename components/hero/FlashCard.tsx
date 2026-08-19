'use client'

import { useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { motion, useIsPresent, useMotionValue, useTransform, type PanInfo, type Variants } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { EASE, SPRING } from '@/lib/motion'
import { ICONS } from '@/lib/icons'
import type { HeroCard } from '@/content/hero-cards'
import type { LucideIcon } from 'lucide-react'

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
  const Icon = ICONS[card.icone]

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
        <CardFace card={card} Icon={Icon} />
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
        <CardFace card={card} Icon={Icon} />
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
      <CardFace card={card} Icon={Icon} />
    </motion.div>
  )
}

function CardFace({ card, Icon }: { card: HeroCard; Icon: LucideIcon }) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-xl bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <Badge color={card.cor}>{card.categoria}</Badge>
        <Icon aria-hidden="true" strokeWidth={2.25} className="h-6 w-6 text-tinta-400" />
      </div>
      <div>
        <p className="font-display text-h3 font-semibold text-tinta-900">{card.titulo}</p>
        <p className="mt-3 max-w-[48ch] text-sm text-tinta-600">{card.texto}</p>
      </div>
    </div>
  )
}
