export function todayKey(): string {
  return dateToKey(new Date());
}

export function dateToKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function keyToDate(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDisplayDate(key: string): string {
  return keyToDate(key).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(key: string): string {
  return keyToDate(key).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

// month is 0-indexed (matching JS Date)
export function isSameMonth(key: string, year: number, month: number): boolean {
  const [y, m] = key.split("-").map(Number);
  return y === year && m - 1 === month;
}

export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(dateToKey(d));
  }
  return days;
}

// month is 0-indexed
export function getDaysInMonth(year: number, month: number): string[] {
  const days: string[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    days.push(dateToKey(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export function isToday(key: string): boolean {
  return key === todayKey();
}

export function isFuture(key: string): boolean {
  return key > todayKey();
}
