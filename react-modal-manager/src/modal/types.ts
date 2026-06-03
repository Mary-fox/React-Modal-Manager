import React from "react"

export type ModalId = string

export interface ModalOptions {
  id: ModalId
  content: React.ReactNode
  onClose: () => void
  closeOnEscape?: boolean
  important?: boolean
}

