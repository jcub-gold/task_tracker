"use client";

import { GlobalTask } from "@/lib/types";

interface TaskItemProps {
  task: GlobalTask;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, completed, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-3 py-2.5 px-1">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={completed ? "Mark incomplete" : "Mark complete"}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          completed
            ? "bg-emerald-500 border-emerald-500"
            : "border-zinc-600 hover:border-emerald-500"
        }`}
      >
        {completed && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span
        className={`flex-1 text-sm leading-snug ${
          completed ? "line-through text-zinc-500" : "text-zinc-100"
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-rose-400 transition-all text-lg leading-none"
        title="Remove task permanently"
      >
        ×
      </button>
    </div>
  );
}
