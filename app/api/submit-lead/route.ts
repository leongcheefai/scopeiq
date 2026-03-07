import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { formatBudgetRange } from '@/lib/currency'

export async function POST(request: NextRequest) {
  try {
    const { formState, estimate } = await request.json()

    const results: { airtable?: string; email?: string } = {}

    console.log('submit-lead called, formState:', JSON.stringify(formState))

    // Save to Airtable
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    console.log('Airtable config:', { hasKey: !!airtableApiKey, hasBaseId: !!airtableBaseId })

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
              'Budget Range': formatBudgetRange(estimate.budgetMin, estimate.budgetMax, 'MYR'),
              Timeline: estimate.timeline,
              Score: estimate.score,
              Band: estimate.band,
              'Features Selected': formState.features,
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
        const errorBody = await response.text()
        console.error('Airtable error:', response.status, errorBody)
        results.airtable = `Failed: ${response.status}`
      } else {
        console.log('Airtable lead saved successfully')
      }
    } else {
      console.warn('Airtable not configured — missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID')
    }

    // Send confirmation email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const resendFromEmail = process.env.RESEND_FROM_EMAIL

    if (resendApiKey && resendFromEmail) {
      const resend = new Resend(resendApiKey)
      const calendlyLink =
        process.env.NEXT_PUBLIC_CALENDLY_URL ||
        'https://cal.com/leong-chee-fai-c9lgk5/30min'

      const { error } = await resend.emails.send({
        from: resendFromEmail,
        to: formState.email,
        subject: `Your ScopeIQ Estimate — ${estimate.band} Plan`,
        html: `
          <h2>Hi ${formState.name},</h2>
          <p>Thanks for using ScopeIQ! Here's a summary of your project estimate:</p>
          <ul>
            <li><strong>Project Type:</strong> ${formState.projectType}</li>
            <li><strong>Budget Range:</strong> ${formatBudgetRange(estimate.budgetMin, estimate.budgetMax, 'MYR')}</li>
            <li><strong>Timeline:</strong> ${estimate.timeline}</li>
          </ul>
          <p>Ready to discuss your project?</p>
          <p><a href="${calendlyLink}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Book a Free Consultation</a></p>
          <br/>
          <p>— The Praxor Team</p>
        `,
      })

      if (error) {
        results.email = `Failed: ${error.message}`
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
