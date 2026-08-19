'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { CtaButton } from './CtaButton'
import { DURATION, EASE } from '@/lib/motion'
import { STICKY_CTA_LABEL } from '@/content/copy'
import { SITE } from '@/content/site'

// Aparece só depois que a section #hero sai da viewport (§3) — observada via
// IntersectionObserver, sem bloquear o scroll da página (§5.2.10).
export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => entry && setVisible(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: DURATION.base, ease: EASE.out }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-roxo-100 bg-white p-3 shadow-lg lg:hidden"
        >
          <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-1">
            <p className="text-sm font-semibold text-tinta-900">{SITE.priceFormatted}</p>
            <CtaButton label={STICKY_CTA_LABEL} origem="sticky" size="md" />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
