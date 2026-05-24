"use client";

import { useEffect, useState } from "react";
import { ChartDay, GlobalTask, StatsSnapshot } from "@/lib/types";
import { getAllDayRecords, getGlobalTasks } from "@/lib/storage";
import { computeStats, computePerTaskStats, getWeeklyChartData, PerTaskStats } from "@/lib/stats";

const emptyPeriod = {
  totalDays: 0,
  totalTasks: 0,
  completedTasks: 0,
  completionRate: 0,
  perfectDays: 0,
};

const defaultStats: StatsSnapshot = {
  weekly: emptyPeriod,
  monthly: emptyPeriod,
  allTime: emptyPeriod,
};

interface UseStatsReturn {
  stats: StatsSnapshot;
  perTaskStats: PerTaskStats;
  globalTasks: GlobalTask[];
  chartData: ChartDay[];
  loading: boolean;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<StatsSnapshot>(defaultStats);
  const [perTaskStats, setPerTaskStats] = useState<PerTaskStats>({
    weekly: [],
    monthly: [],
    allTime: [],
  });
  const [globalTasks, setGlobalTasks] = useState<GlobalTask[]>([]);
  const [chartData, setChartData] = useState<ChartDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tasks = getGlobalTasks();
    const records = getAllDayRecords();
    setGlobalTasks(tasks);
    setStats(computeStats(records, tasks.length));
    setPerTaskStats(computePerTaskStats(records, tasks));
    setChartData(getWeeklyChartData(records, tasks.length));
    setLoading(false);
  }, []);

  return { stats, perTaskStats, globalTasks, chartData, loading };
}
