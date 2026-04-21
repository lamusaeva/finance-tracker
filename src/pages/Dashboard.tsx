import { useAuth } from "../hooks/useAuth";
import StatCard from "../shared/components/StatCard";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { useNavigate } from "react-router-dom";
import TransactionDetailModal from "../features/transactions/components/TransactionDetailModal";
import { useState } from "react";
import type { Transaction } from "../types";
import ChartCard from "../features/analytics/components/ChartCard";

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const { transactions, loading: txLoading } = useTransactions();

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalSaving = totalIncome - totalExpense;
  const recentTransactions = transactions.slice(0, 10);

  if (loading || txLoading) return null;

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-semibold mb-6">
        Salam, <span className="text-accent">{user?.email}</span> 👋
      </h1>

      <div className="grid grid-cols-[1fr_320px] gap-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              label="Bu ay xərclər"
              value={`₼ ${totalExpense.toFixed(2)}`}
              sub="Bu ayın xərcləri"
              valueColor="text-[#6B5ECD]"
            />
            <StatCard
              label="Gəlir"
              value={`₼ ${totalIncome.toFixed(2)}`}
              sub="Bu ayın gəliri"
              valueColor="text-[#C5F135]"
            />
            <StatCard
              label="Qənaət"
              value={`₼ ${totalSaving.toFixed(2)}`}
              sub="Gəlir - Xərc"
              valueColor="text-white"
            />
          </div>

          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 flex-1">
            <ChartCard transactions={transactions} />
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl">
          <div className="flex justify-between items-center p-5 border-b border-[#2a2a2a]">
            <h2 className="text-white font-medium text-sm">Son əməliyyatlar</h2>
            <span
              onClick={() => navigate("/transactions")}
              className="text-white text-xs cursor-pointer hover:opacity-70 transition-opacity"
            >
              Hamısı →
            </span>
          </div>

          <div>
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="flex items-center justify-between py-3.5 px-5 hover:bg-[#242424] transition-colors cursor-pointer border-b border-[#2a2a2a] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold ${
                      tx.type === "expense"
                        ? "bg-[#2a2040] text-purple"
                        : "bg-[#2a3318] text-accent"
                    }`}
                  >
                    {tx.type === "expense" ? "−" : "+"}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {tx.description}
                    </p>
                    <p className="text-[#666] text-xs">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.type === "expense" ? "text-purple" : "text-accent"
                  }`}
                >
                  {tx.type === "expense" ? "−" : "+"}₼{tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTx && (
        <TransactionDetailModal
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
