interface CompletionBarProps {
  label: string;
  rate: number;
  hasData: boolean;
}

export function CompletionBar({ label, rate, hasData }: CompletionBarProps) {
  const barColor =
    !hasData
      ? "bg-zinc-700"
      : rate >= 80
      ? "bg-emerald-500"
      : rate >= 50
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-400 w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: hasData ? `${rate}%` : "0%" }}
        />
      </div>
      <span className="text-sm font-medium text-zinc-300 w-10 text-right tabular-nums">
        {hasData ? `${rate}%` : "—"}
      </span>
    </div>
  );
}
