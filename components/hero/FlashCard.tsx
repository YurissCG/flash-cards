'use client'

import { useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import Image from 'next/image'
import { motion, useIsPresent, useMotionValue, useTransform, type PanInfo, type Variants } from 'motion/react'
import { Brain, Lightbulb, Sparkles, Heart } from 'lucide-react'
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

// Cor de acento por card — usada nos chips de ícone dos blocos (o cabeçalho
// em si agora é sempre lavanda neutro, não colorido por categoria).
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

// Trecho entre "aspas" vira destaque em negrito — mesma convenção do headline
// do Hero, aplicada aqui à dica prática.
function renderWithQuoteEmphasis(text: string) {
  return text.split(/("[^"]*")/g).map((part, i) =>
    part.startsWith('"') ? (
      <strong key={i} className="font-bold text-roxo-700">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function CardFace({ card }: { card: HeroCard }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className="flex items-center justify-between bg-roxo-50">
        <span className="rounded-tl-xl rounded-br-lg bg-roxo-800 px-3 py-2 text-sm font-bold text-white">
          {String(card.numero).padStart(3, '0')}
        </span>
        <span className="flex items-center gap-1.5 pr-4 text-xs font-bold uppercase tracking-wide text-roxo-800">
          <Brain aria-hidden="true" strokeWidth={2.25} className="h-3.5 w-3.5" />
          {card.categoria}
        </span>
      </div>

      {/* Ilustração gerada sob medida por card (fundo verde removido, PNG
          transparente) — object-contain, não cover, pra não cortar os
          personagens como cortaria uma foto full-bleed. Fundo lavanda suave
          preenche a moldura quando o personagem não ocupa o quadro inteiro. */}
      <div className="relative h-24 w-full overflow-hidden bg-roxo-50 sm:h-28">
        <Image
          src={`/cards/${card.id}.png`}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, 88vw"
          className="object-contain"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-4 w-full text-white"
        >
          <path d="M0,10 Q50,20 100,10 T200,10 T300,10 T400,10 V20 H0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="px-4 pb-2 pt-2 text-center">
        <p className="font-display text-[15px] font-bold leading-snug text-tinta-900 sm:text-base">{card.titulo}</p>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <svg aria-hidden="true" width="56" height="8" viewBox="0 0 56 8" fill="none" className="text-roxo-200">
            <path
              d="M2 5c4-5 8 4 12-1s8-4 12 1 8-4 12-1 8 4 12-1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <Sparkles aria-hidden="true" strokeWidth={2} className="h-3 w-3 text-amarelo-400" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-4">
        {card.blocos.map((bloco) => {
          const BlockIcon = ICONS[bloco.icone]
          return (
            <div key={bloco.rotulo} className="flex items-start gap-2 rounded-lg border border-roxo-100 p-1.5">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                  HEADER_BG[card.cor],
                )}
              >
                <BlockIcon aria-hidden="true" strokeWidth={2.5} className={cn('h-3.5 w-3.5', HEADER_TEXT[card.cor])} />
              </span>
              <p className="text-[11px] leading-snug text-tinta-600 sm:text-xs">
                <span className="font-semibold text-tinta-900">{bloco.rotulo} </span>
                {bloco.texto}
              </p>
            </div>
          )
        })}

        <div className="flex items-start gap-2 rounded-lg bg-roxo-100 p-1.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-roxo-500">
            <Lightbulb aria-hidden="true" strokeWidth={2.5} className="h-3.5 w-3.5 text-white" />
          </span>
          <p className="text-[11px] leading-snug text-tinta-700 sm:text-xs">
            <span className="font-semibold text-tinta-900">Dica prática: </span>
            {renderWithQuoteEmphasis(card.dicaPratica)}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center gap-1.5 border-t border-roxo-100 px-4 py-2">
        <Heart aria-hidden="true" strokeWidth={2.25} className="h-3 w-3 shrink-0 text-roxo-400" />
        <p className="text-center text-[11px] italic leading-snug text-tinta-600">{card.fechamento}</p>
      </div>
    </div>
  )
}
