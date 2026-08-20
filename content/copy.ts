// Copy que não se encaixa nos arquivos nomeados de §6.3 (categorias, entregáveis,
// bônus, depoimentos, faq, showcase) mas que, pela regra permanente, também não
// pode ficar hardcoded em JSX. Preenchido incrementalmente por fase.
//
// Nota sobre headings ausentes em §7.4: a árvore semântica de §7.4 não dá <h2>
// próprio para as seções "12 Categorias" e "Vitrine de cards", embora §3 as
// trate como <section> à parte (faixas de cor diferentes) e §7.4 exija
// aria-labelledby por section. Resolvido usando texto literal já presente na
// copy original como heading (não é copy nova) — ver `SECTION_CATEGORIAS.heading`
// e `SECTION_SHOWCASE.heading` abaixo.

export const ANNOUNCEMENT_BAR_COPY = '⚡ Acesso imediato · 7 dias de garantia'

export const HERO_COPY = {
  // O trecho entre asteriscos é convertido em <mark> por HeroInteractive — é a
  // "marcação de destaque via <mark> controlado" do contrato de §4.2, sem
  // embutir HTML no dado.
  headline:
    'Tenha na palma da mão os principais conteúdos da Psicologia Infantil em *+300 Cards Visuais* e transforme horas de pesquisa em consultas de poucos minutos.',
  subheadline:
    'Uma biblioteca prática criada para estudantes e profissionais de Psicologia que querem consultar temas como desenvolvimento infantil, emoções, comportamento, ansiedade, TDAH, autismo, família e muito mais, de forma simples, visual e organizada.',
  badge: '⚡ Acesso imediato · 7 dias de garantia',
  ctaLabel: 'QUERO ACESSAR OS +300 CARDS AGORA',
  microcopy: 'Acesso digital · Consulte pelo celular, tablet ou computador',
} as const

export const DECK_HINT_COPY = 'Arraste ou toque'
export const DECK_NEXT_BUTTON_LABEL = 'Próximo card'
export const DECK_ARIA_LABEL_PREFIX = 'Dicas de Psicologia Infantil'
export const DECK_ARIA_ROLEDESCRIPTION = 'Pilha de cards interativa'

export const DECK_COMPLETE_COPY = {
  titulo: 'Você acabou de ver 10.',
  subtitulo: 'Faltam mais de 290.',
  ctaLabel: 'QUERO OS +300 CARDS',
  precoSufixo: 'pagamento único',
  resetLabel: 'Ver os cards de novo',
} as const

// §3 · 02 — Dor / Desejo (roxo-50)
export const SECTION_DOR = {
  heading: 'Você não precisa lembrar de tudo para se sentir mais preparado',
  intro: 'Quem estuda ou trabalha com Psicologia Infantil sabe:',
  paragrafos: [
    'São dezenas de conceitos, comportamentos, fases do desenvolvimento, demandas emocionais e situações familiares que podem aparecer.',
    'E, muitas vezes, quando você precisa consultar alguma informação, acontece isso:',
  ],
  pontosDeDor: [
    'Você abre vários PDFs tentando encontrar um assunto específico.',
    'Pesquisa em diferentes materiais e perde minutos preciosos.',
    'Salva conteúdos no celular e depois nunca mais encontra.',
    'Tem dificuldade para organizar tudo o que estudou.',
    'Sente que estudou determinado assunto, mas não lembra exatamente onde.',
    'Gostaria de ter um material rápido para revisar antes de uma aula, estágio ou atendimento.',
  ],
  paragrafosResolucao: [
    'Agora imagine ter tudo isso organizado em uma única biblioteca visual.',
    'Você identifica o assunto. Abre o card. Consulta os principais pontos. E continua seu estudo ou trabalho.',
  ],
  fechamento: 'Foi exatamente para isso que criamos os +300 Cards de Psicologia Infantil.',
} as const

// §3 · 03 — Metodologia (branco)
export const SECTION_METODOLOGIA = {
  heading: 'Conheça a Biblioteca Visual de Psicologia Infantil',
  intro:
    'Em vez de entregar centenas de páginas densas, organizamos os principais assuntos da Psicologia Infantil em cards objetivos, visuais e fáceis de consultar.',
  explicacao: 'Cada card aborda uma pequena dúvida ou tema específico.',
  comparativoIntro: 'Assim, em vez de procurar:',
  buscaGenerica: 'Material sobre ansiedade infantil',
  comparativoOutro: 'Você poderá encontrar cards específicos como:',
  exemplosCards: [
    'Medo de errar',
    'Ansiedade de separação',
    'Ansiedade escolar',
    'Sintomas físicos da ansiedade',
    'Pensamentos antecipatórios',
    'Evitação',
    'Busca excessiva por segurança',
  ],
  conclusao: 'Isso torna a consulta muito mais rápida e organizada.',
} as const

