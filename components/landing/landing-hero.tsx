'use client'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { ArrowRight, Clock, Zap, Shield } from 'lucide-react'

interface LandingHeroProps {
  onStart: () => void
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-muted-foreground mb-6">
            <Zap className="w-4 h-4 text-amber-500" />
            Free project estimation tool
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Get a project estimate
            <br />
            <span className="text-[#1a1a1a]/70">in 2 minutes</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-pretty">
            Answer a few quick questions about your project and get an instant
            ballpark budget and timeline. No calls needed.
          </p>

          {/* CTA Button */}
          <Button
            onClick={onStart}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white shadow-lg hover:shadow-xl transition-all"
          >
            Start Estimating
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>2 minutes to complete</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          Powered by{' '}
          <a
            href="https://firsttofly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            Firsttofly
          </a>
        </div>
      </footer>
    </div>
  )
}
