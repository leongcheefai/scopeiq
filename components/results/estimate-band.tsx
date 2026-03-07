'use client'

import { EstimateResult } from '@/types/wizard'
import { Banknote, Clock } from 'lucide-react'

interface EstimateBandProps {
  estimate: EstimateResult
}

export function EstimateBand({ estimate }: EstimateBandProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Budget Range */}
      <div className="bg-secondary/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <Banknote className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Budget Range
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-foreground">
          {estimate.budgetRange}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-secondary/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
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
