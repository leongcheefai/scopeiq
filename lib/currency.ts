export type CurrencyCode = 'MYR' | 'USD' | 'EUR' | 'GBP' | 'SGD' | 'AUD' | 'JPY' | 'INR'

interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  label: string
  locale: string
  rateFromMYR: number
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  MYR: { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit (RM)', locale: 'ms-MY', rateFromMYR: 1 },
  USD: { code: 'USD', symbol: '$', label: 'US Dollar ($)', locale: 'en-US', rateFromMYR: 0.22 },
  EUR: { code: 'EUR', symbol: '\u20AC', label: 'Euro (\u20AC)', locale: 'de-DE', rateFromMYR: 0.20 },
  GBP: { code: 'GBP', symbol: '\u00A3', label: 'British Pound (\u00A3)', locale: 'en-GB', rateFromMYR: 0.17 },
  SGD: { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar (S$)', locale: 'en-SG', rateFromMYR: 0.29 },
  AUD: { code: 'AUD', symbol: 'A$', label: 'Australian Dollar (A$)', locale: 'en-AU', rateFromMYR: 0.33 },
  JPY: { code: 'JPY', symbol: '\u00A5', label: 'Japanese Yen (\u00A5)', locale: 'ja-JP', rateFromMYR: 33 },
  INR: { code: 'INR', symbol: '\u20B9', label: 'Indian Rupee (\u20B9)', locale: 'en-IN', rateFromMYR: 18.5 },
}

export const DEFAULT_CURRENCY: CurrencyCode = 'MYR'

export function convertFromMYR(amount: number, currency: CurrencyCode): number {
  const converted = amount * CURRENCIES[currency].rateFromMYR
  if (currency === 'JPY' || currency === 'INR') {
    return Math.round(converted / 1000) * 1000
  }
  return Math.round(converted / 100) * 100
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency]
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatBudgetRange(
  minMYR: number,
  maxMYR: number | null,
  currency: CurrencyCode
): string {
  const convertedMin = convertFromMYR(minMYR, currency)
  if (maxMYR === null) {
    return `${formatCurrency(convertedMin, currency)}+`
  }
  const convertedMax = convertFromMYR(maxMYR, currency)
  return `${formatCurrency(convertedMin, currency)} \u2013 ${formatCurrency(convertedMax, currency)}`
}
