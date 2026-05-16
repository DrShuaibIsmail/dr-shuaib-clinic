'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { localeNames } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe2, HeartPulse, Menu, Stethoscope, X, ArrowRight } from 'lucide-react';
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-[2.5rem] px-4 py-3 transition-all duration-700 sm:px-8 ${
            isScrolled
              ? 'glass-morphism shadow-elevated border-white/50'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-950 text-white shadow-elevated transition-all duration-500 group-hover:scale-110 group-hover:bg-primary-600">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black leading-none text-surface-950 tracking-tighter">
                {t('dr_name')}
              </span>
              <span className="text-[9px] font-black text-primary-600 uppercase tracking-[0.3em] mt-1">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 lg:flex bg-surface-50/50 backdrop-blur-md p-1.5 rounded-2xl border border-surface-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-6 py-2.5 text-sm font-black tracking-tight transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-white text-primary-700 shadow-soft'
                    : 'text-surface-500 hover:text-surface-950 hover:bg-white/50'
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
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-surface-600 transition-all hover:bg-white hover:text-surface-950 border border-transparent hover:border-surface-100"
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
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                          locale === code ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-50'
                        }`}
                      >
                        <span>{name}</span>
                        {locale === code && <div className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/book"
              className="flex items-center gap-2 rounded-2xl bg-surface-950 px-6 py-3.5 text-sm font-black text-white shadow-elevated transition-all hover:scale-105 active:scale-95 group"
            >
              <HeartPulse className="h-4 w-4 text-primary-400 group-hover:animate-pulse" />
              <span>{t('book')}</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-surface-950 lg:hidden shadow-medium border border-surface-100 transition-all active:scale-90"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-surface-950/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed inset-x-4 top-24 z-50 rounded-[3rem] border border-white/50 bg-white/90 backdrop-blur-2xl p-8 shadow-elevated lg:hidden"
            >
              <div className="grid gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-6 py-5 text-xl font-black transition-all ${
                      pathname === item.href 
                        ? 'bg-primary-600 text-white shadow-glow-primary' 
                        : 'text-surface-700 bg-surface-50/50 hover:bg-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`h-5 w-5 ${pathname === item.href ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                  </Link>
                ))}
                <div className="my-4 h-px bg-surface-200/50" />
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={`rounded-2xl py-4 text-xs font-black transition-all ${
                        locale === code 
                          ? 'bg-surface-950 text-white' 
                          : 'bg-white text-surface-500 border border-surface-100'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <Link href="/book" onClick={() => setIsOpen(false)} className="mt-6 flex items-center justify-center gap-3 rounded-[2rem] bg-primary-600 py-6 text-xl font-black text-white shadow-elevated active:scale-95 transition-transform">
                  <HeartPulse className="h-6 w-6 text-white" />
                  <span>{t('book')}</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
