export interface Depoimento {
  nome: string
  papel: string
  texto: string
  nota: number
}

// TODO: substituir por depoimentos reais e verificáveis (prints de conversa, avaliações) antes do deploy.
// Nenhum depoimento foi inventado — enquanto este array estiver vazio, a seção renderiza um empty
// state honesto com os eixos de prova sugeridos abaixo (art. 37 do CDC — publicidade enganosa).
export const DEPOIMENTOS: Depoimento[] = []

export const EIXOS_DE_PROVA_SUGERIDOS: string[] = [
  'Facilidade de encontrar os conteúdos.',
  'Qualidade visual dos cards.',
  'Ajuda durante os estudos.',
  'Praticidade para revisar temas.',
  'Quantidade de assuntos disponíveis.',
  'Facilidade de consultar pelo celular.',
]
