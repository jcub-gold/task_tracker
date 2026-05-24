"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllDayRecords, getGlobalTasks, toggleTaskForDay } from "@/lib/storage";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { DayDetail } from "@/components/calendar/DayDetail";
import { DayRecord, GlobalTask } from "@/lib/types";

function getMonthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [records, setRecords] = useState<DayRecord[]>([]);
  const [globalTasks, setGlobalTasks] = useState<GlobalTask[]>([]);

  useEffect(() => {
    setRecords(getAllDayRecords());
    setGlobalTasks(getGlobalTasks());
  }, []);

  const handleToggle = useCallback((dateKey: string, taskId: string) => {
    const updated = toggleTaskForDay(dateKey, taskId);
    setRecords((prev) => {
      const idx = prev.findIndex((r) => r.date === dateKey);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      if (updated.completedTaskIds.length > 0) {
        return [...prev, updated].sort((a, b) => a.date.localeCompare(b.date));
      }
      return prev;
    });
  }, []);

  const recordMap = new Map(records.map((r) => [r.date, r]));

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDate(null);
  }

  function nextMonth() {
    const now = new Date();
    if (year === now.getFullYear() && month === now.getMonth()) return;
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDate(null);
  }

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100">Calendar</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors text-sm"
          >
            ‹
          </button>
          <span className="text-sm font-medium text-zinc-300 min-w-[120px] text-center">
            {getMonthLabel(year, month)}
          </span>
          <button
            onClick={nextMonth}
            disabled={isCurrentMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            ›
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <CalendarGrid
          year={year}
          month={month}
          records={records}
          totalTasks={globalTasks.length}
          selectedDate={selectedDate}
          onSelectDate={(d) =>
            setSelectedDate((prev) => (prev === d ? null : d))
          }
        />
      </div>

      <div className="mt-4 flex gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-800 inline-block" />
          All done
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-950 border border-amber-800 inline-block" />
          Partial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-zinc-900 border border-zinc-700 inline-block" />
          No tasks
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-indigo-500 inline-block" />
          Today
        </span>
      </div>

      {selectedDate && (
        <DayDetail
          dateKey={selectedDate}
          globalTasks={globalTasks}
          record={recordMap.get(selectedDate)}
          onToggle={(taskId) => handleToggle(selectedDate, taskId)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
