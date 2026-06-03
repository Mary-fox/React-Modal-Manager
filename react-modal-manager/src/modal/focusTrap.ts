// Все элементы, способные получать фокус через Tab.
const FOCUSABLE_SELECTORS = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export const getFocusableElements = (container: HTMLElement) => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  ).filter((el) => {
    return !el.hasAttribute('disabled')
  })
}

export const trapFocus = (
  event: KeyboardEvent,
  container: HTMLElement,
) => {
  if (event.key !== 'Tab') {
    return
  }
// Находим интерактивные элементы внутри модалки.
// Зацикливаем фокус внутри модального окна.
// Tab с последнего элемента переводит на первый,
// Shift+Tab с первого переводит на последний.
  const focusable = getFocusableElements(container)

  if (!focusable.length) {
    event.preventDefault()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  const active = document.activeElement

  if (event.shiftKey) {
    if (active === first) {
      event.preventDefault()
      last.focus()
    }
  } else {
    if (active === last) {
      event.preventDefault()
      first.focus()
    }
  }
}