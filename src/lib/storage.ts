import { DayRecord, GlobalTask } from "./types";

const TASKS_KEY = "tt_tasks";
const DAY_PREFIX = "tt_day_";

function dayKey(date: string): string {
  return `${DAY_PREFIX}${date}`;
}

// ── Global tasks ──────────────────────────────────────────────────────────────

export function getGlobalTasks(): GlobalTask[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? (JSON.parse(raw) as GlobalTask[]) : [];
  } catch {
    return [];
  }
}

export function saveGlobalTasks(tasks: GlobalTask[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function addGlobalTask(title: string): GlobalTask[] {
  const tasks = getGlobalTasks();
  tasks.push({
    id: crypto.randomUUID(),
    title: title.trim(),
    createdAt: new Date().toISOString(),
  });
  saveGlobalTasks(tasks);
  return tasks;
}

export function deleteGlobalTask(id: string): GlobalTask[] {
  const tasks = getGlobalTasks().filter((t) => t.id !== id);
  saveGlobalTasks(tasks);
  return tasks;
}

// ── Day records ───────────────────────────────────────────────────────────────

export function getDayRecord(date: string): DayRecord {
  if (typeof window === "undefined") return { date, completedTaskIds: [] };
  try {
    const raw = localStorage.getItem(dayKey(date));
    if (!raw) return { date, completedTaskIds: [] };
    const parsed = JSON.parse(raw);
    // Migrate old format that stored { tasks: Task[] } instead of { completedTaskIds: string[] }
    if (!Array.isArray(parsed.completedTaskIds)) {
      return { date, completedTaskIds: [] };
    }
    return parsed as DayRecord;
  } catch {
    return { date, completedTaskIds: [] };
  }
}

export function saveDayRecord(record: DayRecord): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(dayKey(record.date), JSON.stringify(record));
}

export function toggleTaskForDay(date: string, taskId: string): DayRecord {
  const record = getDayRecord(date);
  const idx = record.completedTaskIds.indexOf(taskId);
  if (idx >= 0) {
    record.completedTaskIds.splice(idx, 1);
  } else {
    record.completedTaskIds.push(taskId);
  }
  saveDayRecord(record);
  return record;
}

export function getAllDayRecords(): DayRecord[] {
  if (typeof window === "undefined") return [];
  return Object.keys(localStorage)
    .filter((k) => k.startsWith(DAY_PREFIX))
    .map((k) => {
      try {
        const parsed = JSON.parse(localStorage.getItem(k)!);
        if (!Array.isArray(parsed.completedTaskIds)) return null;
        return parsed as DayRecord;
      } catch {
        return null;
      }
    })
    .filter((r): r is DayRecord => r !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}
