import type { IconName } from '@/lib/icons'
import type { AccentColor } from './hero-cards'

export interface Categoria {
  numero: number
  titulo: string
  /** Tópicos curtos, exibidos como tags — não uma frase corrida. */
  topicos: readonly string[]
  /** Nome do ícone (lib/icons.ts) — ver nota em hero-cards.ts sobre RSC. */
  icone: IconName
  cor: AccentColor
}

export const CATEGORIAS: Categoria[] = [
  {
    numero: 1,
    titulo: 'Desenvolvimento Infantil',
    topicos: ['Marcos do desenvolvimento', 'Linguagem', 'Autonomia', 'Apego', 'Desenvolvimento emocional', 'Desenvolvimento social'],
    icone: 'Sprout',
    cor: 'verde',
  },
  {
    numero: 2,
    titulo: 'Emoções e Regulação Emocional',
    topicos: ['Raiva', 'Medo', 'Tristeza', 'Vergonha', 'Culpa', 'Ciúmes', 'Frustração', 'Identificação emocional', 'Estratégias de regulação'],
    icone: 'Smile',
    cor: 'roxo',
  },
  {
    numero: 3,
    titulo: 'Comportamento e Limites',
    topicos: ['Birras', 'Agressividade', 'Dificuldade com regras', 'Oposição', 'Busca por atenção', 'Reforço', 'Consequências', 'Rotina e limites'],
    icone: 'Scale',
    cor: 'amarelo',
  },
  {
    numero: 4,
    titulo: 'Ansiedade, Medos e Inseguranças',
    topicos: ['Ansiedade escolar', 'Separação', 'Medo do escuro', 'Perfeccionismo', 'Preocupações excessivas', 'Estratégias de enfrentamento'],
    icone: 'Waves',
    cor: 'coral',
  },
  {
    numero: 5,
    titulo: 'TDAH e Funções Executivas',
    topicos: ['Atenção', 'Memória de trabalho', 'Impulsividade', 'Planejamento', 'Organização', 'Percepção do tempo', 'Rotina'],
    icone: 'Focus',
    cor: 'verde',
  },
  {
    numero: 6,
    titulo: 'Autismo e Neurodiversidade',
    topicos: ['Comunicação', 'Previsibilidade', 'Sensibilidades sensoriais', 'Interesses especiais', 'Rotina', 'Autorregulação', 'Inclusão'],
    icone: 'Compass',
    cor: 'roxo',
  },
  {
    numero: 7,
    titulo: 'Habilidades Sociais',
    topicos: ['Amizades', 'Empatia', 'Assertividade', 'Resolução de conflitos', 'Bullying', 'Pedir ajuda', 'Dizer não', 'Frustrações sociais'],
    icone: 'Handshake',
    cor: 'amarelo',
  },
  {
    numero: 8,
    titulo: 'Família e Parentalidade',
    topicos: ['Separação dos pais', 'Conflitos familiares', 'Irmãos', 'Estilos parentais', 'Validação emocional', 'Limites', 'Comunicação'],
    icone: 'Users',
    cor: 'roxo',
  },
  {
    numero: 9,
    titulo: 'Luto e Mudanças',
    topicos: ['Morte de familiares', 'Perda de animais', 'Mudanças de escola', 'Mudanças familiares', 'Saudade', 'Compreensão infantil sobre perdas'],
    icone: 'CloudRain',
    cor: 'coral',
  },
  {
    numero: 10,
    titulo: 'Escola e Aprendizagem',
    topicos: ['Recusa escolar', 'Concentração', 'Organização dos estudos', 'Ansiedade de prova', 'Bullying', 'Dificuldades escolares'],
    icone: 'School',
    cor: 'amarelo',
  },
  {
    numero: 11,
    titulo: 'Primeiras Sessões e Construção de Vínculo',
    topicos: ['Primeiro contato', 'Perguntas para conhecer a criança', 'Silêncio', 'Resistência', 'Vínculo', 'Família', 'Escola', 'Emoções'],
    icone: 'MessageCircle',
    cor: 'amarelo',
  },
  {
    numero: 12,
    titulo: 'Psicoeducação para Pais e Responsáveis',
    topicos: ['Explicações rápidas', 'Conversas com a família', 'Orientação para responsáveis'],
    icone: 'BookOpen',
    cor: 'verde',
  },
]
