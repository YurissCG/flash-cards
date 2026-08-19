# `projeto_landing_page.md`
## Guia Definitivo de Desenvolvimento — Landing Page "+300 Cards de Psicologia Infantil"

> **Para quem lê este arquivo:** este documento é a *fonte única de verdade* do projeto. Nenhuma decisão de cor, tipografia, espaçamento, animação, estrutura de componente ou marcação de SEO deve ser improvisada. Se algo não estiver aqui, pergunte antes de inventar.
> **Stack alvo:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · TailwindCSS 4 · Framer Motion v12 (pacote `motion`) · Deploy Vercel.
> **Versão:** 1.0 · **Idioma da interface:** pt-BR

---

## Índice

1. [Visão geral e metas de conversão](#1-visão-geral-e-metas-de-conversão)
2. [Design System](#2-design-system)
3. [Arquitetura de informação e mapa da página](#3-arquitetura-de-informação-e-mapa-da-página)
4. [Arquitetura de componentes (frontend)](#4-arquitetura-de-componentes-frontend)
5. [Lógica do Motion (Hero e Pop-ups)](#5-lógica-do-motion-hero-e-pop-ups)
6. [Conteúdo estruturado (data layer)](#6-conteúdo-estruturado-data-layer)
7. [Estratégia de SEO técnico](#7-estratégia-de-seo-técnico-claude-seo)
8. [Performance, imagens e Core Web Vitals](#8-performance-imagens-e-core-web-vitals)
9. [Acessibilidade e conformidade](#9-acessibilidade-e-conformidade)
10. [Definition of Done (checklist de entrega)](#10-definition-of-done-checklist-de-entrega)
11. [Prompt de execução para o Claude Code](#11-prompt-de-execução-para-o-claude-code)

---

# 1. Visão geral e metas de conversão

## 1.1 O produto

| Campo | Valor |
|---|---|
| Nome | +300 Cards de Psicologia Infantil |
| Tipo | Produto digital (biblioteca visual de consulta) |
| Preço | R$ 27,90 — pagamento único |
| Valor ancorado | R$ 110,90 (stack com 3 bônus) |
| Público primário | Estudantes de Psicologia (6º–10º período, estágio clínico infantil) |
| Público secundário | Psicólogos(as) clínicos infantis em início de carreira |
| Dispositivo dominante | Mobile (~85% do tráfego — Instagram/TikTok orgânico e tráfego pago) |
| Garantia | 7 dias (CDC, art. 49) |

## 1.2 A promessa central

> **Transformar horas de pesquisa em consultas de poucos minutos.**

Não vendemos "conteúdo" — o público já está afogado em conteúdo. Vendemos **recuperação de informação**: achar a coisa certa no momento certo. Toda decisão de design deve reforçar *velocidade de acesso*, não *volume de material*.

## 1.3 Metas de conversão

| Métrica | Alvo | Como medimos |
|---|---|---|
| Taxa de conversão (visita → checkout iniciado) | ≥ 4,5% | evento `begin_checkout` |
| Interação com o Hero Deck | ≥ 35% dos visitantes viram ≥ 1 card | evento `deck_card_flip` |
| Conclusão do Deck (10/10) | ≥ 8% | evento `deck_completed` |
| Conversão de quem completa o Deck | ≥ 3× a média da página | segmentação |
| Scroll depth 75% | ≥ 30% | evento `scroll_75` |
| LCP mobile (p75) | < 2,5 s | CrUX / PageSpeed |
| INP (p75) | < 200 ms | CrUX |
| CLS | < 0,1 | CrUX |

## 1.4 Princípios de decisão (use como desempate)

1. **Mobile primeiro, sempre.** Se algo funciona lindamente no desktop e trava no iPhone SE, está errado.
2. **O Hero Deck é o único lugar onde gastamos ousadia.** Todo o resto da página é disciplinado, limpo, silencioso. (Regra Chanel: antes de publicar, remova um acessório.)
3. **Nenhuma animação atrasa o conteúdo.** Reveal por scroll nunca esconde texto de quem tem `prefers-reduced-motion` ou JS lento — o estado inicial do CSS já é legível.
4. **Confiança > urgência agressiva.** Público de Psicologia detecta e rejeita marketing predatório. Sem contador regressivo falso, sem "restam 3 vagas", sem pop-up que abre em 2 segundos.
5. **Zero fricção até o checkout.** Todo CTA leva ao mesmo link de pagamento, em nova aba, com `rel="noopener"`.

---

# 2. Design System

## 2.1 Direção visual

Base: o roxo do **Keiki** (referência enviada) — saturado, moderno, arredondado, com blocos de conteúdo em cartões flutuantes sobre fundo roxo cheio. Adaptações obrigatórias para o nosso público:

- Keiki fala com **pais**; nós falamos com **profissionais de saúde mental**. Portanto: mesma paleta e mesmo arredondamento, porém **menos ilustração cartunesca, mais espaço em branco e tipografia mais precisa**.
- Alternamos "faixas": blocos roxos cheios (emoção, promessa, oferta) e blocos claros (raciocínio, listas, FAQ). Isso cria ritmo e evita a fadiga do roxo contínuo.

## 2.2 Paleta (hexadecimais exatos — não improvisar)

```css
/* ——— Marca ——— */
--roxo-900: #221A5E;  /* texto sobre claro em contextos de marca, rodapé */
--roxo-800: #2E2489;  /* fundo de seções roxas profundas */
--roxo-700: #3B2FB8;  /* gradiente de apoio */
--roxo-600: #4B3BD8;  /* superfície de cards SOBRE fundo roxo */
--roxo-500: #5B4AE8;  /* ⭐ ROXO PRINCIPAL — fundo das seções hero/oferta */
--roxo-400: #7B6BF2;  /* bordas, ícones secundários, estados hover */
--roxo-200: #C9C2FB;  /* texto de apoio sobre fundo roxo */
--roxo-100: #E8E4FF;  /* faixa clara, badges, fundo de chips */
--roxo-050: #F5F3FF;  /* fundo de seções claras */

/* ——— Ação ——— */
--verde-600: #45B255; /* hover do CTA */
--verde-500: #5FC96B; /* ⭐ CTA PRINCIPAL */
--verde-100: #DFF6E2; /* fundo de selos "incluso", checkmarks */

/* ——— Destaque ——— */
--amarelo-400: #FFD54A; /* números grandes, grifos, estrelas */
--amarelo-100: #FFF3CC;

/* ——— Sinalização suave ——— */
--coral-400: #FF6E8A;  /* apenas para "de R$ 110,90", riscos e alertas */

/* ——— Neutros ——— */
--tinta-900: #1A1636;  /* ⭐ TEXTO PRINCIPAL em fundo claro + texto DENTRO do CTA */
--tinta-600: #4A4470;  /* texto secundário */
--tinta-400: #8B85AD;  /* legendas, disclaimers */
--areia-50:  #FBFAFF;  /* fundo neutro alternativo */
--branco:    #FFFFFF;
```

### Regras de contraste (WCAG AA — obrigatório)

| Combinação | Ratio | Uso |
|---|---|---|
| `--branco` sobre `--roxo-500` | ~6,5:1 | ✅ headlines e corpo em faixa roxa |
| `--roxo-200` sobre `--roxo-500` | ~3,6:1 | ⚠️ **apenas texto ≥ 18,66px bold ou ≥ 24px** |
| `--amarelo-400` sobre `--roxo-500` | ~4,8:1 | ✅ números e grifos |
| `--tinta-900` sobre `--verde-500` | ~9:1 | ✅ **texto do botão CTA** |
| `--branco` sobre `--verde-500` | ~2,2:1 | ❌ **PROIBIDO** (o Keiki faz isso e reprova em AA) |
| `--tinta-900` sobre `--branco` | ~15:1 | ✅ corpo em faixas claras |

> **Decisão explícita:** o CTA verde leva texto **`--tinta-900`**, não branco. Além de passar em AA com folga, o contraste escuro-sobre-verde dá ao botão um aspecto de "etiqueta física" que combina com a metáfora de cards.

## 2.3 Tipografia

Duas famílias, papéis bem separados, ambas via `next/font/google` (self-hosted automaticamente, `display: 'swap'`, zero requisição externa):

| Papel | Fonte | Pesos | Uso |
|---|---|---|---|
| **Display** | `Fredoka` | 500, 600, 700 | H1, H2, números grandes, botões, títulos dos flashcards. Arredondada, "amigável", ecoa o Keiki. Usar **com restrição**: nunca em blocos de texto corrido. |
| **Corpo** | `Plus Jakarta Sans` | 400, 500, 600, 800 | Todo o texto corrido, listas, FAQ, labels, disclaimers. Geométrica-humanista, alta legibilidade em telas pequenas. |

```ts
// app/fonts.ts
import { Fredoka, Plus_Jakarta_Sans } from 'next/font/google'

export const display = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
  variable: '--font-body',
  display: 'swap',
})
```

### Escala tipográfica (fluida, `clamp()` — mobile → desktop)

```css
--text-hero:   clamp(2.125rem, 1.55rem + 2.9vw, 3.75rem);  /* 34 → 60px  H1 */
--text-h2:     clamp(1.75rem, 1.35rem + 2.0vw, 2.75rem);   /* 28 → 44px  */
--text-h3:     clamp(1.25rem, 1.10rem + 0.75vw, 1.625rem); /* 20 → 26px  */
--text-lead:   clamp(1.0625rem, 1.0rem + 0.35vw, 1.25rem); /* 17 → 20px  */
--text-body:   1rem;                                        /* 16px       */
--text-sm:     0.9375rem;                                   /* 15px       */
--text-xs:     0.8125rem;                                   /* 13px       */
--text-price:  clamp(3.25rem, 2.4rem + 4.2vw, 5.5rem);      /* 52 → 88px  */
```

**Regras de composição:**
- `letter-spacing: -0.02em` em H1/H2 (Fredoka fica solta em tamanhos grandes).
- `line-height`: 1.08 no hero, 1.15 em H2, 1.6 em corpo, 1.5 em listas.
- **Medida máxima de leitura:** `max-width: 62ch` para parágrafos; `48ch` dentro de cards.
- **Eyebrow** (rótulo acima do H2): Plus Jakarta 600, 13px, `uppercase`, `letter-spacing: 0.14em`, cor `--roxo-400` (faixa clara) ou `--amarelo-400` (faixa roxa).
- **Proibido:** mais de 2 pesos diferentes no mesmo bloco visual; itálico; texto justificado.

## 2.4 Raio de borda, sombra, espaçamento

```css
/* Arredondamento — a página inteira é "macia" */
--radius-chip:  9999px;  /* badges, pílulas, botões pequenos */
--radius-sm:    12px;    /* inputs, chips de categoria */
--radius-md:    20px;    /* cards internos, itens de FAQ */
--radius-lg:    28px;    /* cards de conteúdo, caixas de bônus */
--radius-xl:    36px;    /* flashcards do hero, card de preço */
--radius-2xl:   44px;    /* blocos-seção sobrepostos */
--radius-btn:   9999px;  /* CTA principal — sempre pílula total */

/* Sombras — suaves, coloridas, nunca cinza puro */
--shadow-sm:   0 2px 8px rgba(34, 26, 94, 0.06);
--shadow-md:   0 8px 24px rgba(34, 26, 94, 0.10);
--shadow-lg:   0 18px 48px rgba(34, 26, 94, 0.16);
--shadow-card: 0 24px 60px rgba(21, 15, 70, 0.35);  /* flashcards sobre roxo */
--shadow-cta:  0 8px 0 0 #3E9A4C;                   /* "borda inferior" 3D do botão */

/* Espaçamento vertical entre seções */
--section-y-mobile:  clamp(3.5rem, 3rem + 3vw, 5rem);
--section-y-desktop: clamp(5rem, 4rem + 4vw, 7.5rem);
```

**Assinatura visual do CTA:** botão pílula verde com `box-shadow: var(--shadow-cta)` (bloco sólido embaixo, sem blur) → ao `:active`, `translateY(4px)` e sombra some. Efeito "tecla física" que reforça a metáfora tátil dos cards. Aplicar em **todos** os CTAs primários, nunca nos secundários.

## 2.5 `tailwind.config.ts` (tokens)

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        roxo: {
          900:'#221A5E', 800:'#2E2489', 700:'#3B2FB8', 600:'#4B3BD8',
          500:'#5B4AE8', 400:'#7B6BF2', 200:'#C9C2FB', 100:'#E8E4FF', 50:'#F5F3FF',
        },
        verde:   { 600:'#45B255', 500:'#5FC96B', 100:'#DFF6E2' },
        amarelo: { 400:'#FFD54A', 100:'#FFF3CC' },
        coral:   { 400:'#FF6E8A' },
        tinta:   { 900:'#1A1636', 600:'#4A4470', 400:'#8B85AD' },
        areia:   { 50:'#FBFAFF' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero:  ['var(--text-hero)',  { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h2:    ['var(--text-h2)',    { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3:    ['var(--text-h3)',    { lineHeight: '1.25' }],
        lead:  ['var(--text-lead)',  { lineHeight: '1.55' }],
        price: ['var(--text-price)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      borderRadius: { sm:'12px', md:'20px', lg:'28px', xl:'36px', '2xl':'44px' },
      boxShadow: {
        sm:'0 2px 8px rgba(34,26,94,.06)',
        md:'0 8px 24px rgba(34,26,94,.10)',
        lg:'0 18px 48px rgba(34,26,94,.16)',
        card:'0 24px 60px rgba(21,15,70,.35)',
        cta:'0 8px 0 0 #3E9A4C',
      },
      maxWidth: { prose: '62ch', content: '1120px' },
      keyframes: {
        'marquee': { from:{transform:'translateX(0)'}, to:{transform:'translateX(-50%)'} },
        'float':   { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-8px)'} },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float:   'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
```

## 2.6 Ícones e ilustrações

- **Biblioteca:** `lucide-react`, importado **individualmente** (`import { Check } from 'lucide-react'`) — nunca `import * as Icons`.
- Ícones sempre com `strokeWidth={2.25}` e `aria-hidden="true"` quando decorativos.
- **Sem** ilustrações de crianças em estilo cartoon (o Keiki usa; nós não — o público é profissional). Em vez disso, os *próprios flashcards* são a ilustração da página.

---

# 3. Arquitetura de informação e mapa da página

Ordem final das seções, com a faixa cromática de cada uma (o ritmo roxo↔claro é obrigatório):

| # | Seção | Componente | Faixa | Objetivo |
|---|---|---|---|---|
| 00 | Barra de anúncio | `AnnouncementBar` | roxo-800 | Reforço de oferta, sem contador falso |
| 01 | Hero + Deck interativo | `HeroInteractive` | **roxo-500** | Promessa + prova tátil do produto |
| 02 | Dor / Desejo | `SectionDor` | roxo-50 (claro) | Espelhar o problema |
| 03 | Metodologia | `SectionMetodologia` | branco | Explicar o formato "card" |
| 04 | 12 Categorias | `SectionCategorias` | **roxo-500** | Amplitude e organização |
| 05 | O que você recebe | `SectionEntrega` | branco | Entregáveis concretos |
| 06 | Vitrine de cards (marquee) | `SectionShowcase` | roxo-50 | Prova visual de variedade |
| 07 | Sobre o material | `SectionSobre` | branco | Ética, honestidade, E-E-A-T |
| 08 | Prova social | `SectionProvaSocial` | roxo-50 | Confiança |
| 09 | Bônus + stack de valor | `SectionBonus` | branco | Ancoragem de preço |
| 10 | Preço / Oferta | `SectionPreco` | **roxo-500** | Conversão principal |
| 11 | Garantia | `SectionGarantia` | branco | Reversão de risco |
| 12 | FAQ | `AccordionFAQ` | roxo-50 | Quebra de objeções + SEO/GEO |
| 13 | CTA final | `SectionCTAFinal` | **roxo-800** | Último fechamento |
| 14 | Rodapé | `Footer` | roxo-900 | Legal, contato, trust signals |
| ✱ | CTA fixo mobile | `StickyCTA` | — | Aparece após o hero sair da tela |
| ✱ | Gerenciador de pop-ups | `PopupManager` | — | Fila global de modais |

**Wireframe do Hero (desktop ≥1024px):**

```
┌──────────────────────────────────────────────────────────────────┐
│  [ ⚡ Acesso imediato · 7 dias de garantia ]      <- badge chip   │
│                                                                  │
│  Tenha na palma da mão os          ╭──────────────────╮          │
│  principais conteúdos da           │ ╭──────────────╮ │  <- pilha│
│  Psicologia Infantil em            │ │  ANSIEDADE   │ │     de   │
│  ★+300 Cards Visuais★              │ │              │ │    cards │
│                                    │ │  "A evitação │ │          │
│  Uma biblioteca prática criada     │ │   alivia     │ │          │
│  para estudantes e profissionais…  │ │   agora…"    │ │          │
│                                    │ ╰──────────────╯ │          │
│  ╭─────────────────────────────╮   ╰──────────────────╯          │
│  │ QUERO ACESSAR OS +300 CARDS │      ● ● ● ○ ○ ○ ○ ○ ○ ○        │
│  ╰─────────────────────────────╯      arraste ou toque · 3/10    │
│  Acesso digital · celular, tablet ou PC                          │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile (<768px):** headline → subheadline → **deck (largura 88vw, altura 62vh máx. 460px)** → CTA → microcopy. O deck fica *acima* do CTA para que a interação aconteça antes da decisão.

---

# 4. Arquitetura de componentes (frontend)

## 4.1 Estrutura de arquivos

```
.
├── app/
│   ├── layout.tsx                  # fontes, <html lang="pt-BR">, JSON-LD global, Analytics
│   ├── page.tsx                    # Server Component: monta as seções em ordem
│   ├── globals.css                 # tokens CSS + reset + utilitários
│   ├── opengraph-image.tsx         # OG dinâmico via next/og (1200×630)
│   ├── twitter-image.tsx
│   ├── icon.tsx  /  apple-icon.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── obrigado/page.tsx           # pós-compra (noindex) — dispara conversão
│   ├── politica-de-privacidade/page.tsx
│   └── termos-de-uso/page.tsx
│
├── components/
│   ├── hero/
│   │   ├── HeroInteractive.tsx     # 'use client' — orquestra headline + deck
│   │   ├── CardDeck.tsx            # 'use client' — estado da pilha, AnimatePresence
│   │   ├── FlashCard.tsx           # 'use client' — card individual + drag
│   │   ├── DeckProgress.tsx        # dots + contador "3/10"
│   │   ├── DeckHint.tsx            # microcopy animada "arraste →"
│   │   └── DeckComplete.tsx        # CTA que substitui o deck ao completar 10/10
│   │
│   ├── sections/
│   │   ├── AnnouncementBar.tsx     # server
│   │   ├── SectionDor.tsx
│   │   ├── SectionMetodologia.tsx
│   │   ├── SectionCategorias.tsx
│   │   ├── SectionEntrega.tsx
│   │   ├── SectionShowcase.tsx     # marquee CSS puro (sem JS)
│   │   ├── SectionSobre.tsx
│   │   ├── SectionProvaSocial.tsx
│   │   ├── SectionBonus.tsx
│   │   ├── SectionPreco.tsx
│   │   ├── SectionGarantia.tsx
│   │   ├── AccordionFAQ.tsx        # 'use client'
│   │   ├── SectionCTAFinal.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx              # variantes: primary | ghost | link
│   │   ├── CtaButton.tsx           # Button + tracking + href do checkout
│   │   ├── Badge.tsx
│   │   ├── SectionShell.tsx        # <section> + faixa + container + eyebrow + H2
│   │   ├── Reveal.tsx              # wrapper de scroll-reveal (whileInView)
│   │   ├── StickyCTA.tsx           # 'use client'
│   │   └── Container.tsx
│   │
│   ├── popups/
│   │   ├── PopupProvider.tsx       # 'use client' — contexto + FILA
│   │   ├── PopupShell.tsx          # backdrop, painel, focus trap, ESC, bottom-sheet
│   │   ├── ExitIntentPopup.tsx
│   │   ├── ScrollNudgePopup.tsx
│   │   └── usePopupTriggers.ts
│   │
│   └── seo/
│       ├── JsonLd.tsx              # <script type="application/ld+json">
│       └── schemas.ts              # objetos Product/Offer/Organization/WebSite
│
├── content/
│   ├── site.ts                     # URLs, preço, checkout, contato — SINGLE SOURCE
│   ├── hero-cards.ts               # os 10 flashcards
│   ├── categorias.ts               # as 12 categorias
│   ├── entregaveis.ts
│   ├── bonus.ts
│   ├── depoimentos.ts
│   ├── faq.ts
│   └── showcase.ts                 # títulos dos cards da vitrine
│
├── hooks/
│   ├── useReducedMotion.ts         # re-export do motion + fallback SSR
│   ├── useExitIntent.ts
│   └── useMediaQuery.ts
│
├── lib/
│   ├── analytics.ts                # track(event, payload) — fila até o pixel carregar
│   ├── cn.ts                       # clsx + tailwind-merge
│   └── motion.ts                   # TOKENS DE MOTION (durations, easings, springs)
│
└── public/
    ├── og.jpg                      # fallback estático 1200×630 (< 300 KB)
    └── placeholders/*.svg
```

## 4.2 Contratos dos componentes-chave

> Regra geral (skill `react-nextjs-component`): **TypeScript strict, sem `any`**; `"use client"` **apenas** onde há estado, evento ou hook; export nomeado; nada de `<div onClick>`; imagens com `alt` descritivo; foco visível.

### `HeroInteractive`

```ts
// components/hero/HeroInteractive.tsx  — 'use client'
interface HeroInteractiveProps {
  headline: string           // com marcação de destaque via <mark> controlado
  subheadline: string
  cards: HeroCard[]          // exatamente 10
  ctaLabel: string
  ctaHref: string
  microcopy: string
}
```

Comportamento:
- Renderiza `<h1>` (o **único** H1 da página) e, ao lado, `<CardDeck />`.
- **LCP:** o H1 é o elemento LCP alvo. O deck **não** pode conter imagem remota, e sua altura é reservada por CSS (`aspect-ratio` + `min-height`) para CLS = 0.
- Estado do deck vive em `CardDeck`; `HeroInteractive` apenas recebe o callback `onComplete` para trocar o CTA por `DeckComplete`.

### `CardDeck`

```ts
interface CardDeckProps {
  cards: HeroCard[]
  onCardDismiss?: (index: number, method: 'drag' | 'tap' | 'keyboard') => void
  onComplete?: () => void
  visibleDepth?: number  // default 4 — quantos cards são renderizados na pilha
}

interface HeroCard {
  id: string
  categoria: string        // ex.: "Ansiedade"
  cor: 'roxo' | 'verde' | 'amarelo' | 'coral'  // cor da tarja da categoria
  titulo: string           // ex.: "A evitação alivia agora e ensina medo depois"
  texto: string            // 18–30 palavras
  icone: LucideIcon
}
```

Estado interno: `const [index, setIndex] = useState(0)` (índice do topo). Cards já vistos **não** voltam ao DOM. Ao chegar em `index === cards.length`, `onComplete()` é disparado uma única vez (guard com `useRef`).

### `AccordionFAQ`

- Um único item aberto por vez (`useState<string | null>`).
- **HTML semântico obrigatório:** `<h3><button aria-expanded aria-controls>` + região `role="region" aria-labelledby`.
- **A resposta deve existir no DOM mesmo fechada** (`hidden` via altura animada, não `display:none` condicional em JS) — isso importa para SEO e para leitores de tela.
- Animação de altura: `motion.div` com `initial={{height:0, opacity:0}}` / `animate={{height:'auto', opacity:1}}` e `overflow:hidden`.

### `PopupProvider`

```ts
type PopupId = 'exit-intent' | 'scroll-nudge'

interface PopupContextValue {
  enqueue: (id: PopupId, priority?: number) => void
  dismiss: () => void
  current: PopupId | null
  isSuppressed: boolean   // true durante interação com o deck
}
```

### `CtaButton`

Todos os CTAs da página passam por aqui. Props: `label`, `origem` (ex.: `'hero' | 'preco' | 'sticky' | 'popup'`), `size`. Dispara `track('begin_checkout', { origem })` antes de navegar. `target="_blank" rel="noopener noreferrer"`.

---

# 5. Lógica do Motion (Hero e Pop-ups)

## 5.1 Setup e tokens

**Pacote:** Framer Motion v12+ é distribuído como `motion`. Instale `npm i motion` e importe de `motion/react` (o alias `framer-motion` continua funcionando; padronize em **um** dos dois e não misture).

**Bundle:** use `LazyMotion` com `domAnimation` no layout do cliente e o componente `m` no lugar de `motion` nas seções não críticas — reduz ~60% do peso do runtime de animação.

```ts
// lib/motion.ts
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
```

**Regra de ouro de performance:** animar **apenas** `transform` e `opacity`. Nunca `width`, `height` (exceto no acordeão, isolado), `top`, `left`, `box-shadow` ou `filter` em loop.

## 5.2 O Hero Deck — física dos cards caindo

### 5.2.1 Montagem da pilha

Container com `perspective: 1200px` e `transform-style: preserve-3d`. Cada card é `position:absolute; inset:0`. Renderizar somente `visibleDepth = 4` cards; os demais nem entram no DOM.

Para o card na posição `i` (0 = topo), o estado de repouso é:

```ts
const rest = (i: number) => ({
  scale:   1 - i * 0.045,
  y:       i * 14,
  rotate:  [0, -2.2, 1.8, -1.1][i] ?? 0,   // inclinação determinística (nunca Math.random — hidratação!)
  opacity: i > 2 ? 0 : 1,
  zIndex:  100 - i,
})
```

Transição entre posições: `SPRING.deck`. Quando o topo sai, o card `i=1` promove a `i=0` — o *spring* faz a pilha "assentar" com peso, sem `setTimeout`.

### 5.2.2 Arraste (mobile e desktop)

```tsx
const x = useMotionValue(0)
const y = useMotionValue(0)

// A rotação segue a mão: quanto mais longe do centro, mais tomba.
const rotate  = useTransform(x, [-260, 0, 260], [-16, 0, 16])
// Leve tilt 3D — dá espessura ao card
const rotateY = useTransform(x, [-260, 0, 260], [10, 0, -10])
// Opacidade só cai no FIM do arrasto (evita "fantasma" precoce)
const opacity = useTransform(x, [-320, -160, 0, 160, 320], [0, 1, 1, 1, 0])
```

Props do `motion.div` do card do topo:

```tsx
drag                       // ambos os eixos, mas com constraint vertical apertada
dragDirectionLock={false}
dragConstraints={{ top: -40, bottom: 40, left: 0, right: 0 }}
dragElastic={{ top: 0.15, bottom: 0.15, left: 0.9, right: 0.9 }}
dragMomentum={false}
style={{ x, y, rotate, rotateY, touchAction: 'pan-y' }}
whileTap={{ scale: 1.03, cursor: 'grabbing' }}
```

> **`touchAction: 'pan-y'` é obrigatório.** Sem isso, o deck sequestra o scroll vertical no mobile e o usuário fica preso no hero — falha crítica de UX.

### 5.2.3 Decisão de descarte (`onDragEnd`)

```ts
const SWIPE_DISTANCE = 90     // px
const SWIPE_VELOCITY = 520    // px/s

function onDragEnd(_: never, info: PanInfo) {
  const power = Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.25
  if (Math.abs(info.offset.x) > SWIPE_DISTANCE || Math.abs(info.velocity.x) > SWIPE_VELOCITY) {
    dismiss(Math.sign(info.offset.x) || 1, info.velocity.x)
  }
  // senão: o spring nativo do drag devolve o card ao lugar automaticamente
}
```

### 5.2.4 A queda — **o detalhe que faz parecer real**

O segredo é **não usar a mesma curva nos três eixos**. Um objeto real jogado para o lado: (a) sai horizontalmente perdendo velocidade, (b) cai verticalmente *ganhando* velocidade (gravidade), (c) gira em rotação quase constante.

```tsx
// Variants do card que sai
const exitVariant = (dir: 1 | -1, velocity: number) => ({
  x:       dir * (typeof window !== 'undefined' ? window.innerWidth : 800) * 0.9,
  y:       260 + Math.abs(velocity) * 0.05,   // cai mais fundo se foi jogado com força
  rotate:  dir * (22 + Math.min(Math.abs(velocity) / 60, 14)),
  scale:   0.92,
  opacity: 0,
  transition: {
    x:       { duration: 0.52, ease: EASE.out },   // desacelera → atrito do ar
    y:       { duration: 0.52, ease: EASE.in },    // ACELERA → gravidade  ⭐
    rotate:  { duration: 0.52, ease: 'linear' },   // giro constante       ⭐
    scale:   { duration: 0.52, ease: EASE.out },   // afasta em profundidade
    opacity: { duration: 0.22, delay: 0.30 },      // some só no fim       ⭐
  },
})
```

Três detalhes que separam "premium" de "amador" e **não podem ser omitidos**:
1. `opacity` com `delay` — o card não evapora, ele *sai de cena*.
2. `y` com `EASE.in` — sem isso a queda parece um deslize de PowerPoint.
3. `rotate` com `linear` — momento angular não desacelera junto com a translação.

### 5.2.5 `AnimatePresence` e a pilha

```tsx
<AnimatePresence initial={false} mode="popLayout" custom={direction}>
  {visible.map((card, i) => (
    <FlashCard key={card.id} card={card} depth={i} isTop={i === 0} custom={direction} />
  ))}
</AnimatePresence>
```

`mode="popLayout"` faz o card que sai deixar imediatamente o fluxo de layout — a pilha sobe *durante* a queda, não depois. Sem isso há um "soluço" de 500 ms.

### 5.2.6 Clique / toque simples (sem arrastar)

Distinguir *tap* de *drag*: registrar `pointerdown` (x,y,t) e comparar no `pointerup`. Se deslocamento < 8 px **e** duração < 250 ms → é tap → `dismiss(+1, 0)` com a mesma física, direção alternando (direita, esquerda, direita…) para a pilha não ficar monótona.

### 5.2.7 Teclado e acessibilidade do deck

- Container: `role="group"` + `aria-roledescription="Pilha de cards interativa"` + `aria-label="Dicas de Psicologia Infantil — card 3 de 10"`.
- O card do topo é focável (`tabIndex={0}`); `←`/`→`/`Espaço`/`Enter` descartam.
- Botão visível **"Próximo card →"** abaixo do deck (não é enfeite: é o caminho de teclado e de leitores de tela).
- Região `aria-live="polite"` que anuncia o conteúdo do novo card do topo.
- Foco visível: `outline: 3px solid var(--amarelo-400); outline-offset: 4px`.

### 5.2.8 `prefers-reduced-motion`

Quando ativo: **sem** drag, **sem** rotação, **sem** queda. O card sai com `opacity: 0` em 150 ms e o próximo entra com `opacity: 0 → 1`. A funcionalidade permanece 100% intacta. Ler com `useReducedMotion()` do `motion/react` e ramificar as variants — **não** desligar a feature.

### 5.2.9 Estado final (`DeckComplete`)

Ao descartar o 10º card, o deck é substituído *no mesmo espaço* (mesma altura reservada → CLS 0) por:

```
╭──────────────────────────────╮
│         ✓  (ícone)           │
│  Você acabou de ver 10.      │
│  Faltam mais de 290.         │
│  ╭────────────────────────╮  │
│  │ QUERO OS +300 CARDS    │  │  ← CTA verde
│  ╰────────────────────────╯  │
│  R$ 27,90 · pagamento único  │
│  ↺ ver os cards de novo      │  ← reset (ghost)
╰──────────────────────────────╯
```

Entrada: `initial={{opacity:0, scale:0.9, y:16}}` → `animate={{opacity:1, scale:1, y:0}}` com `SPRING.card`, `delay: 0.25` (deixa o último card terminar de cair). Opcional: 10 partículas `div` de 6 px em cores da paleta, animadas por 700 ms e desmontadas — **sem biblioteca de confete**.

Disparar `track('deck_completed')`.

### 5.2.10 Regra inviolável de scroll

**Se o usuário simplesmente rolar a página, nada disso importa.** O deck nunca:
- captura o scroll (`overflow`, `scroll-lock`, `position: fixed`);
- exibe overlay;
- adia a renderização do conteúdo abaixo;
- muda de altura ao ser interagido.

A `DeckHint` ("arraste ou toque") pulsa 3 vezes com `animation: float` e some após a primeira interação ou após 8 s.

## 5.3 Scroll reveals (resto da página)

Componente único `<Reveal>`:

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
  transition={{ duration: DURATION.slow, ease: EASE.out, delay }}
/>
```

- **Stagger:** listas usam `staggerChildren: 0.06` no pai, com **teto de 8 filhos animados** — acima disso, anime o container inteiro (senão o último item chega meio segundo atrasado e parece travamento).
- Máximo de **24 px** de deslocamento. Reveals de 60–100 px parecem "site de template de IA".
- Cabeçalhos de seção jamais têm `delay` > 0 — o texto principal aparece imediatamente.

## 5.4 Marquee da vitrine de cards

CSS puro (`animation: marquee 40s linear infinite`), conteúdo duplicado 2× e `aria-hidden` na cópia. `@media (prefers-reduced-motion: reduce) { animation: none; overflow-x: auto; }` — vira carrossel scrollável. Zero JS.

## 5.5 Pop-ups — fila, elegância e transição suave

### 5.5.1 Arquitetura de fila (o requisito central)

`PopupProvider` mantém `queue: PopupId[]` e `current: PopupId | null`. Regras:

1. **Um por vez.** Nunca dois modais simultâneos.
2. **Respiro entre eles.** Ao fechar, aguardar `EXIT (220ms) + GAP (420ms)` antes de abrir o próximo. Esse intervalo é o que separa "transição suave" de "site que te bombardeia".
3. **O backdrop persiste entre pop-ups consecutivos.** Se há outro na fila, o backdrop **não** desmonta — só o painel troca. Efeito: crossfade elegante em vez de piscada branca.

```tsx
<AnimatePresence mode="wait" onExitComplete={promoteNext}>
  {current && <PopupShell key={current}>{renderPopup(current)}</PopupShell>}
</AnimatePresence>
```

`mode="wait"` garante que o painel A termine de sair antes de o B entrar. `onExitComplete` é o gancho que puxa o próximo da fila após o `GAP`.

### 5.5.2 Animação do painel

```ts
// Backdrop — só opacidade, sempre
const backdrop = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24, ease: EASE.out } },
  exit:    { opacity: 0, transition: { duration: 0.20, ease: EASE.in } },
}

// Painel desktop
const panel = {
  hidden:  { opacity: 0, y: 28, scale: 0.965 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { ...SPRING.popup, delay: 0.06 } },
  exit:    { opacity: 0, y: 14, scale: 0.98, transition: { duration: 0.22, ease: EASE.in } },
}

// Painel mobile = BOTTOM SHEET
const sheet = {
  hidden:  { y: '100%' },
  visible: { y: 0, transition: SPRING.popup },
  exit:    { y: '100%', transition: { duration: 0.26, ease: EASE.in } },
}
```

Backdrop: `bg-tinta-900/55` + `backdrop-blur-[3px]`. **Nunca** anime `backdrop-filter` (custo altíssimo de GPU): aplique-o estático e anime só a opacidade do elemento.

No mobile, o sheet é arrastável para baixo: `drag="y"`, `dragConstraints={{top:0, bottom:0}}`, `dragElastic={{top:0, bottom:0.4}}`; fecha se `offset.y > 120 || velocity.y > 600`. Handle visual de 40×4 px no topo, `--roxo-200`.

### 5.5.3 Gatilhos (conservadores por decisão de marca)

| Pop-up | Gatilho | Trava |
|---|---|---|
| `exit-intent` | Desktop: `mouseleave` com `clientY <= 0` | Após 25 s na página **e** scroll > 25%; 1× por sessão |
| `scroll-nudge` | Mobile: 60% de scroll **e** ≥ 40 s na página | 1× por sessão |

Supressões globais (todas obrigatórias):
- Nunca nos primeiros **20 segundos**.
- Nunca enquanto `isSuppressed` (usuário interagindo com o deck ou com o acordeão).
- Nunca depois que `track('begin_checkout')` disparou.
- Persistência em `sessionStorage` (`lp_popup_seen`), **não** `localStorage` — quem volta em outro dia merece uma página limpa, e evita conflito com o consentimento.
- `exit-intent` **nunca** no mobile (não existe "sair pelo topo" em touch; a heurística gera falso positivo).

### 5.5.4 Conteúdo dos pop-ups

Nada de "ESPERA! NÃO VÁ EMBORA!!!". O tom é o da marca:

- **`exit-intent`** — título: *"Leva um card com você."* Corpo: um card real (o mesmo componente `FlashCard`, estático) + a oferta em uma linha + CTA. Botão secundário em texto: *"Continuar lendo a página"*.
- **`scroll-nudge`** — título: *"Uma pergunta rápida"* → *"O que mais te trava hoje: encontrar o conteúdo ou organizar o que já estudou?"* Duas opções → ambas levam ao CTA com copy adaptada. Serve de micro-compromisso e ainda te dá dado qualitativo via evento.

### 5.5.5 Acessibilidade dos modais

`role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando para o `<h2>` interno. Focus trap; foco inicial no título (não no botão de fechar, e nunca no CTA — isso é dark pattern); `Esc` fecha; foco retorna ao elemento anterior; `inert` no `<main>` enquanto aberto; botão de fechar com `aria-label="Fechar"` e área de toque ≥ 44×44 px.

---

# 6. Conteúdo estruturado (data layer)

Toda a copy vive em `/content/*.ts` tipada. Nenhuma string de marketing hardcoded em JSX. Isso permite editar a página inteira sem tocar em componente.

## 6.1 `content/site.ts`

```ts
export const SITE = {
  name: '+300 Cards de Psicologia Infantil',
  url: 'https://SEU-DOMINIO.com.br',      // ⚠️ substituir antes do deploy
  price: 27.9,
  priceFormatted: 'R$ 27,90',
  priceAnchor: 'R$ 110,90',
  currency: 'BRL',
  checkoutUrl: 'https://pay.SEU-CHECKOUT.com/xxxx',  // ⚠️ substituir
  guaranteeDays: 7,
  supportEmail: 'contato@SEU-DOMINIO.com.br',
} as const
```

## 6.2 `content/hero-cards.ts` — os 10 cards do deck

Conteúdo real, educativo, **não diagnóstico**. Cada card: 1 categoria, 1 ideia, ≤ 30 palavras.

| # | Categoria | Título | Texto |
|---|---|---|---|
| 01 | Emoções | Nomear diminui a intensidade | Quando a criança encontra a palavra para o que sente, a emoção deixa de ser uma onda difusa e vira algo que ela consegue observar. |
| 02 | Comportamento | Birra raramente é manipulação | Na maior parte das vezes é um sistema de regulação sobrecarregado. Antes de corrigir, é preciso ajudar o corpo a voltar ao normal. |
| 03 | Ansiedade | A evitação alivia agora e ensina medo depois | Cada fuga confirma para a criança que aquilo era mesmo perigoso. O alívio imediato é o que mantém o ciclo funcionando. |
| 04 | TDAH | Não é falta de atenção | É dificuldade de decidir para onde a atenção vai e por quanto tempo fica. O hiperfoco é a outra face do mesmo funcionamento. |
| 05 | Autismo | Previsibilidade é acessibilidade | Antecipar o que vai acontecer reduz a carga de processamento e libera recursos para o que realmente importa naquele momento. |
| 06 | Vínculo | "Não sei" costuma ser um pedido de tempo | Raramente é recusa. Às vezes a criança precisa de outra pergunta, de um desenho, ou só de mais alguns segundos de silêncio. |
| 07 | Desenvolvimento | Antes dos 6 anos, o corpo fala primeiro | Dor de barriga antes da escola, dor de cabeça recorrente e sono agitado podem ser as primeiras palavras de uma ansiedade sem nome. |
| 08 | Família | Validar não é concordar | Reconhecer o que a criança sentiu não significa aprovar o que ela fez. São dois momentos diferentes da mesma conversa. |
| 09 | Luto | Crianças enlutam em ondas | Choram, brincam, perguntam de novo e voltam a brincar. Isso não é indiferença: é a forma infantil de suportar a dose. |
| 10 | Escola | Recusa escolar quase nunca é preguiça | É uma conta entre o que a criança teme e os recursos que ela sente ter. Mudar o resultado exige mexer nos dois lados. |

> Rodapé do deck (obrigatório, `--text-xs`, `--roxo-200`): *"Conteúdo educativo. Não substitui formação, supervisão ou avaliação psicológica."*

## 6.3 Demais arquivos

- `categorias.ts` → 12 objetos `{ numero, titulo, descricao, icone, cor }` (copy da 3ª sessão).
- `entregaveis.ts` → 6 itens com `check`.
- `bonus.ts` → 3 bônus com `valor` + tabela de ancoragem.
- `depoimentos.ts` → **placeholder tipado**. Cada item traz `{ nome, papel, texto, nota }`. ⚠️ **Não inventar depoimentos.** Enquanto vazio, a seção renderiza um *empty state* honesto: um bloco com os 6 eixos de prova sugeridos + comentário `{/* TODO: substituir por prints reais */}`. Depoimento fabricado é infração ao art. 37 do CDC e destrói a confiança do público-alvo.
- `faq.ts` → as 13 perguntas da 10ª sessão, `{ pergunta, resposta }`.
- `showcase.ts` → os 16 títulos de cards da vitrine.

---

# 7. Estratégia de SEO técnico (Claude SEO)

> Princípios extraídos do repositório `AgricIDaniel/claude-seo`, alinhados ao *AI Optimization Guide* do Google e às diretrizes vigentes em 2026. **Atenção às deprecações — várias práticas ainda populares já não geram resultado.**

## 7.1 Realidade atual que muda o plano (leia antes de marcar qualquer coisa)

| Item | Status | Consequência para este projeto |
|---|---|---|
| **FAQPage** | Google **deixou de exibir rich results de FAQ para todos os sites em 07/05/2026** | Manter o acordeão com HTML semântico impecável. O JSON-LD `FAQPage` é **opcional** e não traz rich snippet — inclua-o apenas como semântica interna, sem esperar retorno de SERP. |
| **HowTo** | Rich result removido desde 2023 | ❌ Não usar. |
| **JSON-LD** | Formato preferido do Google | ✅ Todo o schema em JSON-LD, nada de microdata. |
| **FID** | Substituído por **INP** | Medir INP (< 200 ms), nunca FID. |
| **llms.txt** | Sem evidência de ser alavanca de citação; Google ignora | Opcional/cosmético. Não priorizar. |
| **E-E-A-T** | **Trust é o fator de maior peso** | Página precisa de identidade, contato, política clara e disclaimers visíveis. Isso não é "burocracia": é ranking. |

## 7.2 Metadata (App Router)

```ts
// app/layout.tsx
import type { Metadata } from 'next'
import { SITE } from '@/content/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: '+300 Cards de Psicologia Infantil | Biblioteca Visual de Consulta Rápida',
    template: '%s | +300 Cards de Psicologia Infantil',
  },
  description:
    'Biblioteca visual com mais de 300 cards de Psicologia Infantil organizados em 12 áreas — desenvolvimento, emoções, ansiedade, TDAH, autismo, família e mais. Consulte pelo celular em segundos. Acesso digital por R$ 27,90.',
  keywords: [
    'cards de psicologia infantil', 'material de apoio psicologia infantil',
    'flashcards psicologia infantil', 'resumo psicologia infantil',
    'material para estagiário de psicologia', 'psicologia infantil consulta rápida',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.name,
    title: '+300 Cards de Psicologia Infantil na palma da sua mão',
    description:
      'Desenvolvimento, emoções, ansiedade, TDAH, autismo, família e mais — em 12 categorias organizadas para consulta rápida. Acesso digital por R$ 27,90.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Pilha de cards de Psicologia Infantil sobre fundo roxo', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '+300 Cards de Psicologia Infantil',
    description: 'Uma biblioteca visual para consultar em segundos. R$ 27,90, acesso digital.',
    images: ['/og.jpg'],
  },
  category: 'education',
  formatDetection: { telephone: false, address: false, email: false },
}
```

### Regras específicas de WhatsApp / Instagram (crítico — é daí que vem o tráfego)

O WhatsApp é o preview mais exigente da lista. Requisitos **não negociáveis**:

1. `og:image` em **URL absoluta** (`metadataBase` resolve isso — confira o HTML renderizado).
2. **JPG ou PNG**, `1200×630`, **abaixo de 300 KB**. O WhatsApp descarta imagens grandes e o link vira um retângulo cinza. WebP tem suporte inconsistente no preview → **use JPG no OG**, mesmo que o resto do site seja WebP/AVIF.
3. `og:image:width` e `og:image:height` explícitos (o Next injeta ao usar o formato acima) — sem eles o crawler às vezes não baixa a imagem.
4. `og:title` ≤ 60 caracteres e `og:description` ≤ 110 caracteres — o WhatsApp trunca cedo.
5. A imagem OG deve ser **legível em 200×105 px**: título curto e grande, sem parágrafos, marca visível.
6. Teste obrigatório antes do deploy: Facebook Sharing Debugger + envio real do link para si mesmo no WhatsApp.

Gere `/public/og.jpg` estático **e** um `app/opengraph-image.tsx` (next/og) — o estático é o fallback confiável.

## 7.3 Schema.org — JSON-LD

Um único `<script>` no `layout.tsx` com um `@graph`, todos os nós interligados por `@id`. Isso é preferível a três scripts soltos.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://SEU-DOMINIO.com.br/#organization",
      "name": "NOME DA MARCA",
      "url": "https://SEU-DOMINIO.com.br",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://SEU-DOMINIO.com.br/#logo",
        "url": "https://SEU-DOMINIO.com.br/logo.png",
        "width": 512, "height": 512,
        "caption": "NOME DA MARCA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contato@SEU-DOMINIO.com.br",
        "contactType": "customer support",
        "availableLanguage": ["Portuguese"]
      },
      "sameAs": ["https://www.instagram.com/SEU_PERFIL"],
      "knowsAbout": [
        "Psicologia Infantil", "Desenvolvimento Infantil",
        "Regulação Emocional", "TDAH", "Transtorno do Espectro Autista",
        "Parentalidade", "Luto Infantil"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://SEU-DOMINIO.com.br/#website",
      "url": "https://SEU-DOMINIO.com.br",
      "name": "+300 Cards de Psicologia Infantil",
      "inLanguage": "pt-BR",
      "publisher": { "@id": "https://SEU-DOMINIO.com.br/#organization" }
    },
    {
      "@type": "Product",
      "@id": "https://SEU-DOMINIO.com.br/#product",
      "name": "+300 Cards de Psicologia Infantil",
      "description": "Biblioteca digital com mais de 300 cards visuais de Psicologia Infantil, organizados em 12 categorias — desenvolvimento infantil, emoções e regulação emocional, comportamento e limites, ansiedade, TDAH e funções executivas, autismo e neurodiversidade, habilidades sociais, família e parentalidade, luto e mudanças, escola e aprendizagem, primeiras sessões e vínculo, e psicoeducação para pais. Material educativo de consulta rápida para estudantes e profissionais de Psicologia.",
      "image": ["https://SEU-DOMINIO.com.br/og.jpg"],
      "brand": { "@id": "https://SEU-DOMINIO.com.br/#organization" },
      "category": "Material educacional digital",
      "audience": {
        "@type": "Audience",
        "audienceType": "Estudantes de Psicologia e psicólogos clínicos infantis"
      },
      "isFamilyFriendly": true,
      "inLanguage": "pt-BR",
      "offers": {
        "@type": "Offer",
        "@id": "https://SEU-DOMINIO.com.br/#offer",
        "url": "https://SEU-DOMINIO.com.br/",
        "price": "27.90",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "priceValidUntil": "2027-12-31",
        "seller": { "@id": "https://SEU-DOMINIO.com.br/#organization" },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "BR",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        }
      }
    }
  ]
}
```

⚠️ **Regras de integridade do schema (falhas comuns que geram penalidade de confiança):**
- **Não** inclua `aggregateRating` ou `review` enquanto não houver avaliações reais e visíveis na página. Rating inventado é violação explícita das políticas de dados estruturados.
- `price` como **string** com ponto decimal (`"27.90"`), nunca `"R$ 27,90"`.
- O preço no schema e o preço visível na página têm de bater **exatamente**. Divergência = *content-schema mismatch*.
- Validar em **Rich Results Test** *e* **Schema Markup Validator** antes do deploy.

## 7.4 Estrutura semântica de headings

```
<h1>  Tenha na palma da mão os principais conteúdos da Psicologia Infantil…   ← ÚNICO
 ├ <h2> Você não precisa lembrar de tudo para se sentir mais preparado
 ├ <h2> Conheça a Biblioteca Visual de Psicologia Infantil
 │   └ <h3> 01. Desenvolvimento Infantil … 12. Psicoeducação para Pais
 ├ <h2> O que você recebe ao garantir seu acesso
 ├ <h2> Por que criamos os +300 Cards de Psicologia Infantil?
 ├ <h2> O que estudantes e profissionais estão dizendo
 ├ <h2> Bônus inclusos
 ├ <h2> Acesso por R$ 27,90
 ├ <h2> 7 dias de garantia
 ├ <h2> Perguntas frequentes
 │   └ <h3> Para quem são os 300 Cards de Psicologia Infantil?  (× 13)
 └ <h2> Tudo organizado em um único lugar
```

Cada `<section>` recebe `aria-labelledby` apontando para o id do seu H2. **Nunca** usar heading para controlar tamanho de fonte — para isso existem classes.

## 7.5 GEO / AEO — otimização para busca com IA

O Google trata GEO/AEO como rótulos novos para SEO: o piso de elegibilidade é indexação normal. O que efetivamente aumenta citabilidade:

1. **Blocos de resposta autocontidos de 134 a 167 palavras.** As respostas do FAQ devem funcionar isoladamente, sem depender do contexto acima. Reescreva as respostas curtas da copy original para essa faixa **nas 5 perguntas de maior intenção informacional** (para quem serve, o que é, como recebo, substitui livros?, é confiável?) — as demais podem ser curtas.
2. **Headings em forma de pergunta** no FAQ (a copy já faz isso ✅).
3. **Densidade de atribuição:** a seção "Sobre o material" deve dizer *quem* fez, *como* foi organizado e *por quê* — o heurístico Quem/Como/Por quê do Google.
4. **Presença de entidade:** ligar a marca via `sameAs` ao Instagram real; se houver perfil profissional (CRP), citar.
5. **Não faça:** reescrita de palavra-chave "para IA", *chunking* artificial, ou apostar em `llms.txt`. Nada disso é alavanca.

## 7.6 E-E-A-T — o eixo Trust (maior peso)

Itens obrigatórios na página, **não opcionais**:

- Rodapé com razão social/CNPJ, e-mail de contato clicável e links para Política de Privacidade e Termos de Uso (páginas reais, não `#`).
- Disclaimer de escopo, já presente na copy, renderizado como bloco visual destacado (`--roxo-100`, ícone de informação): *"material educativo e de apoio; não substitui formação profissional, supervisão, avaliação psicológica, instrumentos validados ou protocolos clínicos."*
- Condições da garantia de 7 dias escritas por extenso (base legal: CDC art. 49).
- HTTPS, sem conteúdo misto.
- Data de última atualização no rodapé.

## 7.7 `robots.ts` e `sitemap.ts`

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/obrigado', '/api/'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}

// app/sitemap.ts  → '/', '/politica-de-privacidade', '/termos-de-uso'
// '/obrigado' recebe metadata robots noindex,nofollow no próprio arquivo.
```

---

# 8. Performance, imagens e Core Web Vitals

## 8.1 Metas

| Métrica | Alvo p75 mobile |
|---|---|
| LCP | < 2,5 s (ideal < 1,8 s) |
| INP | < 200 ms |
| CLS | < 0,1 (meta real: **0**) |
| JS inicial | < 120 KB gzip |
| Lighthouse mobile | ≥ 92 em todas as categorias |

## 8.2 Imagens — instruções para os placeholders

⚠️ **`source.unsplash.com` foi descontinuado** e retorna erro/redirect. **Não usar.** Ordem de preferência:

1. **Placeholders locais em SVG** gerados no projeto (gradiente da paleta + rótulo do que entra ali). Zero requisição externa, zero risco de LCP ruim, e o cliente vê exatamente onde encaixar a foto real. **Esta é a opção padrão.**
2. `https://picsum.photos/seed/{slug}/800/600` para os poucos lugares que precisam de fotografia real (prova social, mockup de contexto).
3. `https://images.unsplash.com/photo-{ID}?w=800&q=75` com IDs fixos, se uma foto específica for necessária.

Configuração:

```ts
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    { protocol: 'https', hostname: 'picsum.photos' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
}
```

Regras: **todo** `<Image>` com `width`/`height` ou `fill` + wrapper com `aspect-ratio`; `sizes` explícito; `priority` **apenas** se houver imagem acima da dobra (idealmente **não haverá** — o hero é tipografia + deck em CSS, o que é ótimo para LCP); `placeholder="blur"` com `blurDataURL` nas fotos grandes; `alt` descritivo real ou `alt=""` se decorativa. Cada placeholder recebe `{/* TODO: trocar por foto definitiva */}`.

## 8.3 Estratégia de carregamento

- `page.tsx` é **Server Component**. Só viram client: `HeroInteractive`, `AccordionFAQ`, `StickyCTA`, `PopupProvider`.
- Pop-ups via `dynamic(() => import(...), { ssr: false })` — não entram no bundle inicial.
- `LazyMotion` + `domAnimation` + componente `m` fora do hero.
- Fontes: `next/font` com `display: 'swap'` e `adjustFontFallback` (padrão) → zero FOUT perceptível, zero CLS de fonte.
- Pixels (Meta/GA4) via `@next/third-parties` ou `<Script strategy="afterInteractive">`. **Nunca** `beforeInteractive`.
- `will-change: transform` **apenas** nos cards do topo do deck, removido ao final da animação.
- Reservar altura do deck com `min-height` responsivo → o CLS do hero precisa ser exatamente 0.

---

# 9. Acessibilidade e conformidade

- **WCAG 2.2 AA** como piso. Foco visível em 100% dos interativos (`:focus-visible` com `outline` de 3 px `--amarelo-400`).
- Alvos de toque ≥ 44×44 px.
- Todo interativo é `<button>` ou `<a>`. Zero `<div onClick>`.
- Navegação completa por teclado, incluindo o deck e os modais.
- `prefers-reduced-motion` respeitado em: deck, reveals, marquee, pop-ups, botão CTA.
- Texto nunca dentro de imagem (exceto o OG).
- `lang="pt-BR"` no `<html>`.
- **Conformidade de conteúdo (Psicologia):** manter todos os disclaimers da copy; nenhuma promessa de resultado clínico; nenhuma linguagem que sugira capacidade diagnóstica; a página não afirma que o material é validado cientificamente, e sim que é educativo. Isso protege o cliente e sustenta o E-E-A-T.
- **Depoimentos:** somente reais e verificáveis (CDC art. 37 — publicidade enganosa). Placeholder honesto até haver prova.

---

# 10. Definition of Done (checklist de entrega)

**Funcional**
- [ ] Deck com 10 cards; drag, tap e teclado descartam corretamente
- [ ] 10/10 substitui o deck pelo `DeckComplete` sem mudar a altura (CLS 0)
- [ ] Botão "ver de novo" reinicia a pilha
- [ ] Rolar a página nunca é bloqueado pelo deck (testar em iOS Safari real)
- [ ] Um pop-up por vez, com respiro de ~420 ms entre eles, backdrop persistente
- [ ] Nenhum pop-up antes de 20 s, nem depois do clique no CTA
- [ ] Todos os CTAs apontam para `SITE.checkoutUrl` e disparam `begin_checkout` com `origem`

**Visual**
- [ ] Zero cor fora da paleta declarada
- [ ] CTA verde com texto `--tinta-900` (nunca branco)
- [ ] Ritmo roxo↔claro conforme o mapa da seção 3

**Técnico**
- [ ] `tsc --noEmit` limpo; ESLint sem warnings; zero `any`
- [ ] Lighthouse mobile ≥ 92 em Performance, A11y, Best Practices, SEO
- [ ] CLS = 0 no hero; LCP < 2,5 s em 4G simulado
- [ ] JSON-LD validado no Rich Results Test **e** no Schema Markup Validator
- [ ] Preview do link testado no WhatsApp real e no Facebook Debugger
- [ ] `robots.txt` e `sitemap.xml` acessíveis; `/obrigado` com `noindex`
- [ ] Teste com `prefers-reduced-motion: reduce` ativo — tudo continua utilizável
- [ ] Navegação completa por teclado, do topo ao rodapé, sem armadilha de foco

---

# 11. Prompt de execução para o Claude Code

> **Cole o bloco abaixo como primeira instrução na sessão do Claude Code, com este arquivo presente na raiz do projeto.**

```
Você é o desenvolvedor responsável por implementar a landing page descrita em
`projeto_landing_page.md`, que está na raiz deste repositório. Leia o documento
INTEIRO antes de escrever uma única linha de código e trate-o como especificação
contratual: paleta, tipografia, raios, tokens de motion, contratos de props,
estrutura de arquivos e regras de SEO são decisões já tomadas — não reinterprete,
não "melhore" por conta própria e não substitua nenhum valor hexadecimal, curva de
easing ou nome de arquivo. Se encontrar ambiguidade real ou contradição, PARE e
pergunte antes de improvisar.

Construa em fases, e ao fim de cada fase pare, rode `npx tsc --noEmit` e me
mostre o que foi feito antes de continuar:

FASE 1 — Fundação. Projeto Next.js 15 + TypeScript strict + Tailwind 4.
Implemente `app/fonts.ts`, `app/globals.css` com todos os tokens CSS da seção 2,
`tailwind.config.ts` exatamente como especificado, `lib/cn.ts`, `lib/motion.ts`,
`lib/analytics.ts` e todo o `/content/*.ts` com a copy da seção 6 já preenchida.
Nenhuma string de marketing pode ficar hardcoded em JSX.

FASE 2 — UI base. `Container`, `SectionShell`, `Button`, `CtaButton`, `Badge`,
`Reveal`. Estes componentes definem o vocabulário visual de toda a página; capriche
neles antes de seguir.

FASE 3 — Hero Deck (o coração do projeto). Implemente `HeroInteractive`,
`CardDeck`, `FlashCard`, `DeckProgress`, `DeckHint` e `DeckComplete` seguindo a
seção 5.2 ao pé da letra — especialmente as transições por eixo do `exitVariant`
(x com ease-out, y com ease-in, rotate linear, opacity com delay), o
`touchAction: 'pan-y'`, o `mode="popLayout"`, a distinção tap vs. drag, o suporte a
teclado e o caminho de `prefers-reduced-motion`. Teste em viewport de 375 px antes
de declarar pronto.

FASE 4 — Seções de conteúdo, na ordem da tabela da seção 3, todas Server Components
exceto onde a seção 4.1 marca `'use client'`. Aplique `Reveal` com moderação: no
máximo 24 px de deslocamento e teto de 8 filhos em stagger.

FASE 5 — Pop-ups. `PopupProvider` com fila, `PopupShell` com focus trap, bottom
sheet no mobile, backdrop persistente entre pop-ups consecutivos, `onExitComplete`
puxando o próximo após o GAP, e todas as supressões da seção 5.5.3. Carregue por
`dynamic(..., { ssr: false })`.

FASE 6 — SEO e performance. `metadata`, `opengraph-image`, `robots.ts`,
`sitemap.ts`, `JsonLd` com o `@graph` completo da seção 7.3, páginas legais e
`/obrigado` com noindex. Rode Lighthouse mobile e me traga os números.

Regras permanentes durante todas as fases: TypeScript sem `any`; elementos
interativos são `<button>` ou `<a>`; `'use client'` só onde houver estado, evento
ou hook; imagens seguem a seção 8.2 (placeholders SVG locais por padrão —
`source.unsplash.com` está descontinuado, não use); animações apenas em `transform`
e `opacity`; nenhum depoimento inventado; todos os disclaimers de Psicologia
preservados. Marque com `{/* TODO: */}` cada ponto onde eu preciso substituir
conteúdo real (checkout, domínio, CNPJ, prints de depoimento, fotos) e liste esses
TODOs em um resumo ao final da última fase.
```

---

**Fim do documento.** Última revisão: 19/08/2026.
