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
    }
  }
})
