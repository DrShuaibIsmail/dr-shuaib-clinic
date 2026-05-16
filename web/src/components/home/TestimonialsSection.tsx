'use client';

import { useLocale, useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const reviews = isRtl
    ? [
        ['أحمد منصور', 'مراجعة طبية', 'شرح الحالة كان واضحاً جداً، والخطة العلاجية مكتوبة بطريقة تجعل المريض يعرف ماذا يفعل خطوة بخطوة.'],
        ['سارة الجابري', 'استشارة جهاز هضمي', 'شعرت أن الطبيب يستمع فعلاً قبل أن يقرر. التجربة منظمة ومطمئنة من البداية.'],
        ['خالد عبدالله', 'متابعة كبد', 'تعامل راق ومحترم، ومتابعة دقيقة بعد الاستشارة. هذا النوع من الرعاية يعطي أملاً حقيقياً.'],
      ]
    : [
        ['Ahmed Mansour', 'Medical review', 'The explanation was very clear and the treatment plan was written for easy following.'],
        ['Sarah Al-Jabri', 'Gastro consultation', 'I felt the doctor truly listened. The experience was organized and reassuring from start.'],
        ['Khaled Abdullah', 'Liver follow-up', 'Respectful care and precise follow-up. This kind of care gives real hope to patients.'],
      ];

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-surface-100" id="testimonials">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <div className="text-center mb-16">
          <AnimatedSection direction="up">
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
              {t('trust')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight">
              {t('title')}
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(([name, role, content], index) => (
            <AnimatedSection key={name} delay={index * 0.1} direction="up">
              <article className="h-full p-8 rounded-2xl border border-surface-100 flex flex-col text-center">
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-primary-600 text-primary-600" />
                  ))}
                </div>
                
                <p className="text-base text-surface-700 leading-relaxed mb-8 flex-grow">
                  &ldquo;{content}&rdquo;
                </p>
                
                <div className="flex flex-col items-center pt-6 border-t border-surface-100">
                  <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-lg mb-3">
                    {name.charAt(0)}
                  </div>
                  <p className="text-sm font-bold text-surface-950">{name}</p>
                  <p className="text-xs text-surface-400 mt-1">{role}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
