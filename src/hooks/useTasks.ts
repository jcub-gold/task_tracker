"use client";

import { useCallback, useEffect, useState } from "react";
import { DayRecord, GlobalTask } from "@/lib/types";
import {
  getGlobalTasks,
  getDayRecord,
  addGlobalTask,
  deleteGlobalTask,
  toggleTaskForDay,
} from "@/lib/storage";

interface UseTasksReturn {
  globalTasks: GlobalTask[];
  completedIds: Set<string>;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggle: (taskId: string) => void;
}

export function useTasks(date: string): UseTasksReturn {
  const [globalTasks, setGlobalTasks] = useState<GlobalTask[]>([]);
  const [dayRecord, setDayRecord] = useState<DayRecord>({
    date,
    completedTaskIds: [],
  });

  useEffect(() => {
    setGlobalTasks(getGlobalTasks());
    setDayRecord(getDayRecord(date));
  }, [date]);

  const addTask = useCallback((title: string) => {
    setGlobalTasks(addGlobalTask(title));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setGlobalTasks(deleteGlobalTask(id));
  }, []);

  const toggle = useCallback(
    (taskId: string) => setDayRecord(toggleTaskForDay(date, taskId)),
    [date]
  );

  return {
    globalTasks,
    completedIds: new Set(dayRecord.completedTaskIds),
    addTask,
    deleteTask,
    toggle,
  };
}
