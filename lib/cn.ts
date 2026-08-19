import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge não conhece os tokens de fontSize customizados de
// tailwind.config.ts (§2.5: hero, h2, h3, lead, price) — sem essa extensão,
// ele não os reconhece como "font-size" e cai no grupo genérico de
// "text-color", tratando `text-lead` como conflitante com `text-tinta-900` e
// descartando silenciosamente a cor (bug real, encontrado em teste: CTAs com
// size="lg" perdiam a cor do texto e herdavam branco do fundo roxo).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-hero', 'text-h2', 'text-h3', 'text-lead', 'text-price'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
