"use client";

import { useState } from "react";
import { useStats } from "@/hooks/useStats";
import { WeeklyChart } from "@/components/stats/WeeklyChart";
import { TaskStatRow } from "@/components/stats/TaskStatRow";

type Period = "weekly" | "monthly" | "allTime";

const PERIOD_LABELS: Record<Period, string> = {
  weekly: "This Week",
  monthly: "This Month",
  allTime: "All Time",
};

export default function StatsPage() {
  const { perTaskStats, chartData, loading } = useStats();
  const [activePeriod, setActivePeriod] = useState<Period>("weekly");

  if (loading) {
    return (
      <div className="py-20 text-center text-zinc-500 text-sm">Loading...</div>
    );
  }

  const taskStats = perTaskStats[activePeriod];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-100">Stats</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-sm font-medium text-zinc-400 mb-4">Last 7 Days</h2>
        {chartData.some((d) => d.hasData) ? (
          <WeeklyChart data={chartData} />
        ) : (
          <p className="text-sm text-zinc-500 text-center py-8">
            No data yet — check off tasks to see your chart.
          </p>
        )}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-zinc-400">Per Task</h2>
          <div className="flex gap-1">
            {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  activePeriod === p
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {taskStats.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-6">
            No tasks yet — add tasks on the Today page.
          </p>
        ) : (
          <div>
            {taskStats.map((stat) => (
              <TaskStatRow key={stat.task.id} stat={stat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
