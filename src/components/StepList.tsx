export function StepList({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, i) => (
        <div key={step.title} className="relative pt-8">
          <span className="font-display text-5xl text-gold-light/60 absolute top-0 left-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-8 border-t-2 border-gold mt-2">
            <h3 className="font-display text-xl text-ink mb-2">{step.title}</h3>
            <p className="text-sm text-slate leading-relaxed">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
