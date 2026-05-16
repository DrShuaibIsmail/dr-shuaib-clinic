'use client';

import { useTranslations, useLocale } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Image from 'next/image';
import { GraduationCap, Award, HeartPulse, BookOpen, Stethoscope, Globe } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about_snippet');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const timeline = [
    {
      icon: GraduationCap,
      title: isRtl ? 'التخرج من كلية الطب' : locale === 'ru' ? 'Окончание медицинского факультета' : 'Medical School Graduation',
      description: isRtl ? 'تخرج من كلية الطب البشري وبدأ مسيرته المهنية' : locale === 'ru' ? 'Окончил медицинский факультет и начал карьеру' : 'Graduated from Faculty of Medicine and began his career',
    },
    {
      icon: Award,
      title: isRtl ? 'فترة الامتياز والتطوع' : locale === 'ru' ? 'Интернатура и волонтёрство' : 'Internship & Volunteering',
      description: isRtl ? 'عمل متطوعاً لمدة عامين في المجال الطبي وحاز على تكريم تقديراً لجهوده' : locale === 'ru' ? 'Работал волонтёром два года и получил награду' : 'Volunteered for two years and was honored for dedication',
    },
    {
      icon: Stethoscope,
      title: isRtl ? 'العمل في قسم الباطنية' : locale === 'ru' ? 'Работа в терапии' : 'Internal Medicine Department',
      description: isRtl ? 'يعمل حالياً في قسم الباطنية مع خبرة سريرية واسعة' : locale === 'ru' ? 'Работает в отделении внутренних болезней' : 'Currently working in Internal Medicine with extensive experience',
    },
    {
      icon: HeartPulse,
      title: isRtl ? 'التخصص في الجهاز الهضمي' : locale === 'ru' ? 'Специализация в гастроэнтерологии' : 'Gastroenterology Specialization',
      description: isRtl ? 'يتابع تخصصه في أمراض الجهاز الهضمي والكبد والمناظير' : locale === 'ru' ? 'Продолжает специализацию в гастроэнтерологии' : 'Pursuing specialization in Gastroenterology, Hepatology & Endoscopy',
    },
    {
      icon: BookOpen,
      title: isRtl ? 'التطوير المهني المستمر' : locale === 'ru' ? 'Непрерывное развитие' : 'Continuous Professional Development',
      description: isRtl ? 'المشاركة المستمرة في المؤتمرات والمنتديات الطبية' : locale === 'ru' ? 'Участие в конференциях и медицинских форумах' : 'Active participation in medical conferences and forums',
    },
  ];

  const values = [
    {
      icon: HeartPulse,
      title: isRtl ? 'الدقة المهنية' : locale === 'ru' ? 'Профессиональная точность' : 'Professional Precision',
      description: isRtl ? 'تشخيص وعلاج وفق أعلى المعايير الطبية' : locale === 'ru' ? 'Диагностика по высшим стандартам' : 'Diagnosis and treatment per highest standards',
    },
    {
      icon: Award,
      title: isRtl ? 'الالتزام الأخلاقي' : locale === 'ru' ? 'Этический подход' : 'Ethical Commitment',
      description: isRtl ? 'رعاية طبية قائمة على الأمانة والشفافية' : locale === 'ru' ? 'Честная и прозрачная помощь' : 'Care built on honesty and transparency',
    },
    {
      icon: Globe,
      title: isRtl ? 'خدمة متعددة اللغات' : locale === 'ru' ? 'Многоязычный сервис' : 'Multilingual Service',
      description: isRtl ? 'استشارات بالعربية والإنجليزية والروسية' : locale === 'ru' ? 'Консультации на арабском, английском и русском' : 'Consultations in Arabic, English, and Russian',
    },
  ];

  return (
    <div className="pt-24">
      {/* Page Header */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <AnimatedSection>
              <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
                {t('title')}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-6">
                {isRtl
                  ? <>د. شعيب علي حسن <br /><span className="text-primary-600">إسماعيل</span></>
                  : locale === 'ru'
                  ? <>Д-р Шуайб Али <br /><span className="text-primary-600">Хасан Исмаил</span></>
                  : <>Dr. Shuaib Ali <br /><span className="text-primary-600">Hassan Ismail</span></>}
              </h1>
              <p className="text-lg text-surface-500 font-medium mb-6">
                {isRtl
                  ? 'طبيب عام — قسم الباطنية | أمراض الجهاز الهضمي والكبد والمناظير'
                  : locale === 'ru'
                  ? 'Врач общей практики — Терапия | Гастроэнтерология и гепатология'
                  : 'General Practitioner — Internal Medicine | Gastroenterology & Hepatology'}
              </p>
              <p className="text-base text-surface-500 leading-relaxed">
                {t('text')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/doctor.jpeg"
                  alt="Dr. Shuaib Ali Hassan Ismail"
                  width={500}
                  height={600}
                  className="h-[500px] w-full object-cover object-top"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-surface-100">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
              {isRtl ? 'السيرة المهنية' : locale === 'ru' ? 'Карьера' : 'Career'}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight">
              {isRtl ? 'المسيرة المهنية' : locale === 'ru' ? 'Карьерный путь' : 'Career Journey'}
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 start-8 w-px bg-surface-200 md:start-1/2" />

            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 hidden md:block" />
                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-medium">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white p-6 shadow-soft border border-surface-100">
                        <h3 className="text-base font-bold text-surface-950">{item.title}</h3>
                        <p className="mt-2 text-sm text-surface-500">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-surface-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
              {isRtl ? 'مبادئنا' : locale === 'ru' ? 'Принципы' : 'Principles'}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight">
              {isRtl ? 'قيمنا في العمل' : locale === 'ru' ? 'Наши ценности' : 'Our Values'}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="text-center p-8 rounded-2xl transition-all hover:shadow-elevated hover:-translate-y-1">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-6">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-surface-950 mb-3">{val.title}</h3>
                    <p className="text-sm text-surface-500 leading-relaxed">{val.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
