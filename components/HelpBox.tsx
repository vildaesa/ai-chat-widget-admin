'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'

type Props = {
  title?: string
  steps: string[]
  defaultOpen?: boolean
  className?: string
}

export default function HelpBox({
  title = 'Cara pakai',
  steps,
  defaultOpen = true,
  className,
}: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={clsx(
        'mb-6 rounded-xl border border-brand-100 bg-brand-50/60 text-sm text-slate-700',
        className
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-medium text-brand-700"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 shrink-0" />
          {title}
        </span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <ol className="list-decimal space-y-1.5 px-4 pb-4 pl-10 text-slate-600">
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
