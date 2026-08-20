'use client'

import { useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import Image from 'next/image'
import { motion, useIsPresent, useMotionValue, useTransform, type PanInfo, type Variants } from 'motion/react'
import { AlertCircle, Heart, HelpCircle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE, SPRING } from '@/lib/motion'
import type { AccentColor, CardBlock, HeroCard } from '@/content/hero-cards'

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
        <CardFace card={card} priority />
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
      <CardFace card={card} priority />
    </motion.div>
  )
}

// Marcador do item de lista: acompanha a cor do card, exceto quando o bloco
// pede "colorido" (Regulação emocional), em que cada item gira por uma cor
// diferente da paleta — não é mais fixo por card.
const ACCENT_DOT: Record<AccentColor, string> = {
  roxo: 'bg-roxo-400',
  verde: 'bg-verde-500',
  amarelo: 'bg-amarelo-400',
  coral: 'bg-coral-400',
}

const ROTATING_DOTS = ['bg-roxo-400', 'bg-verde-500', 'bg-amarelo-400', 'bg-coral-400']

// Trecho entre "aspas" vira destaque em negrito — mesma convenção do headline
// do Hero, aplicada aqui aos itens de lista (ex.: um "não" dentro da frase).
function renderWithQuoteEmphasis(text: string) {
  return text.split(/("[^"]*")/g).map((part, i) =>
    part.startsWith('"') ? (
      <strong key={i} className="font-bold text-tinta-900">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function BlockRenderer({ block, cor }: { block: CardBlock; cor: AccentColor }) {
  switch (block.tipo) {
    case 'lista':
      return (
        <div>
          <p className="mb-1 text-[13px] font-bold text-tinta-900">{block.rotulo}</p>
          <ul className="flex flex-col gap-1">
            {block.itens.map((item, i) => (
              <li key={item} className="flex items-start gap-1.5 text-[13px] leading-snug text-tinta-600">
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                    block.colorido ? ROTATING_DOTS[i % ROTATING_DOTS.length] : ACCENT_DOT[cor],
                  )}
                />
                <span>{renderWithQuoteEmphasis(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'pergunta':
      return (
        <div className="rounded-lg border-l-4 border-roxo-400 bg-roxo-50 py-1.5 pl-2.5 pr-2.5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-roxo-700">
            <HelpCircle aria-hidden="true" strokeWidth={2.5} className="h-3.5 w-3.5 shrink-0" />
            {block.rotulo}
          </p>
          <p className="mt-0.5 text-[13px] italic leading-snug text-tinta-700">&ldquo;{block.texto}&rdquo;</p>
        </div>
      )

    case 'aviso': {
      const atencao = block.variante === 'atencao'
      return (
        <div
          className={cn(
            'flex items-start gap-1.5 rounded-lg border p-2',
            atencao ? 'border-amarelo-400/50 bg-amarelo-100' : 'border-roxo-100 bg-roxo-50',
          )}
        >
          {atencao ? (
            <AlertCircle aria-hidden="true" strokeWidth={2.5} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral-400" />
          ) : (
            <Lightbulb aria-hidden="true" strokeWidth={2.5} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-roxo-500" />
          )}
          <p className="text-[13px] leading-snug text-tinta-700">
            <span className="font-bold text-tinta-900">{block.rotulo} </span>
            {block.texto}
          </p>
        </div>
      )
    }

    case 'comparacao':
      return (
        <div className="flex flex-col gap-1.5">
          <p className="text-[13px] leading-snug text-tinta-600">
            <span className="font-bold text-tinta-900">Em vez de: </span>
            <span className="italic">&ldquo;{block.evite}&rdquo;</span>
          </p>
          <div className="rounded-lg bg-roxo-50 p-2">
            <p className="text-[13px] font-bold text-roxo-700">{block.experimenteRotulo}</p>
            <ul className="mt-0.5 flex flex-col gap-0.5">
              {block.experimente.map((item) => (
                <li key={item} className="text-[13px] italic leading-snug text-tinta-700">
                  &ldquo;{item}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        </div>
      )

    case 'definicoes':
      return (
        <ul className="flex flex-col gap-1.5">
          {block.itens.map((item) => (
            <li key={item.termo} className="border-l-2 border-roxo-200 pl-2.5">
              <p className="text-[13px] font-bold text-tinta-900">{item.termo}</p>
              <p className="text-[13px] leading-snug text-tinta-600">{item.texto}</p>
            </li>
          ))}
        </ul>
      )

    case 'fechamento':
      return (
        <div className="mt-auto flex flex-col items-center gap-0.5 border-t border-roxo-100 pt-2 text-center">
          <Heart aria-hidden="true" strokeWidth={2.25} className="h-3.5 w-3.5 text-roxo-400" />
          {block.linhas.map((linha) => (
            <p key={linha} className="text-[13px] italic leading-snug text-tinta-600">
              {linha}
            </p>
          ))}
        </div>
      )
  }
}

// Estilo editorial: foto grande com degradê e título sobreposto (mesmo
// tratamento de destaque da variação "Story"), seguido de uma área de
// conteúdo branca e limpa — necessária porque o texto real varia bastante de
// tamanho entre os 10 cards (de 2 blocos curtos a listas de 7 itens).
function CardFace({ card, priority }: { card: HeroCard; priority?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className="relative w-full shrink-0" style={{ height: card.fotoAlturaPx }}>
        <Image
          src={card.foto}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, 88vw"
          className="object-cover"
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tinta-900/90 via-tinta-900/15 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-tinta-900">
          {String(card.numero).padStart(3, '0')} · {card.categoria}
        </span>
        <p className="absolute inset-x-3 bottom-2.5 font-display text-base font-bold leading-tight text-white sm:text-lg">
          {card.titulo}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3.5 py-2.5">
        {card.intro.map((paragrafo) => (
          <p key={paragrafo} className="text-[13px] leading-snug text-tinta-600">
            {paragrafo}
          </p>
        ))}

        {card.blocos.map((bloco, i) => (
          <BlockRenderer key={i} block={bloco} cor={card.cor} />
        ))}
      </div>
    </div>
  )
}
