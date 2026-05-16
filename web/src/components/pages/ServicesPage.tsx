'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Pill, HeartPulse, ScanSearch, Stethoscope, Video, Clock, Shield, Calendar, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations('specializations');
  const locale = useLocale();

  const services = [
    {
      icon: Pill,
      title: t('gastro.title'),
      description: t('gastro.description'),
      details: locale === 'ar'
        ? ['آلام المعدة والحموضة', 'القولون العصبي', 'قرحة المعدة والاثني عشر', 'التهابات الأمعاء']
        : locale === 'ru'
        ? ['Боли в желудке и изжога', 'Синдром раздражённого кишечника', 'Язвы желудка', 'Воспаления кишечника']
        : ['Stomach pain & heartburn', 'Irritable bowel syndrome', 'Stomach & duodenal ulcers', 'Intestinal inflammations'],
      color: 'text-primary-600',
      bg: 'bg-primary-50',
    },
    {
      icon: HeartPulse,
      title: t('liver.title'),
      description: t('liver.description'),
      details: locale === 'ar'
        ? ['التهاب الكبد الفيروسي', 'الكبد الدهني', 'تليف الكبد', 'متابعة وظائف الكبد']
        : locale === 'ru'
        ? ['Вирусный гепатит', 'Жировая болезнь печени', 'Цирроз печени', 'Контроль функций печени']
        : ['Viral hepatitis', 'Fatty liver disease', 'Liver cirrhosis', 'Liver function monitoring'],
      color: 'text-accent-600',
      bg: 'bg-accent-50',
    },
    {
      icon: ScanSearch,
      title: t('endoscopy.title'),
      description: t('endoscopy.description'),
      details: locale === 'ar'
        ? ['مناظير الجهاز العلوي', 'مناظير القولون', 'الكشف المبكر', 'المتابعة الدورية']
        : locale === 'ru'
        ? ['Гастроскопия', 'Колоноскопия', 'Ранняя диагностика', 'Периодический контроль']
        : ['Upper GI endoscopy', 'Colonoscopy', 'Early detection', 'Regular follow-up'],
      color: 'text-primary-600',
      bg: 'bg-primary-50',
    },
    {
      icon: Stethoscope,
      title: t('general.title'),
      description: t('general.description'),
      details: locale === 'ar'
        ? ['الكشف الطبي العام', 'أمراض الضغط والسكري', 'الاستشارات الوقائية', 'التقارير الطبية']
        : locale === 'ru'
        ? ['Общий осмотр', 'Гипертония и диабет', 'Профилактика', 'Медицинские заключения']
        : ['General checkup', 'Hypertension & diabetes', 'Preventive care', 'Medical reports'],
      color: 'text-accent-600',
      bg: 'bg-accent-50',
    },
  ];

  const features = [
    { icon: Video, text: locale === 'ar' ? 'استشارة أونلاين عبر الفيديو' : locale === 'ru' ? 'Онлайн видеоконсультация' : 'Online Video Consultation' },
    { icon: Clock, text: locale === 'ar' ? 'مواعيد مرنة تناسب وقتك' : locale === 'ru' ? 'Гибкое расписание' : 'Flexible Scheduling' },
    { icon: Shield, text: locale === 'ar' ? 'خصوصية وأمان تام للبيانات' : locale === 'ru' ? 'Полная конфиденциальность' : 'Full Data Privacy' },
    { icon: Calendar, text: locale === 'ar' ? 'حجز سهل وسريع' : locale === 'ru' ? 'Быстрая запись' : 'Quick & Easy Booking' },
  ];

  return (
    <div className="bg-surface-50 min-h-screen pt-24">
      {/* Page Header - Impeccable Style */}
      <section className="relative py-20 overflow-hidden bg-white border-b border-surface-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.55_0.15_245/0.03),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-6">
               <HeartPulse className="h-3 w-3" />
               <span>{t('subtitle')}</span>
            </span>
            <h1 className="text-5xl md:text-6xl font-medium text-surface-950 tracking-tight">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto font-medium">
              {locale === 'ar' ? 'نقدّم رعاية طبية متكاملة بأعلى المعايير المهنية والتقنية لضمان سلامتكم.' : 'We provide comprehensive medical care with the highest professional and technical standards.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1} direction="up">
                  <div className="group h-full flex flex-col rounded-[2.5rem] bg-white border border-surface-100 shadow-soft p-10 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2">
                    <div className="flex items-start justify-between mb-8">
                       <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${service.bg} ${service.color} transition-transform duration-500 group-hover:scale-110`}>
                          <Icon className="h-8 w-8" strokeWidth={1.5} />
                       </div>
                       <span className="text-4xl font-black text-surface-50 group-hover:text-primary-50 transition-colors">0{i + 1}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-surface-900 mb-4 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                      <p className="text-surface-500 font-medium mb-8 leading-relaxed">{service.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.details.map((detail, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm font-bold text-surface-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-surface-50">
                       <Link
                         href="/book"
                         className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-600 group-hover:text-primary-700 transition-colors"
                       >
                         {locale === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
                         <Calendar className="h-4 w-4" />
                       </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-End Features Section */}
      <section className="py-24 bg-white border-y border-surface-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
               <h2 className="text-4xl font-medium text-surface-950 tracking-tight leading-tight mb-8">
                 {locale === 'ar' ? 'لماذا تختار استشاراتنا الطبية؟' : 'Why Choose Our Medical Consultations?'}
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {features.map((feat, i) => {
                   const Icon = feat.icon;
                   return (
                     <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-surface-50 border border-surface-100 transition-all hover:bg-white hover:shadow-medium">
                        <div className="h-10 w-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-primary-600">
                           <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-bold text-surface-700">{feat.text}</span>
                     </div>
                   );
                 })}
               </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
               <div className="relative rounded-[3rem] overflow-hidden shadow-elevated border-8 border-surface-50">
                  <div className="absolute inset-0 bg-primary-600/5 backdrop-blur-sm flex items-center justify-center p-12 text-center">
                     <div>
                        <p className="text-xl font-bold text-primary-900 mb-6 italic">
                          {locale === 'ar' ? '"نحن نجمع بين الخبرة الطبية والتقنيات الحديثة لنقدم لكم أفضل رعاية ممكنة."' : '"We combine medical expertise with modern technology to provide you with the best possible care."'}
                        </p>
                        <Link
                          href="/book"
                          className="inline-flex items-center gap-3 rounded-2xl bg-primary-600 px-10 py-5 text-lg font-black text-white shadow-medium transition-all hover:bg-primary-700 hover:scale-[1.03]"
                        >
                          <Calendar className="h-5 w-5" />
                          {locale === 'ar' ? 'احجز موعدك الآن' : 'Book Your Appointment'}
                        </Link>
                     </div>
                  </div>
                  <div className="h-[400px] w-full bg-surface-100" />
               </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

