import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { CATEGORIAS } from '@/content/categorias'
import { ICONS } from '@/lib/icons'
import { SECTION_CATEGORIAS } from '@/content/copy'

// 12 categorias > teto de 8 filhos em stagger (§5.3) — anima o grid inteiro
// como um único bloco em vez de escalonar item a item.
export function SectionCategorias() {
  return (
    <SectionShell id="categorias" faixa="roxo-500" heading={SECTION_CATEGORIAS.heading}>
      <Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIAS.map((categoria) => {
            const Icon = ICONS[categoria.icone]
            return (
              <div key={categoria.numero} className="rounded-lg bg-roxo-600 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-h3 font-semibold text-amarelo-400">
                    {String(categoria.numero).padStart(2, '0')}
                  </span>
                  <Icon aria-hidden="true" strokeWidth={2.25} className="h-6 w-6 text-roxo-100" />
                </div>
                <p className="mt-3 font-display text-lg font-semibold text-white">{categoria.titulo}</p>
                <p className="mt-2 text-sm text-roxo-100">{categoria.descricao}</p>
              </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal className="mt-10 max-w-prose">
        {SECTION_CATEGORIAS.fechamento.map((linha, i) => (
          <p key={linha} className={i === 0 ? 'text-lead text-white' : 'mt-2 text-roxo-100'}>
            {linha}
          </p>
        ))}
      </Reveal>
    </SectionShell>
  )
}
