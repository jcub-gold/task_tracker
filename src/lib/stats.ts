import { ChartDay, DayRecord, GlobalTask, PeriodStats, StatsSnapshot } from "./types";
import { getLastNDays, isSameMonth, keyToDate } from "./dateUtils";

export interface TaskStat {
  task: GlobalTask;
  completedDays: number;
  totalDays: number;
  completionRate: number;
}

export interface PerTaskStats {
  weekly: TaskStat[];
  monthly: TaskStat[];
  allTime: TaskStat[];
}

export function computePeriodStats(
  records: DayRecord[],
  totalGlobalTasks: number
): PeriodStats {
  const active = records.filter((r) => r.completedTaskIds.length > 0);
  let completedTasks = 0;
  let perfectDays = 0;

  for (const r of active) {
    completedTasks += r.completedTaskIds.length;
    if (r.completedTaskIds.length >= totalGlobalTasks) perfectDays++;
  }

  const totalTasks = active.length * totalGlobalTasks;

  return {
    totalDays: active.length,
    totalTasks,
    completedTasks,
    completionRate:
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 1000) / 10 : 0,
    perfectDays,
  };
}

export function computeStats(
  allRecords: DayRecord[],
  totalGlobalTasks: number
): StatsSnapshot {
  const today = new Date();
  const last7 = new Set(getLastNDays(7));
  const year = today.getFullYear();
  const month = today.getMonth();

  return {
    weekly: computePeriodStats(
      allRecords.filter((r) => last7.has(r.date)),
      totalGlobalTasks
    ),
    monthly: computePeriodStats(
      allRecords.filter((r) => isSameMonth(r.date, year, month)),
      totalGlobalTasks
    ),
    allTime: computePeriodStats(allRecords, totalGlobalTasks),
  };
}

export function computePerTaskStats(
  allRecords: DayRecord[],
  globalTasks: GlobalTask[]
): PerTaskStats {
  const today = new Date();
  const last7 = new Set(getLastNDays(7));
  const year = today.getFullYear();
  const month = today.getMonth();

  function taskStatsForPeriod(records: DayRecord[]): TaskStat[] {
    const totalDays = records.length;
    return globalTasks.map((task) => {
      const completedDays = records.filter((r) =>
        r.completedTaskIds.includes(task.id)
      ).length;
      return {
        task,
        completedDays,
        totalDays,
        completionRate:
          totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
      };
    });
  }

  // For per-task stats, totalDays = all days in the period (not just active days)
  // so we need the set of all days in each period
  const weeklyRecords = getLastNDays(7).map((d) => {
    const found = allRecords.find((r) => r.date === d);
    return found ?? { date: d, completedTaskIds: [] };
  });
  const monthlyRecords = allRecords.filter((r) =>
    isSameMonth(r.date, year, month)
  );
  // Fill monthly with all days of current month up to today
  const todayKey = getLastNDays(1)[0];
  const allMonthDays = getLastNDays(
    new Date(year, month + 1, 0).getDate()
  ).filter((d) => d <= todayKey && isSameMonth(d, year, month));
  const monthlyFull = allMonthDays.map((d) => {
    return allRecords.find((r) => r.date === d) ?? { date: d, completedTaskIds: [] };
  });

  return {
    weekly: taskStatsForPeriod(weeklyRecords),
    monthly: taskStatsForPeriod(monthlyFull),
    allTime: taskStatsForPeriod(allRecords),
  };
}

export function getWeeklyChartData(
  allRecords: DayRecord[],
  totalGlobalTasks: number
): ChartDay[] {
  const last7 = getLastNDays(7);
  const recordMap = new Map(allRecords.map((r) => [r.date, r]));

  return last7.map((date) => {
    const record = recordMap.get(date);
    const completedCount = record?.completedTaskIds.length ?? 0;
    const hasData = completedCount > 0;
    const completionRate =
      totalGlobalTasks > 0
        ? Math.round((completedCount / totalGlobalTasks) * 100)
        : 0;

    return {
      date,
      label: keyToDate(date)
        .toLocaleDateString("en-US", { weekday: "short" })
        .slice(0, 3),
      completionRate,
      hasData,
    };
  });
}
