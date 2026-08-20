/** Conjunto fechado de cores de acento — usado em cards, categorias e badges. */
export type AccentColor = 'roxo' | 'verde' | 'amarelo' | 'coral'

export interface CardBulletList {
  tipo: 'lista'
  rotulo: string
  itens: readonly string[]
  /** Card "Regulação emocional" usa uma bolinha colorida por item em vez de um marcador uniforme. */
  colorido?: boolean
}

export interface CardQuestion {
  tipo: 'pergunta'
  rotulo: string
  texto: string
}

export interface CardCallout {
  tipo: 'aviso'
  rotulo: string
  texto: string
  /** 'atencao' pinta o box em tom de alerta (Importante/Evite); 'info' em tom neutro (Lembrete/Objetivo). */
  variante: 'info' | 'atencao'
}

export interface CardComparison {
  tipo: 'comparacao'
  evite: string
  experimenteRotulo: string
  experimente: readonly string[]
}

export interface CardDefinitionItem {
  termo: string
  texto: string
}

export interface CardDefinitions {
  tipo: 'definicoes'
  itens: readonly CardDefinitionItem[]
}

export interface CardClosing {
  tipo: 'fechamento'
  linhas: readonly string[]
}

export type CardBlock = CardBulletList | CardQuestion | CardCallout | CardComparison | CardDefinitions | CardClosing

export interface HeroCard {
  id: string
  /** Número de catálogo (produto real tem +300 cards) — só exibição, não é posição no deck. */
  numero: number
  categoria: string
  cor: AccentColor
  titulo: string
  /** Parágrafo(s) de abertura, antes dos blocos. */
  intro: readonly string[]
  foto: string
  /**
   * Altura em px da foto no topo do card, calibrada individualmente. O texto
   * real varia bastante de card pra card (2 blocos curtos a listas de 7
   * itens) — em vez de deixar sobrar espaço vazio nos cards mais enxutos, a
   * foto ocupa mais espaço neles; nos mais densos, ocupa menos. Valores
   * medidos via Playwright contra o conteúdo real de cada card (ver nota em
   * FlashCard.tsx) para convergir todos os 10 cards a uma altura de deck comum.
   */
  fotoAlturaPx: number
  blocos: readonly CardBlock[]
}

