export interface JsonLdProps {
  data: object
}

// dangerouslySetInnerHTML é o único jeito de emitir <script type="application/ld+json">
// em React — seguro aqui porque `data` vem sempre de schemas.ts (código nosso,
// tipado), nunca de entrada do usuário.
export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
