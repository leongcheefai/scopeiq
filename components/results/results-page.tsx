'use client'

import { useState } from 'react'
import { FormState, EstimateResult } from '@/types/wizard'
import { getSelectedFeaturesSummary } from '@/lib/scoring'
import { generatePDF } from '@/lib/generate-pdf'
import { Logo } from '@/components/shared/logo'
import { EstimateBand } from './estimate-band'
import { FeaturesSummary } from './features-summary'
import { CTAButtons } from './cta-buttons'
import { AlertTriangle } from 'lucide-react'

interface ResultsPageProps {
  formState: FormState
  estimate: EstimateResult
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/firsttofly/discovery'

export function ResultsPage({ formState, estimate }: ResultsPageProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const features = getSelectedFeaturesSummary(formState)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(formState, estimate, features)
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

          {/* Estimate Band */}
          <EstimateBand estimate={estimate} />

          {/* Features Summary */}
          <FeaturesSummary features={features} />

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium mb-1">
                  Important Note
                </p>
                <p className="text-sm text-amber-700">
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
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://firsttofly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Firsttofly
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
