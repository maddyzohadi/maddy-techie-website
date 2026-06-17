import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'fa'],
  defaultLocale: 'en',
  // Always show /en or /fa in the URL — redirect / → /en
  localePrefix: 'always',
})
