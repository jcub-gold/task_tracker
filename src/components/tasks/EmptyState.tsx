export function EmptyState() {
  return (
    <div className="py-12 text-center text-zinc-500">
      <div className="text-3xl mb-3">○</div>
      <p className="text-sm">No tasks yet — add one above.</p>
      <p className="text-xs mt-1 text-zinc-600">Tasks repeat every day automatically.</p>
    </div>
  );
}
