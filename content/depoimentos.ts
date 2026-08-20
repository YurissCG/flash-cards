export interface Depoimento {
  nome: string
  papel: string
  titulo: string
  texto: string
  /** Nota de 1 a 5 — só exibida quando o depoimento veio com uma nota explícita. */
  nota?: number
}

// Depoimentos reais de quem testou o MVP (não inventados — art. 37 do CDC,
// publicidade enganosa). Nenhuma nota em estrelas foi atribuída por quem
// respondeu, então `nota` fica de fora em vez de inventar um número.
export const DEPOIMENTOS: Depoimento[] = [
  {
    nome: 'Mariana Oliveira',
    papel: 'Estudante de Psicologia',
    titulo: 'Finalmente consegui organizar tudo em um só lugar',
    texto:
      'Eu tinha vários PDFs, prints e anotações salvos no celular e, quando precisava revisar algum assunto, perdia muito tempo procurando. A ideia dos cards é muito mais prática para mim.',
  },
  {
    nome: 'Beatriz Almeida',
    papel: 'Estudante de Psicologia',
    titulo: 'Muito mais fácil para revisar',
    texto:
      'O que mais gostei foi poder revisar um tema rapidamente sem precisar voltar em uma aula inteira ou procurar em um PDF enorme. A organização por categorias facilita bastante.',
  },
  {
    nome: 'Ana Carolina Souza',
    papel: 'Estudante de Psicologia',
    titulo: 'Facilitou minha rotina de estudos',
    texto:
      'Tenho pouco tempo para revisar durante a semana e os cards ajudam justamente nisso. Consigo escolher um tema e revisar os principais pontos de maneira rápida.',
  },
  {
    nome: 'Gabriela Martins',
    papel: 'Psicóloga',
    titulo: 'A organização fez toda diferença',
    texto:
      'Eu já tinha bastante conteúdo sobre Psicologia Infantil, mas tudo estava espalhado. Ter desenvolvimento, emoções, comportamento, ansiedade e outros temas organizados facilita muito a consulta.',
  },
  {
    nome: 'Camila Rodrigues',
    papel: 'Estudante de Psicologia',
    titulo: 'É o tipo de material que eu gostaria de ter conhecido antes',
    texto:
      'Durante a faculdade a gente acumula muito material e acaba se perdendo. Um conteúdo visual e separado por temas torna a revisão muito mais simples.',
  },
  {
    nome: 'Juliana Ferreira',
    papel: 'Psicóloga',
    titulo: 'Prático para consultar pelo celular',
    texto:
      'Gostei principalmente da praticidade. Quando quero relembrar determinado assunto, consigo consultar pelo celular sem precisar ficar procurando em várias pastas.',
  },
]

export const EIXOS_DE_PROVA_SUGERIDOS: string[] = [
  'Facilidade de encontrar os conteúdos.',
  'Qualidade visual dos cards.',
  'Ajuda durante os estudos.',
  'Praticidade para revisar temas.',
  'Quantidade de assuntos disponíveis.',
  'Facilidade de consultar pelo celular.',
]
