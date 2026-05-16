'use client';

import { useLocale } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ShieldCheck, Award, Globe2, UserCheck } from 'lucide-react';

export default function StatsSection() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const pillars = [
    {
      icon: Award,
      title: isRtl ? 'احترافية مشهودة' : 'Certified Expertise',
      desc: isRtl ? 'خبرة سريرية في أرقى الأقسام الباطنية' : 'Clinical experience in elite departments',
    },
    {
      icon: UserCheck,
      title: isRtl ? 'ثقة المرضى' : 'Patient Trust',
      desc: isRtl ? 'آلاف الحالات التي تمت رعايتها بنجاح' : 'Thousands of successfully treated cases',
    },
    {
      icon: Globe2,
      title: isRtl ? 'تواصل عالمي' : 'Global Access',
      desc: isRtl ? 'خدمة طبية متميزة بـ 3 لغات عالمية' : 'Premium care in 3 international languages',
    },
    {
      icon: ShieldCheck,
      title: isRtl ? 'أمان وخصوصية' : 'Elite Security',
      desc: isRtl ? 'حماية تامة لبيانات وخصوصية المرضى' : 'Full protection of patient data & privacy',
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
