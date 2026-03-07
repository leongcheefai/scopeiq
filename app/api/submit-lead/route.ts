import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { formState, estimate } = await request.json()

    const results: { airtable?: string; email?: string } = {}

    // Save to Airtable
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (airtableApiKey && airtableBaseId) {
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
              Name: formState.name,
              Email: formState.email,
              'Project Description': formState.projectDescription || 'Not specified',
              'Project Type': formState.projectType,
              'Business Type': formState.businessType,
              'Design Status': formState.designStatus,
              'Budget Range': estimate.budgetRange,
              Timeline: estimate.timeline,
              Score: estimate.score,
              Band: estimate.band,
              'Features Selected': formState.features.join(', '),
              'User Roles': formState.userRoles,
              'Data Complexity': formState.dataComplexity,
              Maintenance: formState.maintenance,
              'User Budget': formState.budgetRange,
              'User Timeline': formState.timeline,
              'Submitted At': new Date().toISOString(),
            },
          }),
        }
      )

      if (!response.ok) {
        results.airtable = `Failed: ${response.status}`
      }
    }

    // Send confirmation email via EmailJS
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY

    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      const emailResponse = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsTemplateId,
            user_id: emailjsPublicKey,
            template_params: {
              to_name: formState.name,
              to_email: formState.email,
              budget_range: estimate.budgetRange,
              timeline: estimate.timeline,
              project_type: formState.projectType,
              calendly_link:
                process.env.NEXT_PUBLIC_CALENDLY_URL ||
                'https://cal.com/leong-chee-fai-c9lgk5/30min',
            },
          }),
        }
      )

      if (!emailResponse.ok) {
        results.email = `Failed: ${emailResponse.status}`
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Submission failed' },
      { status: 500 }
    )
  }
}
