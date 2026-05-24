import { PeriodStats } from "@/lib/types";

interface StatCardProps {
  label: string;
  stats: PeriodStats;
}

export function StatCard({ label, stats }: StatCardProps) {
  const rate = stats.completionRate;
  const color =
    rate >= 80
      ? "text-emerald-400"
      : rate >= 50
      ? "text-amber-400"
      : stats.totalTasks === 0
      ? "text-zinc-500"
      : "text-rose-400";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        {label}
      </p>
      <p className={`text-3xl font-bold tabular-nums ${color}`}>
        {stats.totalTasks === 0 ? "—" : `${rate}%`}
      </p>
      <div className="space-y-1 text-xs text-zinc-500">
        <p>{stats.completedTasks}/{stats.totalTasks} tasks done</p>
        <p>{stats.perfectDays} perfect day{stats.perfectDays !== 1 ? "s" : ""}</p>
        <p>{stats.totalDays} day{stats.totalDays !== 1 ? "s" : ""} tracked</p>
      </div>
    </div>
  );
}
