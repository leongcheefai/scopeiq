export interface FormState {
  projectType: string
  businessType: string
  designStatus: string
  features: string[]
  userRoles: string
  dataComplexity: string
  maintenance: string
  timeline: string
  budgetRange: string
  email: string
  name: string
  projectDescription: string
}

export interface Step {
  key: keyof FormState
  question: string
  type: 'single' | 'multi' | 'form'
  options?: string[]
}

export interface EstimateResult {
  score: number
  budgetRange: string
  timeline: string
  band: 'starter' | 'growth' | 'scale' | 'enterprise'
}

export const initialFormState: FormState = {
  projectType: '',
  businessType: '',
  designStatus: '',
  features: [],
  userRoles: '',
  dataComplexity: '',
  maintenance: '',
  timeline: '',
  budgetRange: '',
  email: '',
  name: '',
  projectDescription: '',
}
