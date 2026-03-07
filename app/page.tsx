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

  const handleWizardComplete = async (
    completedFormState: FormState,
    completedEstimate: EstimateResult
  ) => {
    setFormState(completedFormState)
    setEstimate(completedEstimate)
    setAppState('results')

    // Submit lead in the background
    await submitLead(completedFormState, completedEstimate)
  }

  if (appState === 'landing') {
    return <LandingHero onStart={handleStartWizard} />
  }

  if (appState === 'wizard') {
    return <WizardShell onComplete={handleWizardComplete} />
  }

  if (appState === 'results' && formState && estimate) {
    return <ResultsPage formState={formState} estimate={estimate} />
  }

  return null
}
