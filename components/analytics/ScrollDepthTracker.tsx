'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics'

/** Dispara `scroll_75` uma vez (§1.3) — KPI de scroll depth da página. */
export function ScrollDepthTracker() {
  const firedRef = useRef(false)

  useEffect(() => {
    function check() {
      if (firedRef.current) return
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const depth = scrollable <= 0 ? 1 : window.scrollY / scrollable
      if (depth >= 0.75) {
        firedRef.current = true
        track('scroll_75')
        window.removeEventListener('scroll', check)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return null
}
