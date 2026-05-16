'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutSnippet() {
  const t = useTranslations('about_snippet');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const points = [
    t('point_1'),
    t('point_2'),
    t('point_3'),
    t('point_4')
  ];

  return (
    <section className="bg-white py-24 lg:py-32" id="about">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <AnimatedSection direction={isRtl ? 'right' : 'left'}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/doctor.jpeg"
                  alt="Dr. Shuaib"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 text-center lg:text-start">
            <AnimatedSection direction="up">
              <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
                {t('title')}
              </span>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-8">
                {t('h2_1')}<span className="text-primary-600">{t('h2_2')}</span>
              </h2>

              <p className="text-lg text-surface-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                {t('text')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-start">
                {points.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 shrink-0" />
                    <span className="text-sm font-semibold text-surface-700">{point}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary-600 text-white font-bold text-base transition-all hover:bg-primary-700 active:scale-95"
              >
                <span>{t('read_more')}</span>
                <Arrow className="h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
