import { Step } from '@/types/wizard'

export const steps: Step[] = [
  {
    key: 'projectType',
    question: 'What are you building?',
    type: 'single',
    options: [
      'Web App',
      'Mobile App (iOS/Android)',
      'Website / Landing Page',
      'API / Backend',
      'Other',
    ],
  },
  {
    key: 'businessType',
    question: 'What best describes your business?',
    type: 'single',
    options: [
      'Early-stage Startup',
      'Growing SME',
      'Established Enterprise',
      'Non-profit / NGO',
    ],
  },
  {
    key: 'designStatus',
    question: 'Do you have an existing design or brand?',
    type: 'single',
    options: [
      'Yes — full UI design ready',
      'Yes — brand only (logo/colors)',
      'No — need design from scratch',
    ],
  },
  {
    key: 'features',
    question: 'Which features do you need?',
    type: 'multi',
    options: [
      'User auth & accounts',
      'Payment / billing integration',
      'Admin dashboard',
      'Third-party API integrations',
      'Analytics & reporting',
      'Multi-language support',
      'Push / email notifications',
      'Real-time features (chat, live updates)',
    ],
  },
  {
    key: 'userRoles',
    question: 'How many user roles will your system have?',
    type: 'single',
    options: [
      '1 role (e.g. end users only)',
      '2 roles (e.g. users + admin)',
      '3 or more roles',
    ],
  },
  {
    key: 'dataComplexity',
    question: 'How complex is your data and business logic?',
    type: 'single',
    options: [
      'Simple (basic CRUD, few data models)',
      'Moderate (relational data, some workflows)',
      'Complex (real-time, heavy logic, integrations)',
    ],
  },
  {
    key: 'maintenance',
    question: 'Do you need ongoing maintenance after launch?',
    type: 'single',
    options: ['Yes, Monthly retainer', 'One-time project only', 'Unsure'],
  },
  {
    key: 'timeline',
    question: "What's your ideal timeline?",
    type: 'single',
    options: [
      'ASAP (under 1 month)',
      '1–3 months',
      '3–6 months',
      'Flexible',
    ],
  },
  {
    key: 'budgetRange',
    question: "What's your rough budget in mind?",
    type: 'single',
    options: [
      'Below RM 10,000',
      'RM 10,000 – RM 30,000',
      'RM 30,000 – RM 75,000',
      'RM 75,000+',
      "I don't know yet",
    ],
  },
  {
    key: 'name',
    question: 'Almost done! Where should we send your estimate?',
    type: 'form',
  },
]
