import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import type { ModalOptions } from './types'
import { trapFocus } from './focusTrap'

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.5);
`

const Box = styled.div`
  background: white;

  min-width: 400px;

  padding: 20px;
  border-radius: 12px;
`

interface Props {
  modal: ModalOptions
  index: number
  isTop: boolean
}

export const ModalView = ({
  modal,
  index,
  isTop,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isTop) return
  // После открытия переносим фокус внутрь модалки.
    const firstFocusable =
      ref.current?.querySelector<HTMLElement>(
        'button, input, textarea, select, [href]'
      )

    firstFocusable?.focus()
  }, [isTop])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Только активная модалка реагирует на клавиатуру.
      if (!isTop) return

      if (
        e.key === 'Escape' &&
        modal.closeOnEscape !== false
      ) {
        modal.onClose()
        return
      }
      // Не даем фокусу покинуть пределы модалки.
      if (ref.current) {
        trapFocus(e, ref.current)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener(
        'keydown',
        onKeyDown,
      )
    }
  }, [isTop, modal])

  return (
    <Overlay
      onClick={(e) => {
      // Закрываем только при клике по затемненному фону,
      // а не по содержимому модалки.
        if (e.target === e.currentTarget) {
          modal.onClose()
        }
      }}
      style={{
        zIndex: isTop ? 1000 : 999,
      }}
    >
      <Box
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <header>
          Номер окна: {index}
        </header>

        {modal.content}
      </Box>
    </Overlay>
  )
}