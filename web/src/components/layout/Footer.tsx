'use client';

import { Link } from '@/i18n/navigation';
import { Mail, MapPin, Phone, Stethoscope, ArrowUp } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '/' as const, label: tNav('home') },
    { href: '/about' as const, label: tNav('about') },
    { href: '/services' as const, label: tNav('services') },
    { href: '/contact' as const, label: tNav('contact') },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-surface-100" id="site-footer">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-surface-950">
                {tNav('dr_name')}
              </span>
            </div>
            <p className="text-sm text-surface-500 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold text-surface-950 mb-6">{t('quick_links')}</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-500 hover:text-primary-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-surface-950 mb-6">{t('contact_info')}</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+79803669227" className="flex items-center gap-3 text-sm text-surface-500 hover:text-primary-600 transition-colors">
                <Phone className="h-4 w-4 text-primary-600 shrink-0" />
                <span dir="ltr">+7 980 366-92-27</span>
              </a>
              <a href="mailto:dr.shuaib@example.com" className="flex items-center gap-3 text-sm text-surface-500 hover:text-primary-600 transition-colors">
                <Mail className="h-4 w-4 text-primary-600 shrink-0" />
                <span>dr.shuaib@example.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-surface-500">
                <MapPin className="h-4 w-4 text-primary-600 shrink-0" />
                <span>{t('location_value')}</span>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="flex flex-col items-start lg:items-end justify-between">
            <div />
            <button 
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full bg-surface-100 text-surface-500 flex items-center justify-center transition-colors hover:bg-primary-600 hover:text-white"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-surface-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-400">
            © {year} {isRtl ? 'د. شعيب علي حسن إسماعيل' : locale === 'ru' ? 'Д-р Шуаиб Али Хасан Исмаил' : 'Dr. Shuaib Ali Hassan Ismail'}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs text-surface-400 hover:text-primary-600 transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/" className="text-xs text-surface-400 hover:text-primary-600 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
