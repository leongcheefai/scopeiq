import { FormState, EstimateResult } from '@/types/wizard'

export async function submitLead(
  state: FormState,
  estimate: EstimateResult
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Airtable is configured
    const airtableApiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
    const airtableBaseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID

    if (airtableApiKey && airtableBaseId) {
      // Save to Airtable
      const response = await fetch(
        `https://api.airtable.com/v0/${airtableBaseId}/Leads`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              Name: state.name,
              Email: state.email,
              'Project Description': state.projectDescription || 'Not specified',
              'Project Type': state.projectType,
              'Business Type': state.businessType,
              'Design Status': state.designStatus,
              'Budget Range': estimate.budgetRange,
              Timeline: estimate.timeline,
              Score: estimate.score,
              Band: estimate.band,
              'Features Selected': state.features.join(', '),
              'User Roles': state.userRoles,
              'Data Complexity': state.dataComplexity,
              Maintenance: state.maintenance,
              'User Budget': state.budgetRange,
              'User Timeline': state.timeline,
              'Submitted At': new Date().toISOString(),
            },
          }),
        }
      )

      if (!response.ok) {
        console.error('[v0] Airtable submission failed:', await response.text())
      }
    } else {
      console.log('[v0] Airtable not configured, skipping lead storage')
    }

    // Check if EmailJS is configured
    const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      // Send confirmation email via EmailJS
      const emailData = {
        service_id: emailjsServiceId,
        template_id: emailjsTemplateId,
        user_id: emailjsPublicKey,
        template_params: {
          to_name: state.name,
          to_email: state.email,
          budget_range: estimate.budgetRange,
          timeline: estimate.timeline,
          project_type: state.projectType,
          calendly_link:
            process.env.NEXT_PUBLIC_CALENDLY_URL ||
            'https://calendly.com/firsttofly/discovery',
        },
      }

      const emailResponse = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        }
      )

      if (!emailResponse.ok) {
        console.error('[v0] EmailJS submission failed:', await emailResponse.text())
      }
    } else {
      console.log('[v0] EmailJS not configured, skipping email confirmation')
    }

    return { success: true }
  } catch (error) {
    console.error('[v0] Lead submission error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
