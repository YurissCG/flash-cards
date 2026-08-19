import { SectionShell } from '@/components/ui/SectionShell'
import { CtaButton } from '@/components/ui/CtaButton'
import { SHOWCASE } from '@/content/showcase'
import { SECTION_SHOWCASE } from '@/content/copy'

// Marquee 100% CSS (§5.4) — sem JS, sem Reveal. Conteúdo duplicado 2× para o
// loop parecer contínuo; a cópia extra leva aria-hidden. Em
// prefers-reduced-motion, a animação para e a faixa vira carrossel scrollável
// (só a cópia real fica no DOM, a duplicata é escondida).
export function SectionShowcase() {
  return (
    <SectionShell id="showcase" faixa="roxo-50" heading={SECTION_SHOWCASE.heading}>
      <div className="-mx-4 overflow-hidden motion-reduce:overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex w-max animate-marquee gap-4 px-4 motion-reduce:animate-none sm:px-6 lg:px-8">
          <div className="flex gap-4">
            {SHOWCASE.map((item) => (
              <ShowcaseCard key={item.titulo} titulo={item.titulo} />
            ))}
          </div>
          <div className="flex gap-4 motion-reduce:hidden" aria-hidden="true">
            {SHOWCASE.map((item) => (
              <ShowcaseCard key={item.titulo} titulo={item.titulo} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-tinta-600">{SECTION_SHOWCASE.fechamento}</p>
      <div className="mt-6 flex justify-center">
        <CtaButton label={SECTION_SHOWCASE.ctaLabel} origem="showcase" size="lg" />
      </div>
    </SectionShell>
  )
}

function ShowcaseCard({ titulo }: { titulo: string }) {
  return (
    <div className="flex w-64 shrink-0 items-center rounded-lg bg-white p-5 shadow-sm">
      <p className="font-display font-semibold text-tinta-900">{titulo}</p>
    </div>
  )
}
