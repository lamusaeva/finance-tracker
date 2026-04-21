import { useModal } from "../../../hooks/useModal";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useTransactions } from "../../../features/transactions/hooks/useTransactions";
import { useState, useEffect } from "react";
import Toast from "../../../shared/components/Toast";

type AddTransactionForm = {
  amount: number;
  type: "income" | "expense";
  description: string;
  date: string;
  category_id: string;
};

function AddTransactionModal() {
  const { isOpen, closeModal, editingTransaction } = useModal();
  const { user } = useAuth();
  const { insertTransaction, updateTransaction } = useTransactions();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddTransactionForm>({
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (editingTransaction) {
      reset({
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        description: editingTransaction.description,
        date: editingTransaction.date,
        category_id: editingTransaction.category_id || "",
      });
    } else {
      reset({
        type: "expense",
        amount: undefined,
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editingTransaction, reset]);

  const onSubmit = async (data: AddTransactionForm) => {
    if (editingTransaction) {
      const { error } = await updateTransaction(editingTransaction.id, {
        amount: data.amount,
        type: data.type,
        description: data.description,
        date: data.date,
        category_id: data.category_id || null,
      });
      if (error) {
        setToast({ message: error.message, type: "error" });
      } else {
        setToast({ message: "Əməliyyat yeniləndi!", type: "success" });
        reset();
        closeModal();
        window.location.reload();
      }
    } else {
      const { error } = await insertTransaction({
        amount: data.amount,
        type: data.type,
        description: data.description,
        date: data.date,
        category_id: data.category_id || null,
        user_id: user!.id,
      });
      if (error) {
        setToast({ message: error.message, type: "error" });
      } else {
        setToast({ message: "Əməliyyat əlavə edildi!", type: "success" });
        reset();
        closeModal();
        window.location.reload();
      }
    }
  };

  if (!isOpen)
    return (
      <>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-semibold text-lg">
            {editingTransaction ? "Əməliyyatı yenilə" : "Əməliyyat əlavə et"}
          </h2>
          <button onClick={closeModal} className="text-[#666] hover:text-white transition-colors text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex gap-2">
            <label className="flex-1">
              <input type="radio" value="expense" {...register("type")} className="hidden peer" />
              <div className="peer-checked:bg-[#2a2040] peer-checked:text-purple peer-checked:border-purple border border-[#2a2a2a] rounded-xl py-2.5 text-center text-sm text-[#666] cursor-pointer transition-all">
                Xərc
              </div>
            </label>
            <label className="flex-1">
              <input type="radio" value="income" {...register("type")} className="hidden peer" />
              <div className="peer-checked:bg-[#2a3318] peer-checked:text-accent peer-checked:border-accent border border-[#2a2a2a] rounded-xl py-2.5 text-center text-sm text-[#666] cursor-pointer transition-all">
                Gəlir
              </div>
            </label>
          </div>

          <div>
            <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Məbləğ</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent transition-colors placeholder:text-[#666]"
              {...register("amount", {
                valueAsNumber: true,
                required: "Məbləğ mütləqdir",
                min: { value: 0.01, message: "0-dan böyük olmalıdır" },
              })}
            />
            {errors.amount && <p className="text-[#f87171] text-xs mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Açıqlama</label>
            <input
              type="text"
              placeholder="Nə üçün?"
              className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent transition-colors placeholder:text-[#666]"
              {...register("description", { required: "Açıqlama mütləqdir" })}
            />
            {errors.description && <p className="text-[#f87171] text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Tarix</label>
            <input
              type="date"
              className="w-full bg-[#242424] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent transition-colors"
              {...register("date", { required: "Tarix mütləqdir" })}
            />
            {errors.date && <p className="text-[#f87171] text-xs mt-1">{errors.date.message}</p>}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 bg-[#242424] border border-[#2a2a2a] text-[#666] rounded-xl text-sm hover:text-white transition-colors"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-accent text-dark-bg font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 0 20px rgba(197,241,53,0.25)" }}
            >
              {editingTransaction ? "Yadda saxla" : "Əlavə et"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;