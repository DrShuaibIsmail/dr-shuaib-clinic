import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'en', 'ru'],
  defaultLocale: 'ar',
});

export const localeNames: Record<string, string> = {
  ar: 'العربية',
  en: 'English',
  ru: 'Русский',
};

export const rtlLocales = ['ar'];

export function isRtl(locale: string) {
  return rtlLocales.includes(locale);
}
