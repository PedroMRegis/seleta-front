interface StepsCardProps {
  title: string
  steps: string[]
}

/** Card lateral com passos numerados em serifa ("Como funciona", "O que acontece agora"). */
export function StepsCard({ title, steps }: StepsCardProps) {
  return (
    <section className="rounded-2xl border border-line bg-bone-100 p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">{title}</h2>
      <ol className="mt-5 flex flex-col gap-5">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="font-display text-2xl leading-none text-steel-500">{i + 1}</span>
            <span className="text-sm text-ink-700">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
