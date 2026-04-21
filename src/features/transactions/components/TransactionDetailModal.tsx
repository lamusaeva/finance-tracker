import type { Transaction } from "../../../types";

type Props = {
  transaction: Transaction;
  onClose: () => void;
};

function TransactionDetailModal({ transaction, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-semibold ${
                transaction.type === "expense"
                  ? "bg-[#2a2040] text-purple"
                  : "bg-[#2a3318] text-accent"
              }`}
            >
              {transaction.type === "expense" ? "−" : "+"}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {transaction.description}
              </p>
              <p className="text-[#666] text-xs">
                {transaction.type === "expense" ? "Xərc" : "Gəlir"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-white transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        <div className="bg-[#242424] rounded-xl p-4 mb-4">
          <p
            className={`text-3xl font-semibold ${
              transaction.type === "expense" ? "text-purple" : "text-accent"
            }`}
            style={{
              textShadow:
                transaction.type === "expense"
                  ? "0 0 20px rgba(107,94,205,0.3)"
                  : "0 0 20px rgba(197,241,53,0.3)",
            }}
          >
            {transaction.type === "expense" ? "−" : "+"}₼
            {transaction.amount.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center py-2.5 border-b border-[#2a2a2a]">
            <span className="text-[#666] text-xs uppercase tracking-wider">
              Tarix
            </span>
            <span className="text-white text-sm">{transaction.date}</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#2a2a2a]">
            <span className="text-[#666] text-xs uppercase tracking-wider">
              Növ
            </span>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                transaction.type === "expense"
                  ? "bg-[#2a2040] text-purple"
                  : "bg-[#2a3318] text-accent"
              }`}
            >
              {transaction.type === "expense" ? "Xərc" : "Gəlir"}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-[#242424] border border-[#2a2a2a] text-[#666] rounded-xl text-sm hover:text-white transition-colors"
        >
          Bağla
        </button>
      </div>
    </div>
  );
}

export default TransactionDetailModal;
