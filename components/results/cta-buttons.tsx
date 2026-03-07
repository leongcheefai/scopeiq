'use client'

import { Button } from '@/components/ui/button'
import { Download, Calendar } from 'lucide-react'

interface CTAButtonsProps {
  onDownloadPDF: () => void
  calendlyUrl: string
  isGeneratingPDF: boolean
}

export function CTAButtons({
  onDownloadPDF,
  calendlyUrl,
  isGeneratingPDF,
}: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button
        onClick={onDownloadPDF}
        disabled={isGeneratingPDF}
        variant="outline"
        className="h-12 px-6 text-base font-medium"
      >
        {isGeneratingPDF ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            Generating...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </span>
        )}
      </Button>
      <Button
        asChild
        className="h-12 px-6 text-base font-semibold bg-primary text-primary-foreground"
      >
        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
          <Calendar className="w-4 h-4 mr-2" />
          Book a Free Call
        </a>
      </Button>
    </div>
  )
}
