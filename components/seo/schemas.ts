import { SITE } from '@/content/site'

// @graph completo de §7.3 — Organization, WebSite e Product/Offer, todos
// ligados por @id. Preço aqui e o preço visível na página (SITE.priceFormatted)
// têm a mesma fonte (SITE.price) — nunca podem divergir (§7.3, "content-schema
// mismatch"). Sem aggregateRating/review: não há avaliações reais ainda.
export function buildJsonLdGraph() {
  const baseUrl = SITE.url.replace(/\/$/, '')
  const orgId = `${baseUrl}/#organization`
  const websiteId = `${baseUrl}/#website`
  const productId = `${baseUrl}/#product`
  const offerId = `${baseUrl}/#offer`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        // TODO: usar a razão social real quando definida (pode diferir do nome do produto).
        name: SITE.name,
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}/#logo`,
          url: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
          caption: SITE.name,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: SITE.supportEmail,
          contactType: 'customer support',
          availableLanguage: ['Portuguese'],
        },
        // TODO: adicionar sameAs (Instagram real etc.) quando os perfis existirem.
        knowsAbout: [
          'Psicologia Infantil',
          'Desenvolvimento Infantil',
          'Regulação Emocional',
          'TDAH',
          'Transtorno do Espectro Autista',
          'Parentalidade',
          'Luto Infantil',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: baseUrl,
        name: SITE.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'Product',
        '@id': productId,
        name: SITE.name,
        description:
          'Biblioteca digital com mais de 300 cards visuais de Psicologia Infantil, organizados em 12 categorias — desenvolvimento infantil, emoções e regulação emocional, comportamento e limites, ansiedade, TDAH e funções executivas, autismo e neurodiversidade, habilidades sociais, família e parentalidade, luto e mudanças, escola e aprendizagem, primeiras sessões e vínculo, e psicoeducação para pais. Material educativo de consulta rápida para estudantes e profissionais de Psicologia.',
        image: [`${baseUrl}/og.jpg`],
        brand: { '@id': orgId },
        category: 'Material educacional digital',
        audience: {
          '@type': 'Audience',
          audienceType: 'Estudantes de Psicologia e psicólogos clínicos infantis',
        },
        isFamilyFriendly: true,
        inLanguage: 'pt-BR',
        offers: {
          '@type': 'Offer',
          '@id': offerId,
          url: `${baseUrl}/`,
          price: SITE.price.toFixed(2),
          priceCurrency: SITE.currency,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          seller: { '@id': orgId },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'BR',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: SITE.guaranteeDays,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
      },
    ],
  } as const
}
