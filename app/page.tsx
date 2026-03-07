'use client'

import { useState } from 'react'
import { FormState, EstimateResult } from '@/types/wizard'
import { submitLead } from '@/lib/submit-lead'
import { LandingHero } from '@/components/landing/landing-hero'
import { WizardShell } from '@/components/wizard/wizard-shell'
import { ResultsPage } from '@/components/results/results-page'

type AppState = 'landing' | 'wizard' | 'results'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing')
  const [formState, setFormState] = useState<FormState | null>(null)
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)

  const handleStartWizard = () => {
    setAppState('wizard')
  }

  const handleStartOver = () => {
    setFormState(null)
    setEstimate(null)
    setAppState('landing')
  }

  const handleWizardComplete = async (
    completedFormState: FormState,
    completedEstimate: EstimateResult
  ) => {
    setFormState(completedFormState)
    setEstimate(completedEstimate)
    setAppState('results')

    // Submit lead in the background (non-blocking)
    submitLead(completedFormState, completedEstimate).catch(() => {
      // Silently handled — lead submission is best-effort
    })
  }

  if (appState === 'landing') {
    return <LandingHero onStart={handleStartWizard} />
  }

  if (appState === 'wizard') {
    return <WizardShell onComplete={handleWizardComplete} />
  }

  if (appState === 'results' && formState && estimate) {
    return <ResultsPage formState={formState} estimate={estimate} onStartOver={handleStartOver} />
  }

  return null
}
