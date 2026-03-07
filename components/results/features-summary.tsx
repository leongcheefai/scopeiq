'use client'

import { Check } from 'lucide-react'

interface FeaturesSummaryProps {
  features: string[]
}

export function FeaturesSummary({ features }: FeaturesSummaryProps) {
  return (
    <div className="bg-secondary/30 rounded-2xl p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Based on your selections
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-foreground"
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
