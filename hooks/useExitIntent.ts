'use client'

import { useEffect } from 'react'

/** Detecção pura do gesto (mouseleave com clientY <= 0, §5.5.3) — sem regra de negócio. */
export function useExitIntent(onExitIntent: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) onExitIntent()
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [enabled, onExitIntent])
}
