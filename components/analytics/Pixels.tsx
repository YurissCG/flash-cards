'use client'

import Script from 'next/script'
import { markAnalyticsReady } from '@/lib/analytics'

// TODO: definir NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID no ambiente de
// deploy. Sem eles, nada é carregado (nenhum pixel de terceiro roda em dev
// nem em preview por engano). afterInteractive, nunca beforeInteractive (§8.3).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function Pixels() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive" onReady={markAnalyticsReady}>
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive" onReady={markAnalyticsReady}>
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');`}
        </Script>
      )}

      {/* UTMify — atribuição de campanhas/conversão pareada com o checkout Cakto.
          window.pixelId precisa existir antes do pixel.js carregar (é assim
          que o script deles lê qual conta usar). Decodifiquei o loader
          ofuscado que a Cakto forneceu antes de colocar isso no site: ele
          escaneia os <a>/<button>/<form> da página e anexa um listener de
          click que intercepta o clique (waitBeforeAction) pra garantir que o
          "InitiateCheckout" saia antes de abrir o checkout — mas só funciona
          se o listener já estiver anexado QUANDO o clique acontece. Por isso
          afterInteractive (não lazyOnload: cliques rápidos no CTA ficariam
          sem rastreio nenhum, silenciosamente — e essa é a métrica que traz
          cliente via Meta, não vale a pena arriscar por LCP). O custo de
          performance fica mitigado via preconnect (ver app/layout.tsx) em
          vez de atrasar a execução do script em si. */}
      <Script id="utmify-pixel-globals" strategy="afterInteractive">
        {`window.pixelId = "6a8993cd927959a17ffba08d";`}
      </Script>
      <Script src="https://cdn.utmify.com.br/scripts/pixel/pixel.js" strategy="afterInteractive" async defer />
    </>
  )
}
