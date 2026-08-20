import { FlashCard } from '@/components/hero/FlashCard'
import { CtaButton } from '@/components/ui/CtaButton'
import { Button } from '@/components/ui/Button'
import { HERO_CARDS } from '@/content/hero-cards'
import { SITE } from '@/content/site'
import { EXIT_INTENT_POPUP_COPY } from '@/content/copy'

export interface ExitIntentPopupProps {
  onDismiss: () => void
}

const [FEATURED_CARD] = HERO_CARDS

// §5.5.4: título + o mesmo componente FlashCard, estático (isTop=false — sem
// drag/tap, só a exibição) + a oferta em uma linha + CTA.
export function ExitIntentPopup({ onDismiss }: ExitIntentPopupProps) {
  return (
    <div>
      <h2 id="exit-intent-title" className="font-display text-h3 font-semibold text-tinta-900">
        {EXIT_INTENT_POPUP_COPY.titulo}
      </h2>

      {FEATURED_CARD ? (
        <div className="relative mt-4 h-72 w-full overflow-hidden rounded-xl">
          <FlashCard
            card={FEATURED_CARD}
            depth={0}
            isTop={false}
            custom={{ dir: 1, velocity: 0 }}
            reducedMotion
            nextTapDirection={1}
          />
          {/* O card real varia de altura conforme o texto (até ~650px) — aqui é
              só uma prévia, por isso o recorte com esmaecido em vez de tentar
              caber o conteúdo inteiro num popup. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
          />
        </div>
      ) : null}

      <p className="mt-4 text-sm text-tinta-600">
        {SITE.priceFormatted} · {EXIT_INTENT_POPUP_COPY.ofertaSufixo}
      </p>

      <div className="mt-4 flex flex-col items-stretch gap-3">
        <CtaButton label={EXIT_INTENT_POPUP_COPY.ctaLabel} origem="popup-exit-intent" size="md" />
        <Button variant="link" size="md" onClick={onDismiss} className="self-center text-tinta-600">
          {EXIT_INTENT_POPUP_COPY.secondaryLabel}
        </Button>
      </div>
    </div>
  )
}
