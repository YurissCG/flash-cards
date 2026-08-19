export interface Bonus {
  numero: number
  titulo: string
  descricao: string
  temas?: string[]
  valor: number
  valorFormatted: string
}

export const BONUS: Bonus[] = [
  {
    numero: 1,
    titulo: 'Guia de Consulta Rápida',
    descricao: 'Um índice organizado para você localizar rapidamente os cards por assunto.',
    valor: 17.0,
    valorFormatted: 'R$ 17,00',
  },
  {
    numero: 2,
    titulo: '50 Perguntas para Construção de Vínculo com Crianças',
    descricao: 'Perguntas organizadas por temas para facilitar a aproximação e a escuta.',
    temas: ['Família', 'Escola', 'Amizades', 'Emoções', 'Medos', 'Sonhos', 'Rotina', 'Autoestima'],
    valor: 19.9,
    valorFormatted: 'R$ 19,90',
  },
  {
    numero: 3,
    titulo: '30 Cards de Orientação para Pais',
    descricao:
      'Materiais simples e visuais abordando temas como emoções, limites, rotina, comportamento e comunicação.',
    valor: 27.0,
    valorFormatted: 'R$ 27,00',
  },
]

export interface ItemAncoragem {
  nome: string
  valor: number
  valorFormatted: string
}

/** Comparativo "comprando separadamente" exibido na seção de bônus. */
export const TABELA_ANCORAGEM: ItemAncoragem[] = [
  { nome: '+300 Cards de Psicologia Infantil', valor: 47.0, valorFormatted: 'R$ 47,00' },
  { nome: 'Guia de Consulta Rápida', valor: 17.0, valorFormatted: 'R$ 17,00' },
  { nome: '50 Perguntas para Construção de Vínculo', valor: 19.9, valorFormatted: 'R$ 19,90' },
  { nome: '30 Cards para Pais', valor: 27.0, valorFormatted: 'R$ 27,00' },
]

export const VALOR_TOTAL_ANCORAGEM = 110.9
export const VALOR_TOTAL_ANCORAGEM_FORMATTED = 'R$ 110,90'
