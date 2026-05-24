export interface GlobalTask {
  id: string;
  title: string;
  createdAt: string;
}

export interface DayRecord {
  date: string; // "YYYY-MM-DD"
  completedTaskIds: string[];
}

export interface PeriodStats {
  totalDays: number;
  totalTasks: number;
  completedTasks: number;
  completionRate: number; // 0–100
  perfectDays: number;
}

export interface StatsSnapshot {
  weekly: PeriodStats;
  monthly: PeriodStats;
  allTime: PeriodStats;
}

export interface ChartDay {
  date: string;
  label: string;
  completionRate: number;
  hasData: boolean;
}
