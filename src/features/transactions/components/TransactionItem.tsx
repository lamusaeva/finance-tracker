import { useState } from "react";
import type { Transaction } from "../../../types";
import ConfirmModal from "../../../shared/components/ConfirmModal";

type Props = {
  transaction: Transaction;
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
  onView: (transaction: Transaction) => void;
};

function TransactionItem({ transaction, onDelete, onEdit, onView }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div
      onClick={() => onView(transaction)}
      className="grid grid-cols-[2fr_1fr_1fr_140px] items-center px-5 py-3.5 border-b border-[#2a2a2a] last:border-0 hover:bg-[#242424] transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 ${
            transaction.type === "expense"
              ? "bg-[#2a2040] text-purple"
              : "bg-[#2a3318] text-accent"
          }`}
        >
          {transaction.type === "expense" ? "−" : "+"}
        </div>
        <span className="text-white text-sm font-medium">
          {transaction.description}
        </span>
      </div>

      <span className="text-[#666] text-sm">{transaction.date}</span>

      <span
        className={`text-sm font-semibold ${
          transaction.type === "expense" ? "text-purple" : "text-accent"
        }`}
      >
        {transaction.type === "expense" ? "−" : "+"}₼
        {transaction.amount.toFixed(2)}
      </span>

      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(transaction);
          }}
          className="text-[#666] hover:text-accent transition-colors"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setConfirmOpen(true);
          }}
          className="text-[#666] hover:text-[#f87171] transition-colors"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
      {confirmOpen && (
        <ConfirmModal
          message="Bu əməliyyatı silmək istədiyinizə əminsiniz?"
          onConfirm={() => {
            onDelete(transaction.id);
            setConfirmOpen(false);
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}

export default TransactionItem;
