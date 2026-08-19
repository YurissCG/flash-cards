import type { IconName } from '@/lib/icons'

/** Conjunto fechado de cores de acento — usado em cards, categorias e badges. */
export type AccentColor = 'roxo' | 'verde' | 'amarelo' | 'coral'

export interface HeroCard {
  id: string
  categoria: string
  cor: AccentColor
  titulo: string
  texto: string
  /** Nome do ícone (lib/icons.ts) — não a referência do componente, que não
   *  cruza a fronteira Server → Client Component como prop (RSC). */
  icone: IconName
}

export const HERO_CARDS: HeroCard[] = [
  {
    id: 'emocoes',
    categoria: 'Emoções',
    cor: 'roxo',
    titulo: 'Nomear diminui a intensidade',
    texto:
      'Quando a criança encontra a palavra para o que sente, a emoção deixa de ser uma onda difusa e vira algo que ela consegue observar.',
    icone: 'Heart',
  },
  {
    id: 'comportamento',
    categoria: 'Comportamento',
    cor: 'amarelo',
    titulo: 'Birra raramente é manipulação',
    texto:
      'Na maior parte das vezes é um sistema de regulação sobrecarregado. Antes de corrigir, é preciso ajudar o corpo a voltar ao normal.',
    icone: 'Activity',
  },
  {
    id: 'ansiedade',
    categoria: 'Ansiedade',
    cor: 'coral',
    titulo: 'A evitação alivia agora e ensina medo depois',
    texto:
      'Cada fuga confirma para a criança que aquilo era mesmo perigoso. O alívio imediato é o que mantém o ciclo funcionando.',
    icone: 'Waves',
  },
  {
    id: 'tdah',
    categoria: 'TDAH',
    cor: 'verde',
    titulo: 'Não é falta de atenção',
    texto:
      'É dificuldade de decidir para onde a atenção vai e por quanto tempo fica. O hiperfoco é a outra face do mesmo funcionamento.',
    icone: 'Focus',
  },
  {
    id: 'autismo',
    categoria: 'Autismo',
    cor: 'roxo',
    titulo: 'Previsibilidade é acessibilidade',
    texto:
      'Antecipar o que vai acontecer reduz a carga de processamento e libera recursos para o que realmente importa naquele momento.',
    icone: 'Compass',
  },
  {
    id: 'vinculo',
    categoria: 'Vínculo',
    cor: 'amarelo',
    titulo: '"Não sei" costuma ser um pedido de tempo',
    texto:
      'Raramente é recusa. Às vezes a criança precisa de outra pergunta, de um desenho, ou só de mais alguns segundos de silêncio.',
    icone: 'MessageCircle',
  },
  {
    id: 'desenvolvimento',
    categoria: 'Desenvolvimento',
    cor: 'verde',
    titulo: 'Antes dos 6 anos, o corpo fala primeiro',
    texto:
      'Dor de barriga antes da escola, dor de cabeça recorrente e sono agitado podem ser as primeiras palavras de uma ansiedade sem nome.',
    icone: 'HeartPulse',
  },
  {
    id: 'familia',
    categoria: 'Família',
    cor: 'roxo',
    titulo: 'Validar não é concordar',
    texto:
      'Reconhecer o que a criança sentiu não significa aprovar o que ela fez. São dois momentos diferentes da mesma conversa.',
    icone: 'Users',
  },
  {
    id: 'luto',
    categoria: 'Luto',
    cor: 'coral',
    titulo: 'Crianças enlutam em ondas',
    texto:
      'Choram, brincam, perguntam de novo e voltam a brincar. Isso não é indiferença: é a forma infantil de suportar a dose.',
    icone: 'CloudRain',
  },
  {
    id: 'escola',
    categoria: 'Escola',
    cor: 'amarelo',
    titulo: 'Recusa escolar quase nunca é preguiça',
    texto:
      'É uma conta entre o que a criança teme e os recursos que ela sente ter. Mudar o resultado exige mexer nos dois lados.',
    icone: 'School',
  },
]

export const HERO_DECK_DISCLAIMER =
  'Conteúdo educativo. Não substitui formação, supervisão ou avaliação psicológica.'
