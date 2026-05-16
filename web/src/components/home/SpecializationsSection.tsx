'use client';

import { useLocale, useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { HeartPulse, Pill, ScanSearch, Stethoscope, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SpecializationsSection() {
  const t = useTranslations('specializations');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const specs = [
    { key: 'gastro', icon: Pill },
    { key: 'liver', icon: HeartPulse },
    { key: 'endoscopy', icon: ScanSearch },
    { key: 'general', icon: Stethoscope },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-surface-100" id="specializations">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <div className="text-center mb-16">
          <AnimatedSection direction="up">
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
              {t('subtitle')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight">
              {t('title')}
            </h2>
          </AnimatedSection>
        </div>

        {/* Unified Grid: 4 cols desktop, 2 cols mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => (
            <AnimatedSection key={spec.key} delay={index * 0.1} direction="up">
              <article className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl transition-all hover:shadow-elevated hover:-translate-y-1 group cursor-pointer">
                <div className="mb-6 md:mb-8 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <spec.icon className="h-7 w-7 md:h-9 md:w-9" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-surface-950 mb-2 md:mb-3">
                  {t(`${spec.key}.title`)}
                </h3>
                <p className="text-xs md:text-sm text-surface-500 leading-relaxed mb-4 md:mb-6 flex-grow">
                  {t(`${spec.key}.description`)}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isRtl ? 'التفاصيل' : 'Details'}</span>
                  <Arrow className="h-3 w-3 md:h-4 md:w-4" />
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
