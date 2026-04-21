import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium border ${
        type === "success"
          ? "bg-[#1c1c1c] border-accent text-accent"
          : "bg-[#1c1c1c] border-[#f87171] text-[#f87171]"
      }`}
      style={{
        boxShadow:
          type === "success"
            ? "0 0 20px rgba(197,241,53,0.15)"
            : "0 0 20px rgba(248,113,113,0.15)",
      }}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          type === "success"
            ? "bg-[#2a3318] text-accent"
            : "bg-[#3d1f1f] text-[#f87171]"
        }`}
      >
        {type === "success" ? "✓" : "✕"}
      </div>
      {message}
    </div>
  );
}

export default Toast;
