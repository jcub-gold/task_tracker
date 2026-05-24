import fs from "fs";
import path from "path";
import { DayRecord, GlobalTask } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const TASKS_FILE = path.join(DATA_DIR, "tasks.json");
const DAYS_FILE = path.join(DATA_DIR, "days.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ── Tasks ─────────────────────────────────────────────────────────────────────

export function readTasks(): GlobalTask[] {
  ensureDataDir();
  try {
    if (!fs.existsSync(TASKS_FILE)) return [];
    return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8")) as GlobalTask[];
  } catch {
    return [];
  }
}

export function writeTasks(tasks: GlobalTask[]): void {
  ensureDataDir();
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// ── Days ──────────────────────────────────────────────────────────────────────

function readDaysMap(): Record<string, DayRecord> {
  ensureDataDir();
  try {
    if (!fs.existsSync(DAYS_FILE)) return {};
    return JSON.parse(fs.readFileSync(DAYS_FILE, "utf-8")) as Record<
      string,
      DayRecord
    >;
  } catch {
    return {};
  }
}

function writeDaysMap(map: Record<string, DayRecord>): void {
  ensureDataDir();
  fs.writeFileSync(DAYS_FILE, JSON.stringify(map, null, 2));
}

export function readDayRecord(date: string): DayRecord {
  const map = readDaysMap();
  return map[date] ?? { date, completedTaskIds: [] };
}

export function writeDayRecord(record: DayRecord): void {
  const map = readDaysMap();
  map[record.date] = record;
  writeDaysMap(map);
}

export function readAllDayRecords(): DayRecord[] {
  return Object.values(readDaysMap()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}
