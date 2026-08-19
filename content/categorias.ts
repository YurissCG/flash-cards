import type { IconName } from '@/lib/icons'
import type { AccentColor } from './hero-cards'

export interface Categoria {
  numero: number
  titulo: string
  descricao: string
  /** Nome do ícone (lib/icons.ts) — ver nota em hero-cards.ts sobre RSC. */
  icone: IconName
  cor: AccentColor
}

export const CATEGORIAS: Categoria[] = [
  {
    numero: 1,
    titulo: 'Desenvolvimento Infantil',
    descricao:
      'Marcos do desenvolvimento, linguagem, autonomia, apego, desenvolvimento emocional, desenvolvimento social e muito mais.',
    icone: 'Sprout',
    cor: 'verde',
  },
  {
    numero: 2,
    titulo: 'Emoções e Regulação Emocional',
    descricao:
      'Raiva, medo, tristeza, vergonha, culpa, ciúmes, frustração, identificação emocional e estratégias de regulação.',
    icone: 'Smile',
    cor: 'roxo',
  },
  {
    numero: 3,
    titulo: 'Comportamento e Limites',
    descricao:
      'Birras, agressividade, dificuldade com regras, oposição, busca por atenção, reforço, consequências, rotina e limites.',
    icone: 'Scale',
    cor: 'amarelo',
  },
  {
    numero: 4,
    titulo: 'Ansiedade, Medos e Inseguranças',
    descricao:
      'Ansiedade escolar, separação, medo do escuro, perfeccionismo, preocupações excessivas, evitação e estratégias de enfrentamento.',
    icone: 'Waves',
    cor: 'coral',
  },
  {
    numero: 5,
    titulo: 'TDAH e Funções Executivas',
    descricao:
      'Atenção, memória de trabalho, impulsividade, planejamento, organização, percepção do tempo e rotina.',
    icone: 'Focus',
    cor: 'verde',
  },
  {
    numero: 6,
    titulo: 'Autismo e Neurodiversidade',
    descricao:
      'Comunicação, previsibilidade, sensibilidades sensoriais, interesses especiais, rotina, autorregulação e inclusão.',
    icone: 'Compass',
    cor: 'roxo',
  },
  {
    numero: 7,
    titulo: 'Habilidades Sociais',
    descricao:
      'Amizades, empatia, assertividade, resolução de conflitos, bullying, pedir ajuda, dizer não e lidar com frustrações sociais.',
    icone: 'Handshake',
    cor: 'amarelo',
  },
  {
    numero: 8,
    titulo: 'Família e Parentalidade',
    descricao:
      'Separação dos pais, conflitos familiares, irmãos, estilos parentais, validação emocional, limites e comunicação.',
    icone: 'Users',
    cor: 'roxo',
  },
  {
    numero: 9,
    titulo: 'Luto e Mudanças',
    descricao:
      'Morte de familiares, perda de animais, mudanças de escola, mudanças familiares, saudade e compreensão infantil sobre perdas.',
    icone: 'CloudRain',
    cor: 'coral',
  },
  {
    numero: 10,
    titulo: 'Escola e Aprendizagem',
    descricao:
      'Recusa escolar, concentração, organização dos estudos, ansiedade de prova, bullying e dificuldades escolares.',
    icone: 'School',
    cor: 'amarelo',
  },
  {
    numero: 11,
    titulo: 'Primeiras Sessões e Construção de Vínculo',
    descricao:
      'Primeiro contato, perguntas para conhecer a criança, silêncio, resistência, vínculo, família, escola e emoções.',
    icone: 'MessageCircle',
    cor: 'amarelo',
  },
  {
    numero: 12,
    titulo: 'Psicoeducação para Pais e Responsáveis',
    descricao:
      'Conteúdos rápidos para facilitar explicações e conversas com familiares e responsáveis.',
    icone: 'BookOpen',
    cor: 'verde',
  },
]
