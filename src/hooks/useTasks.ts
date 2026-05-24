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
    getGlobalTasks().then(setGlobalTasks);
    getDayRecord(date).then(setDayRecord);
  }, [date]);

  const addTask = useCallback((title: string) => {
    addGlobalTask(title).then(setGlobalTasks);
  }, []);

  const deleteTask = useCallback((id: string) => {
    deleteGlobalTask(id).then(setGlobalTasks);
  }, []);

  const toggle = useCallback(
    (taskId: string) => {
      toggleTaskForDay(date, taskId).then(setDayRecord);
    },
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
