import type { RouterConfig } from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

// Як стандартний scrollBehavior Nuxt, з двома змінами. Шторка меню, закриваючись,
// знімає overflow: hidden з body, і браузер обриває скрол, що вже йде, посеред сторінки.
// Тому скролимо лише після того, як блокування знято, а на нову сторінку ще й миттєво,
// без scroll-behavior: smooth з main.css. Плавно лишається якір у межах тієї самої сторінки.

function bodyUnlocked() {
  if (document.body.style.overflow !== 'hidden') return Promise.resolve()
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') return
      observer.disconnect()
      resolve()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
  })
}

// vue-router не враховує scroll-padding-top, тож відступ під шапку додаємо самі
function hashTop(hash: string) {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!el) return 0
  return (Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0)
    + (Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
}

function position(to: RouteLocationNormalized, savedPosition: { left: number, top: number } | null) {
  if (savedPosition) return { ...savedPosition, behavior: 'instant' as const }
  if (to.hash) return { el: to.hash, top: hashTop(to.hash), behavior: 'instant' as const }
  return { left: 0, top: 0, behavior: 'instant' as const }
}

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.path.replace(/\/$/, '') === from.path.replace(/\/$/, '')) {
      if (to.hash) return bodyUnlocked().then(() => ({ el: to.hash, top: hashTop(to.hash), behavior: 'smooth' as const }))
      return from.hash ? (savedPosition ?? { left: 0, top: 0 }) : false
    }

    if (from === START_LOCATION) return position(to, savedPosition)

    // Чекаємо, поки нова сторінка відрендериться, як і стандартний Nuxt
    const nuxtApp = useNuxtApp()
    const router = useRouter()
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:loading:end', () => {
        bodyUnlocked().then(() => requestAnimationFrame(() => {
          resolve(router.currentRoute.value.fullPath === to.fullPath ? position(to, savedPosition) : false)
        }))
      })
    })
  }
}
