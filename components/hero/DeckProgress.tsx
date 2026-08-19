import { cn } from '@/lib/cn'

export interface DeckProgressProps {
  current: number
  total: number
  className?: string
}

export function DeckProgress({ current, total, className }: DeckProgressProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn('h-2 w-2 rounded-full transition-colors', i < current ? 'bg-amarelo-400' : 'bg-white/25')}
          />
        ))}
      </div>
      <p className="font-sans text-xs text-roxo-100">
        {current}/{total}
      </p>
    </div>
  )
}
