import { DayRecord, GlobalTask } from "@/lib/types";
import { formatDisplayDate } from "@/lib/dateUtils";

interface DayDetailProps {
  dateKey: string;
  globalTasks: GlobalTask[];
  record: DayRecord | undefined;
  onToggle: (taskId: string) => void;
  onClose: () => void;
}

export function DayDetail({
  dateKey,
  globalTasks,
  record,
  onToggle,
  onClose,
}: DayDetailProps) {
  const completedIds = new Set(record?.completedTaskIds ?? []);
  const completed = globalTasks.filter((t) => completedIds.has(t.id)).length;

  return (
    <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-zinc-100">
            {formatDisplayDate(dateKey)}
          </h3>
          {globalTasks.length > 0 && (
            <p className="text-xs text-zinc-500 mt-0.5">
              {completed}/{globalTasks.length} completed
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 text-lg leading-none"
        >
          ×
        </button>
      </div>

      {globalTasks.length === 0 ? (
        <p className="text-sm text-zinc-500 py-4 text-center">
          No tasks exist yet.
        </p>
      ) : (
        <div className="divide-y divide-zinc-800">
          {globalTasks.map((task) => {
            const done = completedIds.has(task.id);
            return (
              <button
                key={task.id}
                onClick={() => onToggle(task.id)}
                className="w-full flex items-center gap-3 py-2.5 text-left hover:bg-zinc-800 rounded-md px-1 transition-colors"
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-zinc-600"
                  }`}
                >
                  {done && (
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    done ? "line-through text-zinc-500" : "text-zinc-300"
                  }`}
                >
                  {task.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
