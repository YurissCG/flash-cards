// Ilustrações simples, planas e geométricas (avatares abstratos — círculos +
// formas), não fotorrealistas nem estilo desenho-animado infantil. Um
// conjunto pequeno e reaproveitável entre os 10 cards, mapeado por tema.
// Cores vêm só da paleta já definida no projeto.
import type { FunctionComponent } from 'react'

export type IllustrationName = 'conversa' | 'sozinho' | 'familia' | 'escola'

interface IllustrationProps {
  className?: string
}

function Avatar({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} />
}

function Conversa({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden="true">
      <Avatar cx={56} cy={48} r={22} fill="var(--roxo-100)" />
      <Avatar cx={56} cy={30} r={13} fill="var(--roxo-200)" />
      <Avatar cx={110} cy={48} r={22} fill="var(--amarelo-100)" />
      <Avatar cx={110} cy={30} r={13} fill="var(--amarelo-400)" />
      <path
        d="M78 22 h20 a6 6 0 0 1 6 6 v6 a6 6 0 0 1-6 6 h-8 l-6 6 v-6 h-6 a6 6 0 0 1-6-6 v-6 a6 6 0 0 1 6-6 z"
        fill="var(--branco)"
        stroke="var(--roxo-400)"
        strokeWidth={2}
      />
    </svg>
  )
}

function Sozinho({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden="true">
      <Avatar cx={80} cy={50} r={24} fill="var(--roxo-100)" />
      <Avatar cx={80} cy={30} r={14} fill="var(--roxo-200)" />
      <circle cx={116} cy={22} r={4} fill="var(--amarelo-400)" />
      <circle cx={128} cy={16} r={3} fill="var(--amarelo-400)" />
      <circle cx={138} cy={12} r={2} fill="var(--amarelo-400)" />
    </svg>
  )
}

function Familia({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden="true">
      <Avatar cx={40} cy={50} r={20} fill="var(--roxo-100)" />
      <Avatar cx={40} cy={33} r={12} fill="var(--roxo-200)" />
      <Avatar cx={82} cy={54} r={16} fill="var(--amarelo-100)" />
      <Avatar cx={82} cy={40} r={10} fill="var(--amarelo-400)" />
      <Avatar cx={116} cy={50} r={20} fill="var(--amarelo-100)" />
      <Avatar cx={116} cy={33} r={12} fill="var(--coral-400)" />
    </svg>
  )
}

function Escola({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden="true">
      <Avatar cx={54} cy={48} r={22} fill="var(--roxo-100)" />
      <Avatar cx={54} cy={30} r={13} fill="var(--roxo-200)" />
      <rect x={94} y={30} width={40} height={30} rx={4} fill="var(--branco)" stroke="var(--roxo-400)" strokeWidth={2} />
      <line x1={102} y1={40} x2={126} y2={40} stroke="var(--roxo-200)" strokeWidth={2} />
      <line x1={102} y1={48} x2={126} y2={48} stroke="var(--roxo-200)" strokeWidth={2} />
      <line x1={102} y1={56} x2={118} y2={56} stroke="var(--roxo-200)" strokeWidth={2} />
    </svg>
  )
}

const ILLUSTRATIONS: Record<IllustrationName, FunctionComponent<IllustrationProps>> = {
  conversa: Conversa,
  sozinho: Sozinho,
  familia: Familia,
  escola: Escola,
}

export function CardIllustration({ name, className }: { name: IllustrationName; className?: string }) {
  const Illustration = ILLUSTRATIONS[name]
  return <Illustration className={className} />
}
