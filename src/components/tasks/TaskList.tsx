import { GlobalTask } from "@/lib/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: GlobalTask[];
  completedIds: Set<string>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, completedIds, onToggle, onDelete }: TaskListProps) {
  const incomplete = tasks.filter((t) => !completedIds.has(t.id));
  const complete = tasks.filter((t) => completedIds.has(t.id));
  const sorted = [...incomplete, ...complete];

  return (
    <div className="divide-y divide-zinc-900">
      {sorted.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          completed={completedIds.has(task.id)}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
