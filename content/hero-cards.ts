import type { IconName } from '@/lib/icons'

/** Conjunto fechado de cores de acento — usado em cards, categorias e badges. */
export type AccentColor = 'roxo' | 'verde' | 'amarelo' | 'coral'

export interface HeroCardBlock {
  icone: IconName
  rotulo: string
  texto: string
}

export interface HeroCard {
  id: string
  /** Número de catálogo (produto real tem +300 cards) — só exibição, não é posição no deck. */
  numero: number
  categoria: string
  cor: AccentColor
  titulo: string
  /** Sempre 3 — cada card explica em 3 ângulos curtos em vez de um parágrafo único. */
  blocos: readonly [HeroCardBlock, HeroCardBlock, HeroCardBlock]
}

export const HERO_CARDS: HeroCard[] = [
  {
    id: 'emocoes',
    numero: 46,
    categoria: 'Emoções',
    cor: 'roxo',
    titulo: 'Nomear diminui a intensidade',
    blocos: [
      { icone: 'Waves', rotulo: 'O que acontece:', texto: 'A emoção chega como uma onda difusa, sem contorno.' },
      { icone: 'MessageCircle', rotulo: 'O que ajuda:', texto: 'Encontrar a palavra certa pro que está sentindo.' },
      { icone: 'Eye', rotulo: 'Por quê:', texto: 'Nomear transforma a onda em algo que dá pra observar.' },
    ],
  },
  {
    id: 'comportamento',
    numero: 112,
    categoria: 'Comportamento',
    cor: 'amarelo',
    titulo: 'Birra raramente é manipulação',
    blocos: [
      { icone: 'HelpCircle', rotulo: 'Parece:', texto: 'Uma tentativa de manipular ou testar limites.' },
      { icone: 'Zap', rotulo: 'Geralmente é:', texto: 'Um sistema de regulação sobrecarregado.' },
      { icone: 'RefreshCw', rotulo: 'Antes de corrigir:', texto: 'Ajudar o corpo a voltar ao normal primeiro.' },
    ],
  },
  {
    id: 'ansiedade',
    numero: 178,
    categoria: 'Ansiedade',
    cor: 'coral',
    titulo: 'A evitação alivia agora e ensina medo depois',
    blocos: [
      { icone: 'RefreshCw', rotulo: 'O ciclo:', texto: 'Fugir alivia na hora, então o cérebro repete a fuga.' },
      { icone: 'AlertCircle', rotulo: 'O problema:', texto: 'Cada fuga confirma que aquilo era mesmo perigoso.' },
      { icone: 'Waves', rotulo: 'O resultado:', texto: 'O alívio imediato é o que mantém o ciclo girando.' },
    ],
  },
  {
    id: 'tdah',
    numero: 203,
    categoria: 'TDAH',
    cor: 'verde',
    titulo: 'Não é falta de atenção',
    blocos: [
      { icone: 'HelpCircle', rotulo: 'Não é:', texto: 'Falta de atenção ou preguiça de prestar atenção.' },
      { icone: 'Focus', rotulo: 'É:', texto: 'Dificuldade de decidir para onde a atenção vai.' },
      { icone: 'Sparkles', rotulo: 'Outro lado:', texto: 'O hiperfoco é a mesma dificuldade, só que ao contrário.' },
    ],
  },
  {
    id: 'autismo',
    numero: 67,
    categoria: 'Autismo',
    cor: 'roxo',
    titulo: 'Previsibilidade é acessibilidade',
    blocos: [
      { icone: 'Compass', rotulo: 'O que faz:', texto: 'Antecipar o que vai acontecer reduz a carga de processamento.' },
      { icone: 'Zap', rotulo: 'O efeito:', texto: 'Libera recursos pro que realmente importa no momento.' },
      { icone: 'CheckCircle2', rotulo: 'Por isso:', texto: 'Previsibilidade não é rigidez, é acessibilidade.' },
    ],
  },
  {
    id: 'vinculo',
    numero: 251,
    categoria: 'Vínculo',
    cor: 'amarelo',
    titulo: '"Não sei" costuma ser um pedido de tempo',
    blocos: [
      { icone: 'HelpCircle', rotulo: 'Não é:', texto: 'Recusa em responder ou falta de vontade.' },
      { icone: 'Clock', rotulo: 'Costuma ser:', texto: 'Um pedido de tempo, de outra pergunta ou de silêncio.' },
      { icone: 'MessageCircle', rotulo: 'Na prática:', texto: 'Tente um desenho, outra pergunta, ou espere mais um pouco.' },
    ],
  },
  {
    id: 'desenvolvimento',
    numero: 15,
    categoria: 'Desenvolvimento',
    cor: 'verde',
    titulo: 'Antes dos 6 anos, o corpo fala primeiro',
    blocos: [
      { icone: 'HeartPulse', rotulo: 'Sinais comuns:', texto: 'Dor de barriga antes da escola, dor de cabeça, sono agitado.' },
      { icone: 'AlertCircle', rotulo: 'O que pode ser:', texto: 'As primeiras palavras de uma ansiedade sem nome ainda.' },
      { icone: 'Sprout', rotulo: 'Por que importa:', texto: 'Antes dos 6 anos, o corpo fala primeiro que a boca.' },
    ],
  },
  {
    id: 'familia',
    numero: 289,
    categoria: 'Família',
    cor: 'roxo',
    titulo: 'Validar não é concordar',
    blocos: [
      { icone: 'Heart', rotulo: 'Validar:', texto: 'Reconhecer o que a criança sentiu naquele momento.' },
      { icone: 'HelpCircle', rotulo: 'Não é:', texto: 'Aprovar ou concordar com o que ela fez.' },
      { icone: 'MessageCircle', rotulo: 'Na prática:', texto: 'São dois momentos diferentes da mesma conversa.' },
    ],
  },
  {
    id: 'luto',
    numero: 134,
    categoria: 'Luto',
    cor: 'coral',
    titulo: 'Crianças enlutam em ondas',
    blocos: [
      { icone: 'CloudRain', rotulo: 'Como aparece:', texto: 'Choram, voltam a brincar, perguntam de novo, brincam de novo.' },
      { icone: 'HelpCircle', rotulo: 'Não é:', texto: 'Indiferença ou que a criança não entendeu a perda.' },
      { icone: 'Waves', rotulo: 'É:', texto: 'A forma infantil de suportar a dose, em ondas.' },
    ],
  },
  {
    id: 'escola',
    numero: 96,
    categoria: 'Escola',
    cor: 'amarelo',
    titulo: 'Recusa escolar quase nunca é preguiça',
    blocos: [
      { icone: 'HelpCircle', rotulo: 'Não é:', texto: 'Preguiça ou falta de vontade de ir à escola.' },
      { icone: 'Scale', rotulo: 'É:', texto: 'Uma conta entre o que ela teme e os recursos que sente ter.' },
      { icone: 'RefreshCw', rotulo: 'Pra mudar:', texto: 'Precisa mexer nos dois lados da conta, não só um.' },
    ],
  },
]

export const HERO_DECK_DISCLAIMER =
  'Conteúdo educativo. Não substitui formação, supervisão ou avaliação psicológica.'
