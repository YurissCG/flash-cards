// Minuta estrutural para revisão jurídica antes do deploy — não é texto
// jurídico final. Cobre os pontos padrão (LGPD, CDC art. 49, termos de uso de
// produto digital) usando só fatos já estabelecidos no projeto (preço, prazo
// de garantia, e-mail de suporte). CNPJ/razão social ficam como TODO.

export const PRIVACY_POLICY_COPY = {
  heading: 'Política de Privacidade',
  updatedAtLabel: 'Última atualização: 19/08/2026',
  sections: [
    {
      titulo: 'Quem somos',
      // TODO: substituir por razão social, CNPJ e endereço reais.
      paragrafos: [
        '[TODO: razão social] · CNPJ [TODO] é responsável pelo tratamento dos dados pessoais coletados através desta página, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).',
      ],
    },
    {
      titulo: 'Quais dados coletamos',
      paragrafos: [
        'Coletamos dados de navegação (páginas visitadas, tempo de permanência, dispositivo e origem do acesso) através de ferramentas de analytics, e dados de contato e pagamento fornecidos voluntariamente no momento da compra, processados pela plataforma de checkout.',
      ],
    },
    {
      titulo: 'Para que usamos esses dados',
      paragrafos: [
        'Usamos os dados para processar o acesso ao material adquirido, prestar suporte, cumprir obrigações legais e fiscais, e entender como a página é usada para melhorá-la.',
      ],
    },
    {
      titulo: 'Compartilhamento com terceiros',
      paragrafos: [
        'Compartilhamos dados apenas com os prestadores necessários para operar o serviço — processador de pagamento e ferramentas de analytics —, nunca para fins de venda a terceiros.',
      ],
    },
    {
      titulo: 'Seus direitos',
      paragrafos: [
        'Você pode solicitar a qualquer momento a confirmação, o acesso, a correção ou a eliminação dos seus dados pessoais, conforme os artigos 17 a 22 da LGPD, através do e-mail de contato abaixo.',
      ],
    },
  ],
} as const

export const TERMS_OF_USE_COPY = {
  heading: 'Termos de Uso',
  updatedAtLabel: 'Última atualização: 19/08/2026',
  sections: [
    {
      titulo: 'O que você está adquirindo',
      paragrafos: [
        'Os +300 Cards de Psicologia Infantil são um produto digital: uma biblioteca visual de consulta, entregue por acesso online, sem envio de material físico.',
      ],
    },
    {
      titulo: 'Licença de uso',
      paragrafos: [
        'O acesso é pessoal e intransferível. A redistribuição, revenda, cópia ou compartilhamento integral do material com terceiros não é permitida.',
      ],
    },
    {
      titulo: 'Pagamento',
      paragrafos: [
        'O pagamento é único, sem mensalidade, processado por uma plataforma de checkout terceirizada. O acesso é liberado após a confirmação do pagamento.',
      ],
    },
    {
      titulo: 'Direito de arrependimento e garantia',
      paragrafos: [
        'Você tem 7 dias corridos a partir da data da compra para solicitar o cancelamento e reembolso integral, sem necessidade de justificativa, conforme o art. 49 do Código de Defesa do Consumidor.',
      ],
    },
    {
      titulo: 'Natureza do conteúdo',
      paragrafos: [
        'O material é educativo e de apoio. Não substitui formação profissional, supervisão clínica, avaliação psicológica, instrumentos validados ou protocolos clínicos.',
      ],
    },
  ],
} as const

export const OBRIGADO_COPY = {
  titulo: 'Pedido confirmado — obrigado!',
  corpo: 'Você vai receber as instruções de acesso aos +300 Cards de Psicologia Infantil no e-mail usado na compra.',
  // TODO: substituir pela orientação real (prazo, onde checar spam, link de acesso direto se houver).
  aviso: 'Se não encontrar o e-mail em alguns minutos, confira a caixa de spam ou promoções antes de entrar em contato.',
  contatoLabel: 'Precisa de ajuda? Fale com a gente:',
  voltarLabel: 'Voltar para a página inicial',
} as const
