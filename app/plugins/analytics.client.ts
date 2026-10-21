// Google Analytics 4: головна метрика — натискання на телефон і месенджери, плюс заявки.
// gtag.js (~60 КБ) вантажиться після load у вільний час або на першу дію людини,
// щоб не ділив канал із фото hero. Події до того чекають у dataLayer.
export default defineNuxtPlugin(() => {
  const gaId = useRuntimeConfig().public.gaId
  if (!gaId) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    // gtag.js розбирає саме об'єкт arguments, масив не підходить
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', gaId)

  let loaded = false
  function load() {
    if (loaded) return
    loaded = true
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.async = true
    document.head.appendChild(script)
  }
  for (const type of ['pointerdown', 'scroll', 'keydown']) {
    window.addEventListener(type, load, { once: true, passive: true })
  }
  const onLoad = () => ('requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 4000 }) : setTimeout(load, 2000))
  if (document.readyState === 'complete') onLoad()
  else window.addEventListener('load', onLoad, { once: true })

  // Один слухач на весь документ: посилань на телефон і месенджери десятки по всіх сторінках
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]')
    if (!link) return
    const href = link.getAttribute('href') || ''
    const placement = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('[data-track-place]')?.getAttribute('data-track-place') || 'content'

    if (href.startsWith('tel:')) track('phone_click', { placement })
    else if (href.startsWith('viber:')) track('messenger_click', { messenger: 'viber', placement })
    else if (href.includes('t.me/')) track('messenger_click', { messenger: 'telegram', placement })
    else if (href.includes('wa.me/')) track('messenger_click', { messenger: 'whatsapp', placement })
  }, { capture: true })

  const { open } = useCalculator()
  watch(open, (value) => {
    if (value) track('calculator_open')
  })
})
