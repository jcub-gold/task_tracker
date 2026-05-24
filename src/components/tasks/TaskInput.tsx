"use client";

import { useState, KeyboardEvent } from "react";

interface TaskInputProps {
  onAdd: (title: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState("");

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Add a task..."
        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      />
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
      >
        Add
      </button>
    </div>
  );
}
