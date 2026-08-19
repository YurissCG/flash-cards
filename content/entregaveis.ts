import type { IconName } from '@/lib/icons'

export interface Entregavel {
  titulo: string
  descricao: string
  /** Nome do ícone (lib/icons.ts) — ver nota em hero-cards.ts sobre RSC. */
  icone: IconName
}

export const ENTREGAVEIS: Entregavel[] = [
  {
    titulo: '+300 Cards de Psicologia Infantil',
    descricao: 'Uma coleção digital organizada por temas para facilitar seus estudos e consultas.',
    icone: 'Layers',
  },
  {
    titulo: '12 Categorias Organizadas',
    descricao: 'Encontre rapidamente o conteúdo que precisa sem ficar procurando card por card.',
    icone: 'LayoutGrid',
  },
  {
    titulo: 'Conteúdo Visual e Objetivo',
    descricao: 'Informações organizadas de forma simples para facilitar leitura, revisão e consulta.',
    icone: 'Eye',
  },
  {
    titulo: 'Acesso pelo Celular',
    descricao: 'Tenha sua biblioteca disponível para consultar onde estiver.',
    icone: 'Smartphone',
  },
  {
    titulo: 'Material Digital',
    descricao: 'Nada de esperar entrega ou pagar frete. Seu acesso é totalmente online.',
    icone: 'Zap',
  },
  {
    titulo: 'Consulta sempre que precisar',
    descricao:
      'Use durante seus estudos, preparação de conteúdos, revisões, estágios e rotina profissional.',
    icone: 'Clock',
  },
]
