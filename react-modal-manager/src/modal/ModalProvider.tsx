import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ModalContext } from './ModalContext'
import { ModalRoot } from './ModalRoot'
import type { ModalId, ModalOptions } from './types'

export const ModalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [stack, setStack] = useState<ModalOptions[]>([])

  // Сохраняем позицию страницы перед открытием первой модалки,
// чтобы вернуться туда же после закрытия последней.
  const scrollY = useRef(0)

  const open = useCallback((modal: ModalOptions) => {
    setStack((prev) => {   
     // При открытии первой модалки блокируем скролл страницы.
      if (prev.length === 0) {
        scrollY.current = window.scrollY

        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY.current}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.width = '100%'
      }

      return [...prev, modal]
    })
  }, [])

  const close = useCallback((id: ModalId) => {
    setStack((prev) => {
      const next = prev.filter((m) => m.id !== id)
  // Если закрыли последнюю модалку —
    // возвращаем странице исходное состояние.
      if (next.length === 0) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''

        window.scrollTo(0, scrollY.current)
      }

      return next
    })
  }, [])

  const sortedStack = useMemo(() => {
  // Important-модалки всегда поверх обычных.
  // При этом внутри группы сохраняется порядок открытия.
    const normal = stack.filter((m) => !m.important)
    const important = stack.filter((m) => m.important)

    return [...normal, ...important]
  }, [stack])

  // Верхняя модалка определяется после применения приоритетов.
  const topId =
    sortedStack.length > 0
      ? sortedStack[sortedStack.length - 1].id
      : null

  const value = useMemo(
    () => ({
      open,
      close,
      stack,
      sortedStack,
      topId,
    }),
    [open, close, stack, sortedStack, topId],
  )

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  )
}