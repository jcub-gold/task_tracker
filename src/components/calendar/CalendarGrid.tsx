import { DayRecord } from "@/lib/types";
import { getDaysInMonth, keyToDate } from "@/lib/dateUtils";
import { DayCell } from "./DayCell";

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
  records: DayRecord[];
  totalTasks: number;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({
  year,
  month,
  records,
  totalTasks,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const recordMap = new Map(records.map((r) => [r.date, r]));
  const days = getDaysInMonth(year, month);
  const firstDow = keyToDate(days[0]).getDay();

  const cells: (string | null)[] = [...Array(firstDow).fill(null), ...days];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium text-zinc-500 py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateKey, i) =>
          dateKey === null ? (
            <div key={`blank-${i}`} />
          ) : (
            <DayCell
              key={dateKey}
              dateKey={dateKey}
              record={recordMap.get(dateKey)}
              totalTasks={totalTasks}
              selected={selectedDate === dateKey}
              onClick={() => onSelectDate(dateKey)}
            />
          )
        )}
      </div>
    </div>
  );
}