export const HERO_CARDS: HeroCard[] = [
  {
    id: 'birras',
    numero: 12,
    categoria: 'Birras',
    cor: 'amarelo',
    titulo: 'O que pode estar por trás de uma birra?',
    foto: '/cards/birras.jpg',
    fotoAlturaPx: 205,
    intro: [
      'A birra pode ser uma forma de comunicação quando a criança ainda não possui recursos suficientes para expressar o que sente ou precisa.',
    ],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Observe:',
        itens: [
          'O que aconteceu antes?',
          'Qual foi o gatilho?',
          'A criança estava cansada, frustrada ou sobrecarregada?',
          'O comportamento costuma aparecer em quais situações?',
        ],
      },
      {
        tipo: 'aviso',
        rotulo: 'Lembrete:',
        variante: 'info',
        texto: 'Nem toda birra significa "desobediência". O contexto é fundamental para compreender o comportamento.',
      },
    ],
  },
  {
    id: 'ansiedade-separacao',
    numero: 58,
    categoria: 'Ansiedade de separação',
    cor: 'coral',
    titulo: 'Quando a criança sofre ao se separar dos pais',
    foto: '/cards/ansiedade-separacao.jpg',
    fotoAlturaPx: 170,
    intro: [
      'Algum desconforto diante da separação pode fazer parte do desenvolvimento. Porém, é importante observar quando o medo ou a preocupação se tornam persistentes e interferem na rotina.',
    ],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Observe:',
        itens: [
          'Choro ou sofrimento intenso nas separações',
          'Preocupação excessiva com os responsáveis',
          'Dificuldade para permanecer na escola',
          'Necessidade constante de confirmação',
        ],
      },
      {
        tipo: 'pergunta',
        rotulo: 'Pergunta para explorar:',
        texto: 'Quando você pensa que seu responsável vai embora, o que passa pela sua cabeça?',
      },
    ],
  },
  {
    id: 'regulacao-emocional',
    numero: 94,
    categoria: 'Regulação emocional',
    cor: 'roxo',
    titulo: 'A criança consegue nomear o que sente?',
    foto: '/cards/regulacao-emocional.jpg',
    fotoAlturaPx: 210,
    intro: ['Antes de ensinar a criança a "controlar" uma emoção, é importante ajudá-la a reconhecê-la.'],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Ensine a diferenciar:',
        colorido: true,
        itens: ['O que aconteceu?', 'O que eu senti?', 'Onde senti no corpo?', 'O que pensei?', 'O que fiz depois?'],
      },
      {
        tipo: 'aviso',
        rotulo: 'Objetivo:',
        variante: 'info',
        texto:
          'Ampliar o vocabulário emocional e ajudar a criança a perceber a relação entre situação, pensamento, emoção e comportamento.',
      },
    ],
  },
  {
    id: 'frustracao',
    numero: 121,
    categoria: 'Frustração',
    cor: 'amarelo',
    titulo: 'O que acontece quando a criança não consegue o que quer?',
    foto: '/cards/frustracao.jpg',
    fotoAlturaPx: 200,
    intro: [
      'A frustração faz parte do desenvolvimento e oferece oportunidades para a criança aprender a lidar com limites, espera e mudanças de planos.',
    ],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Observe como a criança reage quando:',
        itens: ['Perde um jogo', 'Precisa esperar', 'Recebe um "não"', 'Comete um erro', 'Precisa mudar de atividade'],
      },
      {
        tipo: 'pergunta',
        rotulo: 'Pergunta para explorar:',
        texto: 'O que é mais difícil para você quando as coisas não acontecem do jeito que imaginou?',
      },
    ],
  },
  {
    id: 'autoestima',
    numero: 156,
    categoria: 'Autoestima infantil',
    cor: 'roxo',
    titulo: '"Eu não consigo fazer nada!"',
    foto: '/cards/autoestima.jpg',
    fotoAlturaPx: 210,
    intro: [
      'Frases negativas sobre si mesma podem ser importantes para compreender como a criança percebe suas próprias capacidades.',
    ],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Explore:',
        itens: [
          'Como ela reage aos erros?',
          'Busca aprovação constantemente?',
          'Evita atividades por medo de falhar?',
          'Compara-se frequentemente com outras crianças?',
        ],
      },
      {
        tipo: 'comparacao',
        evite: 'Você é muito inteligente!',
        experimenteRotulo: 'Experimente explorar:',
        experimente: ['Você percebeu o que conseguiu fazer depois de tentar novamente?'],
      },
    ],
  },
  {
    id: 'tdah-funcoes-executivas',
    numero: 183,
    categoria: 'TDAH e funções executivas',
    cor: 'verde',
    titulo: 'Não é apenas "falta de atenção"',
    foto: '/cards/tdah-funcoes-executivas.jpg',
    fotoAlturaPx: 145,
    intro: ['As funções executivas envolvem diferentes habilidades, como:'],
    blocos: [
      {
        tipo: 'definicoes',
        itens: [
          { termo: 'Atenção', texto: 'Manter o foco em uma tarefa.' },
          { termo: 'Memória de trabalho', texto: 'Manter informações em mente enquanto realiza uma atividade.' },
          { termo: 'Controle inibitório', texto: 'Pausar antes de agir.' },
          { termo: 'Planejamento', texto: 'Organizar etapas para alcançar um objetivo.' },
          { termo: 'Flexibilidade cognitiva', texto: 'Adaptar-se quando algo muda.' },
        ],
      },
      {
        tipo: 'aviso',
        rotulo: 'Lembrete:',
        variante: 'info',
        texto: 'Dificuldades nessas habilidades precisam ser compreendidas dentro do contexto e da faixa etária da criança.',
      },
    ],
  },
  {
    id: 'sobrecarga-sensorial',
    numero: 207,
    categoria: 'Sobrecarga sensorial',
    cor: 'coral',
    titulo: 'Quando o ambiente fica "demais"',
    foto: '/cards/sobrecarga-sensorial.jpg',
    fotoAlturaPx: 145,
    intro: ['Algumas crianças podem apresentar maior sensibilidade a determinados estímulos.'],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Observe possíveis gatilhos:',
        itens: ['Sons intensos', 'Muitas pessoas', 'Luzes', 'Texturas', 'Cheiros', 'Toques', 'Mudanças inesperadas'],
      },
      {
        tipo: 'pergunta',
        rotulo: 'Pergunta para explorar:',
        texto: 'Tem algum lugar ou situação em que parece que tudo fica muito intenso?',
      },
      {
        tipo: 'aviso',
        rotulo: 'Importante:',
        variante: 'atencao',
        texto: 'Observe os padrões da criança e o contexto em que ocorrem.',
      },
    ],
  },
  {
    id: 'separacao-pais',
    numero: 233,
    categoria: 'Separação dos pais',
    cor: 'roxo',
    titulo: 'Quando a criança fica no meio do conflito',
    foto: '/cards/separacao-pais.jpg',
    fotoAlturaPx: 245,
    intro: ['A separação dos responsáveis pode trazer mudanças importantes para a rotina infantil.'],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'A criança pode precisar de:',
        itens: [
          'Previsibilidade',
          'Espaço para expressar sentimentos',
          'Segurança emocional',
          'Comunicação adequada à sua idade',
          'Liberdade para manter vínculos sem sentir que precisa escolher um lado',
        ],
      },
      {
        tipo: 'aviso',
        rotulo: 'Evite:',
        variante: 'atencao',
        texto: 'Colocar a criança no papel de mensageira entre os adultos.',
      },
    ],
  },
  {
    id: 'primeira-sessao',
    numero: 261,
    categoria: 'Primeira sessão',
    cor: 'verde',
    titulo: '"Eu não quero falar com você."',
    foto: '/cards/primeira-sessao.jpg',
    fotoAlturaPx: 210,
    intro: [
      'Nem toda criança chega ao primeiro atendimento pronta para conversar.',
      'O silêncio, a resistência ou a preferência por brincar podem fazer parte do processo inicial de construção de vínculo.',
    ],
    blocos: [
      {
        tipo: 'lista',
        rotulo: 'Experimente:',
        itens: [
          'Reduzir a pressão por respostas',
          'Utilizar recursos adequados à idade',
          'Observar a brincadeira',
          'Fazer perguntas abertas',
          'Respeitar o ritmo da criança',
        ],
      },
      {
        tipo: 'pergunta',
        rotulo: 'Uma pergunta simples:',
        texto: 'Quer me mostrar alguma coisa que você gosta?',
      },
    ],
  },
  {
    id: 'nao-sei',
    numero: 298,
    categoria: 'Quando a criança diz "não sei"',
    cor: 'amarelo',
    titulo: '"Não sei."',
    foto: '/cards/nao-sei.jpg',
    fotoAlturaPx: 155,
    intro: ['Em vez de repetir a pergunta imediatamente, experimente mudar a forma de investigação.'],
    blocos: [
      {
        tipo: 'comparacao',
        evite: 'Por que você ficou bravo?',
        experimenteRotulo: 'Experimente:',
        experimente: [
          'Se a sua raiva tivesse uma cor, qual seria?',
          'Você lembra o que estava acontecendo antes?',
          'Foi mais parecido com tristeza, medo ou raiva?',
          'Se pudesse mudar uma coisa naquela situação, o que mudaria?',
        ],
      },
      {
        tipo: 'fechamento',
        linhas: [
          'Às vezes, a criança não precisa de uma pergunta mais difícil.',
          'Ela precisa de uma pergunta que consiga responder.',
        ],
      },
    ],
  },
]

export const HERO_DECK_DISCLAIMER =
  'Conteúdo educativo. Não substitui formação, supervisão ou avaliação psicológica.'
