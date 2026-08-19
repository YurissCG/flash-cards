'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, type PanInfo } from 'motion/react'
import { X } from 'lucide-react'
import { SPRING, EASE } from '@/lib/motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DESKTOP_QUERY = '(min-width: 1024px)'
const SHEET_CLOSE_OFFSET = 120
const SHEET_CLOSE_VELOCITY = 600

const panelVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.965 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING.popup, delay: 0.06 } },
  exit: { opacity: 0, y: 14, scale: 0.98, transition: { duration: 0.22, ease: EASE.in } },
}

const sheetVariants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: SPRING.popup },
  exit: { y: '100%', transition: { duration: 0.26, ease: EASE.in } },
}

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export interface PopupShellProps {
  titleId: string
  onDismiss: () => void
  children: ReactNode
}

/** Painel/sheet de um pop-up: focus trap, ESC, inert no <main>, foco inicial no título (§5.5.5). */
export function PopupShell({ titleId, onDismiss, children }: PopupShellProps) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const reducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement

    const main = document.querySelector('main')
    main?.setAttribute('inert', '')

    const titleEl = document.getElementById(titleId)
    titleEl?.setAttribute('tabindex', '-1')
    titleEl?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onDismiss()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      main?.removeAttribute('inert')
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleId])

  function handleSheetDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > SHEET_CLOSE_OFFSET || info.velocity.y > SHEET_CLOSE_VELOCITY) {
      onDismiss()
    }
  }

  const variants = reducedMotion ? reducedVariants : isDesktop ? panelVariants : sheetVariants

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      drag={!reducedMotion && !isDesktop ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.4 }}
      onDragEnd={handleSheetDragEnd}
      className={
        isDesktop
          ? 'fixed inset-x-0 bottom-0 top-0 z-[70] m-auto h-fit w-full max-w-md rounded-xl bg-white p-6 shadow-lg'
          : 'fixed inset-x-0 bottom-0 z-[70] w-full rounded-t-xl bg-white p-6 pb-8 shadow-lg'
      }
    >
      {!isDesktop && (
        <div aria-hidden="true" className="mx-auto mb-4 h-1 w-10 rounded-full bg-roxo-200" />
      )}

      <button
        type="button"
        aria-label="Fechar"
        onClick={onDismiss}
        className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-tinta-400 hover:bg-roxo-50"
      >
        <X aria-hidden="true" strokeWidth={2.25} className="h-5 w-5" />
      </button>

      {children}
    </motion.div>
  )
}
