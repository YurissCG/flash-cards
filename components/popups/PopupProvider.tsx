'use client'

import dynamic from 'next/dynamic'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '@/lib/motion'
import { hasCheckoutStarted } from '@/lib/analytics'
import { subscribeInteractionSuppression } from '@/lib/popup-suppression'
import { usePopupTriggers } from './usePopupTriggers'

export type PopupId = 'exit-intent' | 'scroll-nudge'

export interface PopupContextValue {
  enqueue: (id: PopupId, priority?: number) => void
  dismiss: () => void
  current: PopupId | null
  isSuppressed: boolean
}

const PopupContext = createContext<PopupContextValue | null>(null)

export function usePopup(): PopupContextValue {
  const ctx = useContext(PopupContext)
  if (!ctx) throw new Error('usePopup precisa ser usado dentro de <PopupProvider>.')
  return ctx
}

// Carregados só quando o primeiro pop-up realmente precisa aparecer — não
// entram no bundle inicial (§8.3).
const PopupShell = dynamic(() => import('./PopupShell').then((m) => m.PopupShell), { ssr: false })
const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup').then((m) => m.ExitIntentPopup), { ssr: false })
const ScrollNudgePopup = dynamic(() => import('./ScrollNudgePopup').then((m) => m.ScrollNudgePopup), { ssr: false })

const SESSION_KEY = 'lp_popup_seen'
const GAP_MS = 420 // respiro após o EXIT (220ms, já embutido na própria transição de saída do painel)

interface QueueState {
  current: PopupId | null
  queue: PopupId[]
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE.in } },
}

export function PopupProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QueueState>({ current: null, queue: [] })
  const [isSuppressed, setIsSuppressed] = useState(false)
  const shownRef = useRef<Set<PopupId>>(new Set())

  useEffect(() => subscribeInteractionSuppression(setIsSuppressed), [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (raw) {
        const seen = JSON.parse(raw) as PopupId[]
        seen.forEach((id) => shownRef.current.add(id))
      }
    } catch {
      // sessionStorage indisponível (modo privado etc.) — degrada para "nunca visto".
    }
  }, [])

  function persistShown() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(Array.from(shownRef.current)))
    } catch {
      // idem — falha silenciosa, não é crítico.
    }
  }

  const enqueue = useCallback((id: PopupId) => {
    if (shownRef.current.has(id)) return
    if (hasCheckoutStarted()) return
    setState((prev) => {
      if (prev.current === id || prev.queue.includes(id)) return prev
      if (prev.current === null) {
        shownRef.current.add(id)
        persistShown()
        return { current: id, queue: prev.queue }
      }
      return { current: prev.current, queue: [...prev.queue, id] }
    })
  }, [])

  const dismiss = useCallback(() => {
    setState((prev) => ({ current: null, queue: prev.queue }))
  }, [])

  // Chamado pelo onExitComplete do painel — já é o pós-EXIT; só falta o GAP.
  const promoteNext = useCallback(() => {
    setTimeout(() => {
      setState((prev) => {
        if (prev.current !== null || prev.queue.length === 0) return prev
        const [next, ...rest] = prev.queue
        if (!next) return prev
        shownRef.current.add(next)
        persistShown()
        return { current: next, queue: rest }
      })
    }, GAP_MS)
  }, [])

  usePopupTriggers(enqueue, isSuppressed)

  const contextValue: PopupContextValue = {
    enqueue,
    dismiss,
    current: state.current,
    isSuppressed,
  }

  // O backdrop fica de fora do AnimatePresence do painel, com sua própria
  // condição de visibilidade (current OU algo na fila) — assim ele não some
  // durante o GAP entre dois pop-ups consecutivos (§5.5.1 ponto 3), só o
  // painel troca por baixo dele.
  const backdropVisible = state.current !== null || state.queue.length > 0
  const titleId = state.current ? `${state.current}-title` : undefined

  return (
    <PopupContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {backdropVisible && (
          <motion.div
            key="popup-backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={dismiss}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-tinta-900/55 backdrop-blur-[3px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" onExitComplete={promoteNext}>
        {state.current && titleId && (
          <PopupShell key={state.current} titleId={titleId} onDismiss={dismiss}>
            {state.current === 'exit-intent' ? (
              <ExitIntentPopup onDismiss={dismiss} />
            ) : (
              <ScrollNudgePopup />
            )}
          </PopupShell>
        )}
      </AnimatePresence>
    </PopupContext.Provider>
  )
}
