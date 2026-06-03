import { useContext } from "react"
import { ModalContext } from "./ModalContext"


export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("опять пу пу")

  return {
    open: ctx.open,
    close: ctx.close
  }
}