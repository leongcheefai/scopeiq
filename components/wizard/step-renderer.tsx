'use client'

import { Step, FormState } from '@/types/wizard'
import { OptionCard } from './option-card'
import { EmailGateStep } from './email-gate-step'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface StepRendererProps {
  step: Step
  formState: FormState
  onSingleSelect: (key: keyof FormState, value: string) => void
  onMultiSelect: (key: keyof FormState, value: string) => void
  onFormUpdate: (key: keyof FormState, value: string) => void
  onContinue: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function StepRenderer({
  step,
  formState,
  onSingleSelect,
  onMultiSelect,
  onFormUpdate,
  onContinue,
  onSubmit,
  isSubmitting,
}: StepRendererProps) {
  if (step.type === 'form') {
    return (
      <EmailGateStep
        formState={formState}
        onUpdate={onFormUpdate}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    )
  }

  const currentValue = formState[step.key]
  const isMulti = step.type === 'multi'
  const selectedValues = isMulti
    ? (currentValue as string[])
    : [currentValue as string]

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        {step.options?.map((option) => (
          <OptionCard
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            multiSelect={isMulti}
            onClick={() =>
              isMulti
                ? onMultiSelect(step.key, option)
                : onSingleSelect(step.key, option)
            }
          />
        ))}
      </div>

      {isMulti && (
        <div className="flex justify-end pt-4">
          <Button
            onClick={onContinue}
            disabled={selectedValues.length === 0}
            className="h-11 px-6 text-base font-semibold bg-primary text-primary-foreground"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
