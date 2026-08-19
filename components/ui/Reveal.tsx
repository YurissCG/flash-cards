'use client'

import { m, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { DURATION, EASE } from '@/lib/motion'

const MAX_OFFSET = 24
const STAGGER_CHILD_INTERVAL = 0.06
export const REVEAL_STAGGER_MAX_CHILDREN = 8

const VIEWPORT = { once: true, amount: 0.25, margin: '0px 0px -80px 0px' } as const

export interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li'
}

/**
 * Wrapper de scroll-reveal único (§5.3). Cabeçalhos de seção nunca devem
 * receber `delay` > 0 — o texto principal aparece imediatamente.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = as === 'li' ? m.li : m.div

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      initial={{ opacity: 0, y: MAX_OFFSET }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE.out, delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_CHILD_INTERVAL } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: MAX_OFFSET },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
}

export interface RevealGroupProps {
  /**
   * Elementos já renderizados e com `key` própria (ex.: `items.map(...)` feito
   * pelo Server Component chamador). RevealGroup só orquestra o stagger — ele
   * não pode receber funções de render, porque Server Components não podem
   * passar funções para Client Components através da fronteira RSC.
   */
  children: ReactNode[]
  className?: string
  itemClassName?: string
  as?: 'ul' | 'div'
  itemAs?: 'li' | 'div'
}

/**
 * Orquestra o stagger de listas com `staggerChildren` no pai (§5.3) — um único
 * observer de viewport para todos os filhos, em vez de N reveals independentes.
 * Teto de {@link REVEAL_STAGGER_MAX_CHILDREN} filhos animados: acima disso,
 * envolva a lista inteira em um único `<Reveal>` no lugar deste componente.
 */
export function RevealGroup({ children, className, itemClassName, as = 'div', itemAs = 'div' }: RevealGroupProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    const StaticContainer = as === 'ul' ? 'ul' : 'div'
    const StaticItem = itemAs === 'li' ? 'li' : 'div'
    return (
      <StaticContainer className={className}>
        {children.map((child, i) => (
          <StaticItem key={i} className={itemClassName}>
            {child}
          </StaticItem>
        ))}
      </StaticContainer>
    )
  }

  const ContainerTag = as === 'ul' ? m.ul : m.div
  const ItemTag = itemAs === 'li' ? m.li : m.div

  return (
    <ContainerTag initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={containerVariants} className={className}>
      {children.map((child, i) => (
        <ItemTag key={i} variants={itemVariants} className={itemClassName}>
          {child}
        </ItemTag>
      ))}
    </ContainerTag>
  )
}
