import { useState } from "react";
import { ModalContext } from "../hooks/useModal";
import type { Transaction } from "../types";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        editingTransaction,
        openModal: (transaction?: Transaction) => {
          setEditingTransaction(transaction || null)
          setIsOpen(true)
        },
        closeModal: () => {
          setEditingTransaction(null)
          setIsOpen(false)
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}