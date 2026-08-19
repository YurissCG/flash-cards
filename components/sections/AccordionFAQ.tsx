'use client'

import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { DURATION, EASE } from '@/lib/motion'
import { setInteractionSuppression } from '@/lib/popup-suppression'
import { FAQ } from '@/content/faq'
import { SECTION_FAQ } from '@/content/copy'

// 13 perguntas > teto de 8 filhos em stagger (§5.3) — um único Reveal para a
// lista inteira. A resposta fica sempre no DOM (altura animada via motion,
// não display:none condicional), com role="region" + aria-controls (§4.2).
export function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Suprime pop-ups (§5.5.3) enquanto o usuário está lendo uma resposta aberta.
  useEffect(() => {
    setInteractionSuppression('faq', openIndex !== null)
    return () => setInteractionSuppression('faq', false)
  }, [openIndex])

  return (
    <SectionShell id="faq" faixa="roxo-50" heading={SECTION_FAQ.heading}>
      <Reveal>
        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i
            const buttonId = `faq-question-${i}`
            const panelId = `faq-answer-${i}`
            return (
              <div key={item.pergunta} className="rounded-md bg-white shadow-sm">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display font-semibold text-tinta-900">{item.pergunta}</span>
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={2.25}
                      className={cn(
                        'h-5 w-5 shrink-0 text-roxo-400 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                </h3>
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-tinta-600">{item.resposta}</p>
                </m.div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </SectionShell>
  )
}
