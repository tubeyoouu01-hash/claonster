export function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="bg-navy text-paper">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <div className="font-display text-3xl sm:text-4xl text-gold">{s.value}</div>
            <div className="mt-1 text-xs sm:text-sm text-paper/65 tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
