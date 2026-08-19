import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'

// '/obrigado' fica de fora de propósito (noindex, pós-compra) — só estas 3 (§7.7).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/politica-de-privacidade`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/termos-de-uso`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
