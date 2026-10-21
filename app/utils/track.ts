declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Подія в Google Analytics. Поки gtag.js не завантажився, подія чекає в dataLayer.
 * Без GA (не задано gaId) нічого не робить.
 */
export function track(name: string, params: Record<string, unknown> = {}) {
  if (import.meta.server) return
  window.gtag?.('event', name, params)
}
