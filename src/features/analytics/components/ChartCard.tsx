import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Transaction } from "../../../types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  transactions: Transaction[];
};

function ChartCard({ transactions }: Props) {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return {
      label: date.toLocaleString("en", { month: "short" }),
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });

  const expenses = last6Months.map(({ year, month }) =>
    transactions
      .filter((tx) => {
        const d = new Date(tx.date);
        return tx.type === "expense" && d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((sum, tx) => sum + tx.amount, 0),
  );

  const incomes = last6Months.map(({ year, month }) =>
    transactions
      .filter((tx) => {
        const d = new Date(tx.date);
        return tx.type === "income" && d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((sum, tx) => sum + tx.amount, 0),
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-medium text-sm">Aylıq statistika</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple"></div>
            <span className="text-[#666] text-xs">Xərclər</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className="text-[#666] text-xs">Gəlir</span>
          </div>
        </div>
      </div>
      <Bar
        data={{
          labels: last6Months.map((m) => m.label),
          datasets: [
            {
              label: "Xərclər",
              data: expenses,
              backgroundColor: "#6B5ECD",
              borderRadius: 8,
              borderSkipped: false,
            },
            {
              label: "Gəlir",
              data: incomes,
              backgroundColor: "#C5F135",
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        }}
        options={{
          responsive: true,
          aspectRatio: 3,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1c1c1c",
              borderColor: "#2a2a2a",
              borderWidth: 1,
              titleColor: "#fff",
              bodyColor: "#666",
              padding: 10,
            },
          },
          scales: {
            x: {
              ticks: { color: "#666", font: { size: 11 } },
              grid: { display: false },
              border: { display: false },
            },
            y: {
              ticks: { color: "#666", font: { size: 11 } },
              grid: { color: "rgba(255,255,255,0.04)" },
              border: { display: false },
            },
          },
        }}
      />
    </div>
  );
}

export default ChartCard;