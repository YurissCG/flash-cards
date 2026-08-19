// Canal simples fora do React para "isSuppressed: true durante interação com
// o deck ou com o acordeão" (§5.5.3). CardDeck e AccordionFAQ notificam aqui
// diretamente; PopupProvider assina. Evita expandir o PopupContextValue (que
// o contrato de §4.2 define com só 4 campos) e evita context/prop drilling
// entre árvores que não têm relação de ancestralidade.

type Listener = (suppressed: boolean) => void

const activeSources = new Set<string>()
const listeners = new Set<Listener>()

function notify() {
  const suppressed = activeSources.size > 0
  listeners.forEach((listener) => listener(suppressed))
}

export function setInteractionSuppression(source: string, active: boolean) {
  const changed = active ? !activeSources.has(source) : activeSources.has(source)
  if (active) activeSources.add(source)
  else activeSources.delete(source)
  if (changed) notify()
}

export function subscribeInteractionSuppression(listener: Listener): () => void {
  listeners.add(listener)
  listener(activeSources.size > 0)
  return () => {
    listeners.delete(listener)
  }
}
