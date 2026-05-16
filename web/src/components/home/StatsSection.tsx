'use client';

import { useLocale, useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ShieldCheck, Award, Globe2, UserCheck } from 'lucide-react';

export default function StatsSection() {
  const t = useTranslations('stats');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const pillars = [
    {
      icon: Award,
      title: t('pillar_1_title'),
      desc: t('pillar_1_desc'),
    },
    {
      icon: UserCheck,
      title: t('pillar_2_title'),
      desc: t('pillar_2_desc'),
    },
    {
      icon: Globe2,
      title: t('pillar_3_title'),
      desc: t('pillar_3_desc'),
    },
    {
      icon: ShieldCheck,
      title: t('pillar_4_title'),
      desc: t('pillar_4_desc'),
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-28 border-t border-surface-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {pillars.map((pillar, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <pillar.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-surface-950 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
