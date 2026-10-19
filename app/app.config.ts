const fieldSoft = 'text-highlighted bg-granite-100 hover:bg-granite-200/70 focus:bg-white focus-visible:bg-white focus:ring-2 focus:ring-inset focus:ring-signal-500 data-[state=open]:bg-white data-[state=open]:ring-2 data-[state=open]:ring-inset data-[state=open]:ring-signal-500 disabled:bg-granite-100 aria-invalid:ring-2 aria-invalid:ring-inset aria-invalid:ring-error'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'signal',
      neutral: 'granite'
    },
    button: {
      slots: {
        base: 'font-semibold'
      },
      compoundVariants: [
        // Жовта кнопка — з темним текстом, інакше погано читається
        { color: 'primary', variant: 'solid', class: 'text-granite-950 hover:bg-signal-400 active:bg-signal-400' }
      ]
    },
    // Поля форм — сіра заливка без обводки на білій панелі, у фокусі біле з жовтою рамкою
    input: {
      slots: { base: 'rounded-lg' },
      variants: { variant: { soft: fieldSoft } },
      defaultVariants: { variant: 'soft' }
    },
    select: {
      slots: { base: 'rounded-lg' },
      variants: { variant: { soft: fieldSoft } },
      defaultVariants: { variant: 'soft' }
    },
    textarea: {
      slots: { base: 'rounded-lg' },
      variants: { variant: { soft: fieldSoft } },
      defaultVariants: { variant: 'soft' }
    }
  }
})
