import { FormState, EstimateResult } from '@/types/wizard'

export async function submitLead(
  state: FormState,
  estimate: EstimateResult
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formState: state, estimate }),
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` }
    }

    return await response.json()
  } catch (error) {
    console.error('Lead submission error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