// §3 · 04 — 12 Categorias (roxo-500)
export const SECTION_CATEGORIAS = {
  heading: 'Os cards foram divididos em 12 grandes áreas',
  fechamento: [
    'São +300 conteúdos organizados para você consultar quando precisar.',
    'Sem precisar procurar em dezenas de pastas.',
    'Sem abrir 20 arquivos.',
    'Sem depender da memória para lembrar onde viu determinado conteúdo.',
  ],
} as const

// §3 · 05 — O que você recebe (branco)
export const SECTION_ENTREGA = {
  eyebrow: 'O que você vai receber',
  heading: 'O que você recebe ao garantir seu acesso',
  lead: 'Ao garantir seu acesso hoje, você recebe:',
} as const

// §3 · 05b — Foto do produto (cards físicos, visão de conjunto)
export const SECTION_PRODUTO_VISUAL = {
  heading: 'Cada card, um problema real do consultório',
  lead: 'Birra, ansiedade de separação, sobrecarga sensorial, TDAH. Um formato só, sempre à mão.',
} as const

// §3 · 06 — Vitrine de cards / marquee (roxo-50)
export const SECTION_SHOWCASE = {
  heading: 'Veja alguns dos cards que você vai encontrar',
  fechamento: 'E centenas de outros conteúdos.',
  ctaLabel: 'QUERO MINHA BIBLIOTECA DE CARDS',
} as const

// §3 · 07 — Sobre o material (branco)
export const SECTION_SOBRE = {
  heading: 'Por que criamos os +300 Cards de Psicologia Infantil?',
  intro: 'Durante a formação e a prática em Psicologia, temos acesso a uma enorme quantidade de informação.',
  palavrasStaccato: ['Livros.', 'Artigos.', 'Aulas.', 'PDFs.', 'Anotações.', 'Cursos.'],
  problemaNaoE: 'O problema não é a falta de conteúdo.',
  problemaE: 'O problema é encontrar a informação certa quando precisamos dela.',
  paragrafos: [
    'Os +300 Cards de Psicologia Infantil nasceram com o objetivo de organizar conteúdos importantes da área infantil em um formato muito mais simples de consultar e revisar.',
    'Não queremos substituir livros, artigos científicos, supervisão ou formação profissional.',
    'Queremos ser o material que fica ao seu lado para aquela consulta rápida do dia a dia.',
  ],
  fechamento: 'Uma verdadeira biblioteca visual de Psicologia Infantil na palma da sua mão.',
  disclaimer:
    'IMPORTANTE: Este é um material educativo e de apoio. Ele não substitui formação profissional, supervisão, avaliação psicológica, instrumentos validados ou protocolos clínicos.',
} as const

// §3 · 08 — Prova social (roxo-50)
export const SECTION_PROVA_SOCIAL = {
  heading: 'O que estudantes e profissionais estão dizendo',
} as const

// §3 · 09 — Bônus + stack de valor (branco)
export const SECTION_BONUS = {
  eyebrow: 'Bônus inclusos',
  heading: 'Bônus inclusos',
  lead: 'E garantindo seu acesso hoje, você ainda recebe:',
  ancoragemIntro: 'Comprando separadamente você poderia pagar:',
  naoVaiPagar: ['Mas você não vai pagar R$ 110,90.', 'Nem R$ 67.', 'Nem R$ 47.'],
} as const

// §3 · 10 — Preço / Oferta (roxo-500)
export const SECTION_PRECO = {
  heading: 'Acesso por R$ 27,90',
  lead: 'Tenha uma biblioteca com +300 Cards de Psicologia Infantil por apenas:',
  subLead: ['Pagamento único.', 'Sem mensalidade.', 'Acesso digital.'],
  itensInclusos: [
    '+300 Cards de Psicologia Infantil',
    '12 categorias organizadas',
    'Guia de Consulta Rápida',
    '50 Perguntas para Construção de Vínculo',
    '30 Cards de Orientação para Pais',
    'Acesso digital pelo celular, tablet ou computador',
  ],
  closingLine: 'Tudo por apenas R$ 27,90.',
  comparativo: 'Menos do que você provavelmente gastaria em um único livro da área.',
  ctaLabel: 'QUERO ACESSAR OS +300 CARDS AGORA',
  microcopy: 'Pagamento seguro · Acesso digital',
} as const

