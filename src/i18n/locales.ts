export const LOCALES = ['tr', 'en'] as const
export type Locale = typeof LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'tr'
