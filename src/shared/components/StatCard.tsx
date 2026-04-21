type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
};

function StatCard({
  label,
  value,
  sub,
  valueColor = "text-white",
}: StatCardProps) {
  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <p className="text-[#666] text-xs uppercase tracking-wider mb-4">
        {label}
      </p>
      <p className={`text-3xl font-semibold mb-2 ${valueColor}`}>{value}</p>
      {sub && <p className="text-[#666] text-xs">{sub}</p>}
    </div>
  );
}

export default StatCard;
