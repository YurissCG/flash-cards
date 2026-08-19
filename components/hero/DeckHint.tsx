import { Hand } from 'lucide-react'
import { cn } from '@/lib/cn'
import { DECK_HINT_COPY } from '@/content/copy'

export interface DeckHintProps {
  visible: boolean
  className?: string
}

// Pulsa 3× com a curva `float` já definida em tailwind.config.ts (§5.2.10) e
// some via a prop `visible` (primeira interação ou 8s, controlado pelo CardDeck).
// prefers-reduced-motion já neutraliza a animação globalmente (app/globals.css).
export function DeckHint({ visible, className }: DeckHintProps) {
  if (!visible) return null

  return (
    <p
      className={cn(
        'flex items-center gap-1.5 font-sans text-xs text-roxo-100 [animation:float_6s_ease-in-out_3]',
        className,
      )}
    >
      <Hand aria-hidden="true" strokeWidth={2.25} className="h-3.5 w-3.5" />
      {DECK_HINT_COPY}
    </p>
  )
}
