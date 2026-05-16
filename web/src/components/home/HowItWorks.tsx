'use client';

import { useLocale, useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { CalendarCheck, MessageSquareText, Video } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('how_it_works');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const steps = [
    { key: 'step1', icon: MessageSquareText },
    { key: 'step2', icon: CalendarCheck },
    { key: 'step3', icon: Video },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-surface-100" id="how-it-works">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-surface-100 z-0" />
          
          {steps.map((step, index) => (
            <AnimatedSection key={step.key} delay={index * 0.15} direction="up">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-8 relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-white">
                    <step.icon className="h-10 w-10" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-surface-950 mb-3">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed max-w-xs">
                  {t(`${step.key}.description`)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
