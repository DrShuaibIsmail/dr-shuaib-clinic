'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { CalendarCheck, MessageCircle, ShieldCheck, Clock } from 'lucide-react';

export default function CtaSection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="bg-white py-24 lg:py-32" id="cta">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection direction="up">
          <div className="text-center max-w-3xl mx-auto">
            
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
              {t('cta_badge')}
            </span>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-6">
              {t('title')}
            </h2>
            
            <p className="text-lg text-surface-500 leading-relaxed mb-8">
              {t('subtitle')}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <ShieldCheck className="h-4 w-4 text-primary-600" />
                <span>{t('certified_expert')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <Clock className="h-4 w-4 text-primary-600" />
                <span>{t('support_247')}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary-600 text-white font-bold text-lg transition-all hover:bg-primary-700 active:scale-95"
              >
                <CalendarCheck className="h-5 w-5" />
                <span>{t('book')}</span>
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border-2 border-surface-200 text-surface-950 font-bold text-lg transition-all hover:border-primary-200 hover:bg-primary-50 active:scale-95"
              >
                <MessageCircle className="h-5 w-5 text-primary-600" />
                <span>{t('contact_us')}</span>
              </Link>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
