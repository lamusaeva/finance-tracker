import { useState } from "react";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import TransactionItem from "../features/transactions/components/TransactionItem";
import { useModal } from "../hooks/useModal";
import type { Transaction } from "../types";
import TransactionDetailModal from "../features/transactions/components/TransactionDetailModal";

function Transactions() {
  const { transactions, deleteTransaction } = useTransactions();
  const { openModal } = useModal();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = transactions
    .filter((tx) => filter === "all" || tx.type === filter)
    .filter((tx) =>
      tx.description.toLowerCase().includes(search.toLowerCase()),
    );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-semibold mb-5">Əməliyyatlar</h1>

      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 border border-[#2a2a2a] rounded-full px-4 py-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            stroke="#666"
            fill="none"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Axtar..."
            className="bg-transparent outline-none text-white text-sm placeholder:text-[#666] w-48"
          />
        </div>

        <div className="flex gap-1 bg-[#1c1c1c] rounded-full p-1 border border-[#2a2a2a]">
          {(["all", "expense", "income"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                filter === f
                  ? "bg-[#242424] text-white font-medium"
                  : "text-[#666] hover:text-white"
              }`}
            >
              {f === "all" ? "Hamısı" : f === "expense" ? "Xərc" : "Gəlir"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_140px] px-5 py-3 border-b border-[#2a2a2a]">
          <span className="text-[#666] text-xs uppercase tracking-wider">
            Əməliyyat
          </span>
          <span className="text-[#666] text-xs uppercase tracking-wider">
            Tarix
          </span>
          <span className="text-[#666] text-xs uppercase tracking-wider">
            Məbləğ
          </span>
          <span></span>
        </div>

        {paginated.length === 0 ? (
          <div className="py-12 text-center text-[#666] text-sm">
            Əməliyyat tapılmadı
          </div>
        ) : (
          paginated.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              onDelete={deleteTransaction}
              onEdit={(tx) => openModal(tx)}
              onView={(tx) => setSelectedTx(tx)}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl text-sm text-[#666] bg-[#1c1c1c] border border-[#2a2a2a] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Əvvəlki
          </button>
          <span className="text-[#666] text-sm">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl text-sm text-[#666] bg-[#1c1c1c] border border-[#2a2a2a] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Növbəti →
          </button>
        </div>
      )}

      {selectedTx && (
        <TransactionDetailModal
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </div>
  );
}

export default Transactions;
