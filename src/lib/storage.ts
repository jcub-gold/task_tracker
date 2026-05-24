import { DayRecord, GlobalTask } from "./types";

// ── Global tasks ──────────────────────────────────────────────────────────────

export async function getGlobalTasks(): Promise<GlobalTask[]> {
  const res = await fetch("/api/tasks");
  return res.json();
}

async function saveGlobalTasks(tasks: GlobalTask[]): Promise<GlobalTask[]> {
  const res = await fetch("/api/tasks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tasks),
  });
  return res.json();
}

export async function addGlobalTask(title: string): Promise<GlobalTask[]> {
  const tasks = await getGlobalTasks();
  tasks.push({
    id: crypto.randomUUID(),
    title: title.trim(),
    createdAt: new Date().toISOString(),
  });
  return saveGlobalTasks(tasks);
}

export async function deleteGlobalTask(id: string): Promise<GlobalTask[]> {
  const tasks = (await getGlobalTasks()).filter((t) => t.id !== id);
  return saveGlobalTasks(tasks);
}

// ── Day records ───────────────────────────────────────────────────────────────

export async function getDayRecord(date: string): Promise<DayRecord> {
  const res = await fetch(`/api/days/${date}`);
  return res.json();
}

export async function toggleTaskForDay(
  date: string,
  taskId: string
): Promise<DayRecord> {
  const record = await getDayRecord(date);
  const idx = record.completedTaskIds.indexOf(taskId);
  if (idx >= 0) {
    record.completedTaskIds.splice(idx, 1);
  } else {
    record.completedTaskIds.push(taskId);
  }
  const res = await fetch(`/api/days/${date}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  return res.json();
}

export async function getAllDayRecords(): Promise<DayRecord[]> {
  const res = await fetch("/api/days");
  return res.json();
}
