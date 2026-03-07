'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OptionCardProps {
  label: string
  selected: boolean
  onClick: () => void
  multiSelect?: boolean
}

export function OptionCard({
  label,
  selected,
  onClick,
  multiSelect = false,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2',
        selected
          ? 'border-[#1a1a1a] bg-[#1a1a1a]/5'
          : 'border-border bg-card hover:border-[#1a1a1a]/30'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'text-base font-medium transition-colors',
            selected ? 'text-[#1a1a1a]' : 'text-foreground'
          )}
        >
          {label}
        </span>
        {selected && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        {multiSelect && !selected && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
        )}
      </div>
    </button>
  )
}
