'use client'

import { useState, useCallback } from 'react'
import { steps } from '@/config/steps'
import { FormState, initialFormState, EstimateResult } from '@/types/wizard'
import { calculateEstimate } from '@/lib/scoring'
import { ProgressBar } from './progress-bar'
import { StepRenderer } from './step-renderer'
import { Logo } from '@/components/shared/logo'
import { ChevronLeft } from 'lucide-react'

interface WizardShellProps {
  onComplete: (formState: FormState, estimate: EstimateResult) => void
}

export function WizardShell({ onComplete }: WizardShellProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStep = steps[currentStepIndex]

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }, [currentStepIndex])

  const goToPrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }, [currentStepIndex])

  const handleSingleSelect = useCallback(
    (key: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [key]: value }))
      // Auto-advance after a short delay for single select
      setTimeout(() => {
        goToNextStep()
      }, 200)
    },
    [goToNextStep]
  )

  const handleMultiSelect = useCallback((key: keyof FormState, value: string) => {
    setFormState((prev) => {
      const currentValues = prev[key] as string[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      return { ...prev, [key]: newValues }
    })
  }, [])

  const handleFormUpdate = useCallback((key: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    
    // Calculate estimate
    const estimate = calculateEstimate(formState)
    
    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    setIsSubmitting(false)
    onComplete(formState, estimate)
  }, [formState, onComplete])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar
            currentStep={currentStepIndex}
            totalSteps={steps.length}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
            {currentStep.question}
          </h1>
        </div>

        {/* Step Content */}
        <StepRenderer
          step={currentStep}
          formState={formState}
          onSingleSelect={handleSingleSelect}
          onMultiSelect={handleMultiSelect}
          onFormUpdate={handleFormUpdate}
          onContinue={goToNextStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Back Button */}
        {currentStepIndex > 0 && (
          <button
            onClick={goToPrevStep}
            className="mt-8 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>
    </div>
  )
}
