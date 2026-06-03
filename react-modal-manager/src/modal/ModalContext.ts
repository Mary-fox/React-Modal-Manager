import { createContext } from "react"
import  type { ModalOptions, ModalId } from "./types"

export interface ModalContextValue {
  open: (modal: ModalOptions) => void
  close: (id: ModalId) => void
  stack: ModalOptions[]
  sortedStack: ModalOptions[]
  topId: ModalId | null
}

export const ModalContext = createContext<ModalContextValue | null>(null)