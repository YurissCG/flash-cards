import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { CATEGORIAS, type Categoria } from '@/content/categorias'
import { ICONS } from '@/lib/icons'
import { SECTION_CATEGORIAS } from '@/content/copy'
import { cn } from '@/lib/cn'

// 12 categorias — como grid de 1 coluna, é muita rolagem vertical no
// celular. No mobile vira carrossel horizontal (scroll nativo com snap, sem
// JS de drag); a partir de sm: volta a ser grid, que já cabe bem em 2-3
// colunas. Também não depende de scroll-reveal (ver nota anterior sobre
// opacity:0 esperando hidratação em conexão lenta).
export function SectionCategorias() {
  return (
    <SectionShell id="categorias" faixa="roxo-500" heading={SECTION_CATEGORIAS.heading}>
      <div
        role="region"
        aria-label={SECTION_CATEGORIAS.heading}
        tabIndex={0}
        className="-mx-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex snap-x snap-mandatory gap-4 px-4">
          {CATEGORIAS.map((categoria) => (
            <CategoriaCard key={categoria.numero} categoria={categoria} className="w-[80vw] max-w-xs shrink-0 snap-start" />
          ))}
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {CATEGORIAS.map((categoria) => (
          <CategoriaCard key={categoria.numero} categoria={categoria} />
        ))}
      </div>

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

function CategoriaCard({ categoria, className }: { categoria: Categoria; className?: string }) {
  const Icon = ICONS[categoria.icone]
  return (
    <div className={cn('rounded-lg bg-roxo-600 p-5', className)}>
      <div className="flex items-center justify-between">
        <span className="font-display text-h3 font-semibold text-amarelo-400">
          {String(categoria.numero).padStart(2, '0')}
        </span>
        <Icon aria-hidden="true" strokeWidth={2.25} className="h-6 w-6 text-roxo-100" />
      </div>
      <p className="mt-3 font-display text-lg font-semibold text-white">{categoria.titulo}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {categoria.topicos.map((topico) => (
          <span key={topico} className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-roxo-100">
            {topico}
          </span>
        ))}
      </div>
    </div>
  )
}
