'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, Calendar, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ── Content Side ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-50 border border-surface-100 mb-8">
              <Activity className="h-4 w-4 text-primary-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-surface-600">
                {t('hero_badge')}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-surface-950 tracking-tight leading-[1.05] mb-8">
                {isRtl ? (
                  <>رعايتكم الصحية، <br/><span className="text-primary-600">هدفنا الأسمى.</span></>
                ) : (
                  <>Your Health, <br/><span className="text-primary-600">Our Priority.</span></>
                )}
              </h1>
              
              <p className="text-lg md:text-xl text-surface-600 max-w-xl mb-12 leading-relaxed font-medium">
                {t('description')}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="w-full sm:w-auto px-10 py-5 rounded-xl bg-primary-600 text-white font-bold text-lg shadow-medium transition-all hover:bg-primary-700 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <Calendar className="h-5 w-5" />
                <span>{t('cta_book')}</span>
              </Link>
              
              <a 
                href="tel:+79803669227"
                className="w-full sm:w-auto px-10 py-5 rounded-xl border border-surface-200 bg-white text-surface-950 font-bold text-lg hover:bg-surface-50 transition-all flex items-center justify-center gap-3"
              >
                <Phone className="h-5 w-5 text-primary-600" />
                <span dir="ltr">+7 980 366-92-27</span>
              </a>
            </div>

            {/* Structured Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-surface-100 pt-8 w-full">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    <ShieldCheck className="h-5 w-5" />
                 </div>
                 <span className="text-sm font-bold text-surface-800">{t('secure_badge')}</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    <Activity className="h-5 w-5" />
                 </div>
                 <span className="text-sm font-bold text-surface-800">{t('online_consulting')}</span>
               </div>
            </div>
          </div>

          {/* ── Visual Side ── */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[500px]"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[12px] border-surface-50 shadow-elevated">
                <Image
                  src="/images/doctor.jpeg"
                  alt="Dr. Shuaib"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              
              {/* Solid Integration Card */}
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-2xl border border-surface-100 shadow-elevated max-w-[200px] hidden sm:block">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{t('live_status')}</span>
                 </div>
                 <p className="text-sm font-bold text-surface-900 leading-tight">
                    {isRtl ? 'نحن متاحون الآن لاستقبال استفساراتكم' : 'Available for medical inquiries now'}
                 </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
