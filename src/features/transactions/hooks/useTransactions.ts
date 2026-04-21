import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../hooks/useAuth";
import type { Transaction } from "../../../types";

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) setTransactions(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, [fetchTransactions]);

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (!error) fetchTransactions();
  };

  const insertTransaction = async (
    data: Omit<Transaction, "id" | "created_at">,
  ) => {
    const { error } = await supabase.from("transactions").insert(data);
    if (!error) fetchTransactions();
    return { error };
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    const { error } = await supabase
      .from("transactions")
      .update(data)
      .eq("id", id);
    if (!error) fetchTransactions();
    return { error };
  };

  return {
    transactions,
    loading,
    refetch: fetchTransactions,
    deleteTransaction,
    insertTransaction,
    updateTransaction,
  };
}
