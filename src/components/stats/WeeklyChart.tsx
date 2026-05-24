import { ChartDay } from "@/lib/types";

interface WeeklyChartProps {
  data: ChartDay[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((day) => {
        const barColor = !day.hasData
          ? "bg-zinc-800"
          : day.completionRate >= 80
          ? "bg-emerald-500"
          : day.completionRate >= 50
          ? "bg-amber-500"
          : "bg-rose-500";

        const heightPct = day.hasData ? Math.max(day.completionRate, 4) : 4;

        return (
          <div
            key={day.date}
            className="flex-1 flex flex-col items-center gap-1.5"
            title={day.hasData ? `${day.completionRate}%` : "No data"}
          >
            {day.hasData && (
              <span className="text-[10px] text-zinc-500 tabular-nums">
                {day.completionRate}%
              </span>
            )}
            <div className="w-full flex items-end" style={{ height: "80px" }}>
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${barColor}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-500">{day.label}</span>
          </div>
        );
      })}
    </div>
  );
}
