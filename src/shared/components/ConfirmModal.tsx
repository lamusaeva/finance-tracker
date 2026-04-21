type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-60"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-xs">
        <p className="text-white text-sm text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-[#242424] border border-[#2a2a2a] text-[#666] rounded-xl text-sm hover:text-white transition-colors"
          >
            Xeyr
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-[#3d1f1f] text-[#f87171] border border-[#f87171] rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
