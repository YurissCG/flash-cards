'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion as useMotionReducedMotion } from 'motion/react'

/**
 * Re-exporta o hook de reduced-motion do `motion/react`, com leitura segura
 * para hidratação. O hook da lib resolve `prefers-reduced-motion` de forma
 * SÍNCRONA já na primeira renderização do cliente (lendo matchMedia direto,
 * fora de um efeito) — isso diverge do fallback `false` usado no servidor
 * (que não tem acesso a matchMedia) e quebra a hidratação sempre que o
 * dispositivo realmente prefere movimento reduzido. Por isso adiamos a
 * leitura real para depois do mount: a primeira renderização do cliente usa
 * `false`, idêntica ao servidor, e um efeito aplica o valor real logo em
 * seguida.
 */
export function useReducedMotion(): boolean {
  const deviceValue = useMotionReducedMotion()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(deviceValue ?? false)
  }, [deviceValue])

  return reducedMotion
}
