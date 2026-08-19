'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CtaButton } from '@/components/ui/CtaButton'
import { track } from '@/lib/analytics'
import { SCROLL_NUDGE_POPUP_COPY } from '@/content/copy'

// §5.5.4: a opção escolhida é o micro-compromisso (evento qualitativo) e SÓ
// DEPOIS revela o CTA com copy adaptada — "levam ao CTA", não são o CTA. Sem
// link secundário próprio (diferente do exit-intent) — fechar é só via X do
// PopupShell — por isso não recebe `onDismiss`.
export function ScrollNudgePopup() {
  const [chosenId, setChosenId] = useState<string | null>(null)
  const chosen = SCROLL_NUDGE_POPUP_COPY.opcoes.find((opcao) => opcao.id === chosenId)

  function handleChoice(id: string) {
    track('popup_scroll_nudge_choice', { escolha: id })
    setChosenId(id)
  }

  return (
    <div>
      <h2 id="scroll-nudge-title" className="font-display text-h3 font-semibold text-tinta-900">
        {SCROLL_NUDGE_POPUP_COPY.titulo}
      </h2>
      <p className="mt-2 text-tinta-600">{SCROLL_NUDGE_POPUP_COPY.pergunta}</p>

      {chosen ? (
        <div className="mt-5">
          <CtaButton label={chosen.ctaLabel} origem="popup-scroll-nudge" size="md" />
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {SCROLL_NUDGE_POPUP_COPY.opcoes.map((opcao) => (
            <Button
              key={opcao.id}
              variant="ghost"
              size="md"
              onClick={() => handleChoice(opcao.id)}
              className="justify-start text-left text-tinta-900"
            >
              {opcao.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
