import { FormState, EstimateResult } from '@/types/wizard'

const SCORES: Record<string, Record<string, number>> = {
  projectType: {
    'Web App': 20,
    'Mobile App (iOS/Android)': 25,
    'Website / Landing Page': 8,
    'API / Backend': 15,
    Other: 10,
  },
  businessType: {
    'Early-stage Startup': 0,
    'Growing SME': 5,
    'Established Enterprise': 12,
    'Non-profit / NGO': 0,
  },
  designStatus: {
    'Yes — full UI design ready': 0,
    'Yes — brand only (logo/colors)': 8,
    'No — need design from scratch': 15,
  },
  features: {
    'User auth & accounts': 5,
    'Payment / billing integration': 10,
    'Admin dashboard': 8,
    'Third-party API integrations': 7,
    'Analytics & reporting': 6,
    'Multi-language support': 8,
    'Push / email notifications': 4,
    'Real-time features (chat, live updates)': 12,
  },
  userRoles: {
    '1 role (e.g. end users only)': 0,
    '2 roles (e.g. users + admin)': 5,
    '3 or more roles': 12,
  },
  dataComplexity: {
    'Simple (basic CRUD, few data models)': 0,
    'Moderate (relational data, some workflows)': 10,
    'Complex (real-time, heavy logic, integrations)': 22,
  },
  timeline: {
    'ASAP (under 1 month)': 10,
    '1–3 months': 5,
    '3–6 months': 0,
    Flexible: 0,
  },
}

const BANDS = [
  {
    min: 0,
    max: 30,
    budget: 'RM 8,000 – RM 18,000',
    timeline: '3–5 weeks',
    band: 'starter',
  },
  {
    min: 31,
    max: 55,
    budget: 'RM 18,000 – RM 40,000',
    timeline: '6–10 weeks',
    band: 'growth',
  },
  {
    min: 56,
    max: 85,
    budget: 'RM 40,000 – RM 75,000',
    timeline: '10–16 weeks',
    band: 'scale',
  },
  {
    min: 86,
    max: 999,
    budget: 'RM 75,000+',
    timeline: '16+ weeks',
    band: 'enterprise',
  },
]

export function calculateEstimate(state: FormState): EstimateResult {
  let score = 10 // base score

  score += SCORES.projectType[state.projectType] ?? 0
  score += SCORES.businessType[state.businessType] ?? 0
  score += SCORES.designStatus[state.designStatus] ?? 0
  score += SCORES.userRoles[state.userRoles] ?? 0
  score += SCORES.dataComplexity[state.dataComplexity] ?? 0
  score += SCORES.timeline[state.timeline] ?? 0

  // Multi-select features — sum all selected
  for (const feature of state.features) {
    score += SCORES.features[feature] ?? 0
  }

  const band =
    BANDS.find((b) => score >= b.min && score <= b.max) ?? BANDS[BANDS.length - 1]

  return {
    score,
    budgetRange: band.budget,
    timeline: band.timeline,
    band: band.band as EstimateResult['band'],
  }
}

export function getSelectedFeaturesSummary(state: FormState): string[] {
  const summary: string[] = []

  if (state.projectType) summary.push(state.projectType)
  if (state.designStatus) {
    if (state.designStatus === 'No — need design from scratch') {
      summary.push('Design from scratch')
    } else if (state.designStatus === 'Yes — brand only (logo/colors)') {
      summary.push('Brand assets only')
    } else {
      summary.push('Full UI design ready')
    }
  }
  if (state.features.length > 0) {
    summary.push(...state.features)
  }
  if (state.userRoles) {
    if (state.userRoles === '2 roles (e.g. users + admin)') {
      summary.push('2 user roles')
    } else if (state.userRoles === '3 or more roles') {
      summary.push('3+ user roles')
    } else {
      summary.push('Single user role')
    }
  }
  if (state.dataComplexity) {
    if (state.dataComplexity === 'Simple (basic CRUD, few data models)') {
      summary.push('Simple data complexity')
    } else if (state.dataComplexity === 'Moderate (relational data, some workflows)') {
      summary.push('Moderate data complexity')
    } else {
      summary.push('Complex data & logic')
    }
  }

  return summary
}
