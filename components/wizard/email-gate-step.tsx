'use client'

import { useState } from 'react'
import { FormState } from '@/types/wizard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Sparkles } from 'lucide-react'

interface EmailGateStepProps {
  formState: FormState
  onUpdate: (key: keyof FormState, value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function EmailGateStep({
  formState,
  onUpdate,
  onSubmit,
  isSubmitting,
}: EmailGateStepProps) {
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = () => {
    if (!formState.name.trim()) {
      return
    }
    if (!validateEmail(formState.email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    onSubmit()
  }

  const isValid = formState.name.trim() && formState.email.trim()

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          You&apos;re almost there
        </div>
        <p className="text-muted-foreground max-w-md mx-auto">
          Enter your details below and we&apos;ll send your personalized estimate
          right away.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Your name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formState.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={formState.email}
            onChange={(e) => {
              onUpdate('email', e.target.value)
              if (emailError) setEmailError('')
            }}
            className={`h-12 text-base ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && (
            <p className="text-sm text-red-500">{emailError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Describe your project in one line{' '}
            <span className="text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            id="description"
            placeholder="e.g., An e-commerce platform for handmade goods..."
            value={formState.projectDescription}
            onChange={(e) => onUpdate('projectDescription', e.target.value)}
            className="min-h-[100px] text-base resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full h-12 text-base font-semibold bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Get My Estimate
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          No spam. We&apos;ll only follow up if you want us to.
        </p>
      </div>
    </div>
  )
}
