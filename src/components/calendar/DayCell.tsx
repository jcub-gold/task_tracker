import { DayRecord } from "@/lib/types";
import { isToday, isFuture, keyToDate } from "@/lib/dateUtils";

interface DayCellProps {
  dateKey: string;
  record: DayRecord | undefined;
  totalTasks: number;
  selected: boolean;
  onClick: () => void;
}

function getCellStyle(
  dateKey: string,
  record: DayRecord | undefined,
  totalTasks: number,
  selected: boolean
): string {
  const base =
    "relative flex flex-col items-center justify-center aspect-square rounded-lg text-xs font-medium transition-all select-none";

  if (isFuture(dateKey)) {
    return `${base} text-zinc-700 cursor-default`;
  }

  const today = isToday(dateKey);
  const completedCount = record?.completedTaskIds.length ?? 0;
  const hasData = completedCount > 0;

  let bg = "bg-zinc-900 hover:bg-zinc-800 cursor-pointer";
  let text = "text-zinc-400";

  if (hasData) {
    if (completedCount >= totalTasks && totalTasks > 0) {
      bg = "bg-emerald-950 hover:bg-emerald-900 cursor-pointer";
      text = "text-emerald-300";
    } else {
      bg = "bg-amber-950 hover:bg-amber-900 cursor-pointer";
      text = "text-amber-300";
    }
  }

  let ring = "";
  if (today) ring = "ring-2 ring-indigo-500";
  if (selected) ring = "ring-2 ring-indigo-400 ring-offset-1 ring-offset-zinc-950";

  return `${base} ${bg} ${text} ${ring}`;
}

export function DayCell({ dateKey, record, totalTasks, selected, onClick }: DayCellProps) {
  const future = isFuture(dateKey);
  const day = keyToDate(dateKey).getDate();
  const completedCount = record?.completedTaskIds.length ?? 0;
  const hasData = completedCount > 0;

  return (
    <button
      onClick={future ? undefined : onClick}
      disabled={future}
      className={getCellStyle(dateKey, record, totalTasks, selected)}
      title={future ? undefined : dateKey}
    >
      <span>{day}</span>
      {hasData && !future && (
        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-current opacity-70" />
      )}
    </button>
  );
}
