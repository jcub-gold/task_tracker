import { TaskStat } from "@/lib/stats";

interface TaskStatRowProps {
  stat: TaskStat;
}

export function TaskStatRow({ stat }: TaskStatRowProps) {
  const { task, completedDays, totalDays, completionRate } = stat;

  const barColor =
    completionRate >= 80
      ? "bg-emerald-500"
      : completionRate >= 50
      ? "bg-amber-500"
      : completionRate > 0
      ? "bg-rose-500"
      : "bg-zinc-700";

  const rateColor =
    completionRate >= 80
      ? "text-emerald-400"
      : completionRate >= 50
      ? "text-amber-400"
      : completionRate > 0
      ? "text-rose-400"
      : "text-zinc-600";

  return (
    <div className="py-3 border-b border-zinc-800 last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-zinc-200 truncate flex-1 mr-3">
          {task.title}
        </span>
        <span className={`text-sm font-semibold tabular-nums ${rateColor}`}>
          {totalDays > 0 ? `${completionRate}%` : "—"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: totalDays > 0 ? `${completionRate}%` : "0%" }}
          />
        </div>
        <span className="text-[11px] text-zinc-500 tabular-nums whitespace-nowrap">
          {completedDays}/{totalDays}d
        </span>
      </div>
    </div>
  );
}
