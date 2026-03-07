'use client'

import { EstimateResult } from '@/types/wizard'
import { CurrencyCode } from '@/lib/currency'
import { formatBudgetRange } from '@/lib/currency'
import { Banknote, Clock } from 'lucide-react'

interface EstimateBandProps {
  estimate: EstimateResult
  currency: CurrencyCode
}

export function EstimateBand({ estimate, currency }: EstimateBandProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Budget Range */}
      <div className="bg-secondary/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Banknote className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Budget Range
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-foreground">
          {formatBudgetRange(estimate.budgetMin, estimate.budgetMax, currency)}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-secondary/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Estimated Timeline
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-foreground">
          {estimate.timeline}
        </p>
      </div>
    </div>
  )
}
