'use client'

import { useState } from 'react'
import { FormState, EstimateResult } from '@/types/wizard'
import { getSelectedFeaturesSummary } from '@/lib/scoring'
import { generatePDF } from '@/lib/generate-pdf'
import { CurrencyCode, DEFAULT_CURRENCY } from '@/lib/currency'
import { Logo } from '@/components/shared/logo'
import { EstimateBand } from './estimate-band'
import { CurrencySelector } from './currency-selector'
import { FeaturesSummary } from './features-summary'
import { CTAButtons } from './cta-buttons'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResultsPageProps {
  formState: FormState
  estimate: EstimateResult
  onStartOver?: () => void
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://cal.com/leong-chee-fai-c9lgk5/30min'

export function ResultsPage({ formState, estimate, onStartOver }: ResultsPageProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY)
  const features = getSelectedFeaturesSummary(formState)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(formState, estimate, features, currency)
    } catch (error) {
      console.error('[v0] PDF generation failed:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <span className="text-sm font-medium text-muted-foreground">
            Your Estimate
          </span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Greeting */}
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Here&apos;s your estimate, {formState.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Based on your project requirements, here&apos;s what you can expect.
            </p>
          </div>

          {/* Currency Selector + Estimate Band */}
          <div className="flex justify-end">
            <CurrencySelector value={currency} onChange={setCurrency} />
          </div>
          <EstimateBand estimate={estimate} currency={currency} />

          {/* Features Summary */}
          <FeaturesSummary features={features} />

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-300 font-medium mb-1">
                  Important Note
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  This is a ballpark estimate based on your inputs. Actual costs
                  may vary based on full project scope. A 30-minute discovery
                  call gives you a precise, commitment-free quote.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <CTAButtons
            onDownloadPDF={handleDownloadPDF}
            calendlyUrl={CALENDLY_URL}
            isGeneratingPDF={isGeneratingPDF}
          />

          {/* Start Over */}
          {onStartOver && (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                onClick={onStartOver}
                className="text-muted-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://praxor.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Praxor
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
