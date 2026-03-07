import { jsPDF } from 'jspdf'
import { FormState, EstimateResult } from '@/types/wizard'

export async function generatePDF(
  formState: FormState,
  estimate: EstimateResult,
  features: string[]
): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 20

  // Helper functions
  const addText = (text: string, x: number, yPos: number, options?: { fontSize?: number; fontStyle?: 'normal' | 'bold'; color?: string }) => {
    const { fontSize = 12, fontStyle = 'normal', color = '#1a1a1a' } = options || {}
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    const rgb = hexToRgb(color)
    doc.setTextColor(rgb.r, rgb.g, rgb.b)
    doc.text(text, x, yPos)
    return yPos
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const addLine = (yPos: number) => {
    doc.setDrawColor(230, 230, 230)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    return yPos + 10
  }

  // Header
  // Logo placeholder (black square with "S")
  doc.setFillColor(26, 26, 26)
  doc.rect(margin, y, 10, 10, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('S', margin + 3.5, y + 7)

  addText('ScopeIQ', margin + 14, y + 7, { fontSize: 14, fontStyle: 'bold' })

  // Date
  const date = new Date().toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(date, pageWidth - margin - doc.getTextWidth(date), y + 7)

  y += 25
  y = addLine(y)

  // Title
  addText('Project Scope Estimate', margin, y, { fontSize: 20, fontStyle: 'bold' })
  y += 15

  // Prepared for
  addText('Prepared for:', margin, y, { fontSize: 10, color: '#666666' })
  y += 6
  addText(formState.name, margin, y, { fontSize: 12, fontStyle: 'bold' })
  y += 8

  addText('Email:', margin, y, { fontSize: 10, color: '#666666' })
  y += 6
  addText(formState.email, margin, y, { fontSize: 12 })
  y += 8

  if (formState.projectDescription) {
    addText('Project:', margin, y, { fontSize: 10, color: '#666666' })
    y += 6
    const descLines = doc.splitTextToSize(formState.projectDescription, contentWidth)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(26, 26, 26)
    doc.text(descLines, margin, y)
    y += descLines.length * 6
  }

  y += 10
  y = addLine(y)

  // Estimated Investment
  addText('ESTIMATED INVESTMENT', margin, y, { fontSize: 12, fontStyle: 'bold', color: '#666666' })
  y += 12

  addText('Budget Range:', margin, y, { fontSize: 11, color: '#666666' })
  addText(estimate.budgetRange, margin + 35, y, { fontSize: 14, fontStyle: 'bold' })
  y += 10

  addText('Timeline:', margin, y, { fontSize: 11, color: '#666666' })
  addText(estimate.timeline, margin + 35, y, { fontSize: 14, fontStyle: 'bold' })

  y += 15
  y = addLine(y)

  // Requirements
  addText('BASED ON YOUR REQUIREMENTS', margin, y, { fontSize: 12, fontStyle: 'bold', color: '#666666' })
  y += 12

  features.forEach((feature) => {
    doc.setFillColor(26, 26, 26)
    doc.circle(margin + 2, y - 2, 1.5, 'F')
    addText(feature, margin + 8, y, { fontSize: 11 })
    y += 8
  })

  y += 5
  y = addLine(y)

  // Important Note
  addText('IMPORTANT NOTE', margin, y, { fontSize: 12, fontStyle: 'bold', color: '#666666' })
  y += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  const noteText = 'This is a preliminary estimate based on your inputs. Actual costs may vary based on full project scope. Book a free discovery call for a precise, itemised quote.'
  const noteLines = doc.splitTextToSize(noteText, contentWidth)
  doc.text(noteLines, margin, y)
  y += noteLines.length * 5 + 10

  // Calendly link
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://cal.com/leong-chee-fai-c9lgk5/30min'
  addText('Book a Free Call:', margin, y, { fontSize: 10, color: '#666666' })
  doc.setTextColor(26, 26, 26)
  doc.textWithLink(calendlyUrl, margin + 30, y, { url: calendlyUrl })

  y += 15
  y = addLine(y)

  // Footer
  addText('Praxor Sdn Bhd', margin, y, { fontSize: 9, color: '#999999' })
  addText('enquiry@praxor.dev', margin + 40, y, { fontSize: 9, color: '#999999' })
  addText('estimate.praxor.dev', pageWidth - margin - 40, y, { fontSize: 9, color: '#999999' })

  // Save the PDF
  doc.save(`ScopeIQ-Estimate-${formState.name.replace(/\s+/g, '-')}.pdf`)
}
