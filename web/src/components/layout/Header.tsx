'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { localeNames } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe2, HeartPulse, Menu, Stethoscope, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/services' as const, label: t('services') },
    { href: '/contact' as const, label: t('contact') },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
    setIsOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-[2rem] border px-4 py-3 transition-all duration-500 sm:px-6 ${
            isScrolled
              ? 'border-surface-100 bg-white/90 shadow-medium backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-glow-primary transition-transform duration-500 hover:scale-105">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black leading-tight text-surface-950">
                {t('dr_name')}
              </span>
              <span className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-5 py-2 text-sm font-bold tracking-tight transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-950'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="relative">
              <button
                onClick={() => setLangOpen((value) => !value)}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-surface-600 transition-all hover:bg-surface-50 hover:text-surface-950"
              >
                <Globe2 className="h-4 w-4" />
                <span>{localeNames[locale]}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute end-0 mt-3 w-48 rounded-2xl border border-surface-100 bg-white p-2 shadow-elevated z-50"
                  >
                    {Object.entries(localeNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`w-full rounded-xl px-4 py-2.5 text-start text-sm font-bold transition-colors ${
                          locale === code ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-50'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/book"
              className="group inline-flex items-center gap-3 rounded-2xl bg-surface-950 px-7 py-3 text-sm font-black text-white shadow-elevated transition-all hover:scale-105 active:scale-95"
            >
              <HeartPulse className="h-4 w-4 text-primary-400 group-hover:scale-110 transition-transform" />
              <span>{t('book')}</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-50 text-surface-950 lg:hidden shadow-soft transition-transform active:scale-90"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-24 z-50 rounded-[2.5rem] border border-surface-100 bg-white p-6 shadow-elevated lg:hidden overflow-hidden"
          >
            <div className="grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-6 py-4 text-lg font-bold transition-colors ${
                    pathname === item.href ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-surface-50" />
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(localeNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => switchLocale(code)}
                    className={`rounded-xl py-3 text-xs font-black transition-colors ${
                      locale === code ? 'bg-primary-600 text-white' : 'bg-surface-50 text-surface-500'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <Link href="/book" onClick={() => setIsOpen(false)} className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-surface-950 py-5 text-lg font-black text-white shadow-elevated">
                <HeartPulse className="h-5 w-5 text-primary-400" />
                <span>{t('book')}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
