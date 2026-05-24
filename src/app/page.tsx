"use client";

import { useTasks } from "@/hooks/useTasks";
import { todayKey, formatDisplayDate } from "@/lib/dateUtils";
import { TaskInput } from "@/components/tasks/TaskInput";
import { TaskList } from "@/components/tasks/TaskList";
import { EmptyState } from "@/components/tasks/EmptyState";

const date = todayKey();

export default function TodayPage() {
  const { globalTasks, completedIds, addTask, deleteTask, toggle } = useTasks(date);

  const completed = globalTasks.filter((t) => completedIds.has(t.id)).length;
  const total = globalTasks.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100">
          {formatDisplayDate(date)}
        </h1>
        {total > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
              <span>
                {completed} of {total} complete
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <TaskInput onAdd={addTask} />
      </div>

      {globalTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3">
          <TaskList
            tasks={globalTasks}
            completedIds={completedIds}
            onToggle={toggle}
            onDelete={deleteTask}
          />
        </div>
      )}
    </div>
  );
}
