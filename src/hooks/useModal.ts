import { useContext, createContext } from "react";
import type { Transaction } from "../types";

type ModalContextType = {
  isOpen: boolean
  editingTransaction: Transaction | null
  openModal: (transaction?: Transaction) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}