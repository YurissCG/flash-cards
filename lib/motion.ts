export const EASE = {
  out:      [0.22, 0.61, 0.36, 1],   // saídas suaves (padrão de UI)
  in:       [0.55, 0.00, 1.00, 0.45], // ⚠️ ACELERAÇÃO = usar no eixo Y da queda
  inOut:    [0.65, 0.00, 0.35, 1],
} as const

export const SPRING = {
  card:   { type: 'spring', stiffness: 320, damping: 30, mass: 0.9 },
  deck:   { type: 'spring', stiffness: 260, damping: 26, mass: 1 },
  popup:  { type: 'spring', stiffness: 380, damping: 34, mass: 0.8 },
  gentle: { type: 'spring', stiffness: 180, damping: 22 },
} as const

export const DURATION = { fast: 0.18, base: 0.28, slow: 0.55 } as const
