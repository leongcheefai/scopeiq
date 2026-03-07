'use client'

import { CurrencyCode, CURRENCIES } from '@/lib/currency'
import { Globe } from 'lucide-react'

interface CurrencySelectorProps {
  value: CurrencyCode
  onChange: (code: CurrencyCode) => void
}

const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[]

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        className="text-sm bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {CURRENCY_CODES.map((code) => (
          <option key={code} value={code}>
            {CURRENCIES[code].label}
          </option>
        ))}
      </select>
    </div>
  )
}
