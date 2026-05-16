'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, Calendar, ShieldCheck, Activity, Heart, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden premium-gradient">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ── Content Side ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-soft mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">
                {t('hero_badge')}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-surface-950 tracking-tighter leading-[0.95] mb-8">
                {isRtl ? (
                  <>رعايتكم الصحية، <br/><span className="text-primary-600">هدفنا الأسمى.</span></>
                ) : (
                  <>Your Health, <br/><span className="text-primary-600">Our Priority.</span></>
                )}
              </h1>
              
              <p className="text-lg md:text-2xl text-surface-600 max-w-xl mb-12 leading-relaxed font-medium">
                {t('description')}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="group w-full sm:w-auto px-10 py-6 rounded-2xl bg-surface-950 text-white font-black text-lg shadow-elevated transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Calendar className="h-5 w-5 text-primary-400" />
                <span>{t('cta_book')}</span>
                <ArrowRight className={`h-5 w-5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </Link>
              
              <a 
                href="tel:+79803669227"
                className="w-full sm:w-auto px-10 py-6 rounded-2xl border border-surface-200 bg-white/50 backdrop-blur-md text-surface-950 font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                <Phone className="h-5 w-5 text-primary-600" />
                <span dir="ltr">+7 980 366-92-27</span>
              </a>
            </div>

            {/* Structured Trust Indicators */}
            <div className="mt-20 flex flex-wrap justify-center lg:justify-start gap-10 border-t border-surface-200/50 pt-10 w-full">
               <div className="flex items-center gap-4 group">
                 <div className="h-12 w-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-6 w-6" />
                 </div>
                 <div className="flex flex-col items-start">
                    <span className="text-xs font-black text-surface-400 uppercase tracking-widest leading-none mb-1">{t('security_label')}</span>
                    <span className="text-sm font-bold text-surface-950">{t('secure_badge')}</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 group">
                 <div className="h-12 w-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                    <Activity className="h-6 w-6" />
                 </div>
                 <div className="flex flex-col items-start">
                    <span className="text-xs font-black text-surface-400 uppercase tracking-widest leading-none mb-1">{t('service_label')}</span>
                    <span className="text-sm font-bold text-surface-950">{t('online_consulting')}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* ── Visual Side ── */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px]"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-[16px] border-white shadow-elevated transform lg:rotate-2">
                <Image
                  src="/images/doctor.jpeg"
                  alt="Dr. Shuaib"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>
              
              {/* Floating Status Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl border border-surface-100 shadow-elevated flex items-center gap-4 z-20"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-surface-400">{t('trust_score')}</span>
                  <span className="text-lg font-black text-surface-950">{t('positive_rating')}</span>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-12 -right-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-medium z-20 hidden md:block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold text-surface-600 uppercase">{t('live_status')}</span>
                </div>
                <span className="text-sm font-black text-surface-950">{tNav('dr_name')}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
