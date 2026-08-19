'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics'

// 'purchase' é o nome de evento recomendado pelo GA4 para conversão — o
// documento não nomeia um evento específico aqui, só pede que a página
// "dispare conversão" (§4.1).
export function ConversionTracker() {
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    track('purchase')
  }, [])

  return null
}