// §3 · 11 — Garantia (branco)
export const SECTION_GARANTIA = {
  heading: '7 dias de garantia',
  lead: 'Você tem 7 dias para conhecer o material.',
  paragrafos: [
    'Queremos que você faça sua compra com tranquilidade.',
    'Por isso, após adquirir os +300 Cards de Psicologia Infantil, você terá 7 dias de garantia, conforme aplicável à compra online.',
  ],
  passos: ['Acesse.', 'Conheça o conteúdo.', 'Veja a organização dos cards.'],
  condicao:
    'Se dentro desse período você decidir que o material não é para você, solicite o cancelamento conforme as condições informadas no momento da compra.',
  // Base legal já estabelecida em §1.1 ("Garantia | 7 dias (CDC, art. 49)") — por
  // extenso aqui porque §7.6 exige isso explicitamente como item de E-E-A-T.
  baseLegal: 'Direito de arrependimento previsto no art. 49 do Código de Defesa do Consumidor (CDC).',
  fechamento: 'O risco fica conosco.',
  ctaLabel: 'QUERO GARANTIR MEU ACESSO',
} as const

// §3 · 12 — FAQ (roxo-50)
export const SECTION_FAQ = {
  heading: 'Perguntas frequentes',
} as const

// §3 · 13 — CTA final (roxo-800)
export const SECTION_CTA_FINAL = {
  lead: 'Pare de espalhar seus estudos por dezenas de PDFs, prints, pastas e anotações.',
  body: 'Tenha uma biblioteca visual com +300 Cards de Psicologia Infantil pronta para consultar sempre que precisar.',
  stats: ['+300 cards.', '12 grandes temas.'],
  heading: 'Tudo organizado em um único lugar',
  priceLine: 'Acesso hoje por R$ 27,90.',
  ctaLabel: 'SIM, QUERO OS +300 CARDS DE PSICOLOGIA INFANTIL',
  microcopy: 'Pagamento único · Produto digital · 7 dias de garantia',
} as const

// StickyCTA — reaproveita o label mais curto já existente (DeckComplete) em
// vez de criar uma nova frase, por espaço no mobile.
export const STICKY_CTA_LABEL = DECK_COMPLETE_COPY.ctaLabel

// §5.5.4 — exit-intent: título + card real (mesmo FlashCard, estático) + oferta em uma linha + CTA.
export const EXIT_INTENT_POPUP_COPY = {
  titulo: 'Leva um card com você.',
  ofertaSufixo: 'pagamento único · acesso imediato',
  ctaLabel: 'Quero acessar os +300 cards',
  secondaryLabel: 'Continuar lendo a página',
} as const

// §5.5.4 — scroll-nudge: pergunta rápida, duas opções, cada uma leva ao CTA com copy adaptada.
export const SCROLL_NUDGE_POPUP_COPY = {
  titulo: 'Uma pergunta rápida',
  pergunta: 'O que mais te trava hoje: encontrar o conteúdo ou organizar o que já estudou?',
  opcoes: [
    {
      id: 'encontrar',
      label: 'Encontrar o conteúdo certo na hora que eu preciso',
      ctaLabel: 'Quero uma biblioteca fácil de consultar',
    },
    {
      id: 'organizar',
      label: 'Organizar o que eu já estudei',
      ctaLabel: 'Quero organizar meus estudos',
    },
  ],
} as const

// §3 · 14 — Rodapé (roxo-900). CNPJ/razão social não foram fornecidos — TODO
// no componente. Disclaimer reaproveita o texto de SECTION_SOBRE (mesmo
// bloco, "já presente na copy" per §7.6), não duplica conteúdo novo.
export const FOOTER_COPY = {
  tagline: 'Biblioteca visual de Psicologia Infantil para consulta e revisão rápidas.',
  privacyLabel: 'Política de Privacidade',
  termsLabel: 'Termos de Uso',
  contactLabel: 'Fale com a gente',
} as const
