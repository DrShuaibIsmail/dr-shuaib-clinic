'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  FileText,
  HeartPulse,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
} from 'lucide-react';

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeExperience() {
  const hero = useTranslations('hero');
  const stats = useTranslations('stats');
  const about = useTranslations('about_snippet');
  const specs = useTranslations('specializations');
  const steps = useTranslations('how_it_works');
  const cta = useTranslations('cta');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const promises = isAr
    ? ['خصوصية تامة', 'شرح مطمئن', 'خطة واضحة']
    : ['Private care', 'Calm explanation', 'Clear plan'];

  const services = [
    { key: 'gastro', icon: Stethoscope },
    { key: 'liver', icon: HeartPulse },
    { key: 'endoscopy', icon: FileText },
    { key: 'general', icon: ShieldCheck },
  ];

  const bookingSteps = [
    { key: 'step1', icon: MessageCircle },
    { key: 'step2', icon: CalendarCheck },
    { key: 'step3', icon: Video },
  ];

  const reviews = isAr
    ? [
        ['طمأنينة', 'الاستشارة كانت هادئة وواضحة، شعرت أن حالتي مفهومة وليست مستعجلة.'],
        ['وضوح', 'الخطة العلاجية كانت مرتبة بلغة بسيطة، وعرفت ماذا أفعل بعد الموعد.'],
        ['احترام', 'تعامل إنساني ومتابعة محترمة، وهذا يفرق كثيراً مع المريض.'],
      ]
    : [
        ['Reassurance', 'The consultation was calm and clear. I felt my case was understood.'],
        ['Clarity', 'The treatment plan was organized in simple language with clear next steps.'],
        ['Respect', 'Human care and respectful follow-up made a real difference.'],
      ];

  return (
    <div className="bg-[#fffaf2] text-[#17231f]">
      <section className="relative isolate overflow-hidden pt-32 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(224,177,111,0.22),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(99,164,141,0.20),transparent_34%),linear-gradient(180deg,#fffaf2_0%,#f6fbf7_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f6fbf7] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rise}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d8c49e]/60 bg-white/72 px-4 py-2 text-sm font-black text-[#356c61] shadow-[0_18px_55px_rgba(99,78,39,0.09)] backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#c08a3e]" />
              <span>{isAr ? 'رعاية هادئة تمنحك ثقة من أول خطوة' : 'Calm care that builds trust from the first step'}</span>
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[1.08] text-[#17231f] sm:text-6xl lg:text-7xl">
              {isAr ? (
                <>
                  طب يطمئنك،
                  <span className="block text-[#3f8575]">ويفتح لك باب الأمل.</span>
                </>
              ) : (
                <>
                  Care that reassures,
                  <span className="block text-[#3f8575]">and opens a path to hope.</span>
                </>
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-medium leading-9 text-[#53645e] sm:text-xl">
              {hero('description')}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#2f7568] px-8 py-4 text-base font-black text-white shadow-[0_24px_60px_rgba(47,117,104,0.24)] transition hover:-translate-y-0.5 hover:bg-[#255f55]"
              >
                <CalendarCheck className="h-5 w-5" />
                <span>{hero('cta_book')}</span>
                <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>

              <a
                href="tel:+79803669227"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#dfd1b5] bg-white/78 px-8 py-4 text-base font-black text-[#17231f] shadow-[0_20px_50px_rgba(70,55,31,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#c08a3e]"
              >
                <Phone className="h-5 w-5 text-[#c08a3e]" />
                <span dir="ltr">+7 980 366-92-27</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {promises.map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-3 text-sm font-black text-[#53645e] shadow-[0_16px_40px_rgba(70,55,31,0.07)] backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 text-[#3f8575]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[570px]">
              <div className="absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-white via-[#f2e4c9] to-[#cce5dc] shadow-[0_40px_100px_rgba(67,86,76,0.18)]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.35rem] border-[10px] border-white bg-white shadow-[0_35px_90px_rgba(67,86,76,0.18)]">
                <Image
                  src="/images/doctor.jpeg"
                  alt="Dr. Shuaib Ali Hassan Ismail"
                  fill
                  className="object-cover object-top"
                  loading="eager"
                  sizes="(min-width: 1024px) 570px, 92vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17231f]/72 via-[#17231f]/18 to-transparent p-6 sm:p-8">
                  <div className="rounded-[1.75rem] border border-white/24 bg-white/18 p-5 text-white backdrop-blur-xl">
                    <p className="text-sm font-bold text-white/78">{isAr ? 'د. شعيب علي حسن إسماعيل' : 'Dr. Shuaib Ali Hassan Ismail'}</p>
                    <p className="mt-1 text-2xl font-black leading-tight">
                      {isAr ? 'باطنية، جهاز هضمي، كبد ومناظير' : 'Internal medicine, gastro, liver and endoscopy'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`absolute top-8 ${isAr ? '-left-3' : '-right-3'} hidden rounded-[1.6rem] border border-white bg-[#fffaf2]/94 p-5 shadow-[0_25px_70px_rgba(70,55,31,0.14)] backdrop-blur sm:block`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f4ef] text-[#2f7568]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#2f7568]">100%</div>
                    <div className="text-xs font-black text-[#6f7d77]">{isAr ? 'سرية واهتمام' : 'Confidential care'}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f6fbf7] py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-[#dcebe3] bg-white shadow-[0_26px_80px_rgba(67,86,76,0.09)] md:grid-cols-4">
            {[
              ['2+', stats('experience')],
              ['1000+', isAr ? 'مريض تمت مساعدته' : 'Patients supported'],
              ['3', stats('languages')],
              ['100%', isAr ? 'خصوصية واحترام' : 'Privacy and respect'],
            ].map(([value, label]) => (
              <div key={label} className="border-[#edf3ef] p-7 md:border-e md:last:border-e-0">
                <div className="text-4xl font-black text-[#2f7568]">{value}</div>
                <div className="mt-2 text-sm font-black text-[#6f7d77]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6fbf7] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2.5rem] bg-[#e8d7b8]" />
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_80px_rgba(67,86,76,0.14)]">
              <Image src="/images/doctor.jpeg" alt="Dr. Shuaib" fill className="object-cover object-top" sizes="430px" />
            </div>
          </div>

          <div>
            <p className="text-sm font-black text-[#c08a3e]">{about('title')}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#17231f] md:text-6xl">
              {isAr ? 'استشارة تشعرك أنك في مكان آمن.' : 'A consultation that feels like a safe place.'}
            </h2>
            <p className="mt-6 text-lg font-medium leading-9 text-[#53645e]">{about('text')}</p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {(isAr
                ? ['استماع قبل التشخيص', 'شرح بلا تخويف', 'خطة علاج مفهومة', 'متابعة باحترام']
                : ['Listening before diagnosis', 'Explanation without fear', 'Readable treatment plan', 'Respectful follow-up']
              ).map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-[1.4rem] bg-white px-5 py-4 shadow-[0_18px_45px_rgba(67,86,76,0.07)]">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3f8575]" />
                  <span className="text-sm font-black text-[#44534e]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-sm font-black text-[#c08a3e]">{specs('subtitle')}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#17231f] md:text-6xl">{specs('title')}</h2>
            <p className="mt-5 text-lg font-medium leading-8 text-[#53645e]">
              {isAr
                ? 'خدمة طبية تركّز على فهم المشكلة، ترتيب الأولويات، وطمأنة المريض بخطة عملية.'
                : 'Care focused on understanding the issue, setting priorities, and giving a practical plan.'}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article key={service.key} className="group rounded-[2rem] border border-[#eadcc1] bg-white p-7 shadow-[0_22px_65px_rgba(70,55,31,0.08)] transition hover:-translate-y-1 hover:border-[#c08a3e]">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f4ef] text-[#2f7568] transition group-hover:bg-[#2f7568] group-hover:text-white">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black leading-tight text-[#17231f]">{specs(`${service.key}.title`)}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-[#6f7d77]">{specs(`${service.key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef8f3] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-black text-[#c08a3e]">{steps('subtitle')}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#17231f] md:text-6xl">{steps('title')}</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {bookingSteps.map((step, index) => (
              <article key={step.key} className="rounded-[2rem] bg-white p-7 shadow-[0_22px_65px_rgba(67,86,76,0.08)]">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff3df] text-[#c08a3e]">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-5xl font-black text-[#e7efe9]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-2xl font-black text-[#17231f]">{steps(`${step.key}.title`)}</h3>
                <p className="mt-4 text-base font-medium leading-8 text-[#6f7d77]">{steps(`${step.key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-black text-[#c08a3e]">{isAr ? 'تجربة المريض' : 'Patient experience'}</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#17231f] md:text-6xl">
              {isAr ? 'الثقة تبدأ من الإحساس بالاطمئنان.' : 'Trust starts with feeling reassured.'}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map(([title, text]) => (
              <article key={title} className="rounded-[2rem] border border-[#eadcc1] bg-white p-7 shadow-[0_20px_60px_rgba(70,55,31,0.07)]">
                <h3 className="text-2xl font-black text-[#2f7568]">{title}</h3>
                <p className="mt-5 text-base font-medium leading-8 text-[#6f7d77]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6fbf7] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#2f7568] p-8 text-white shadow-[0_30px_90px_rgba(47,117,104,0.20)] sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">{cta('title')}</h2>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/76">{cta('subtitle')}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/book" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-[#2f7568] transition hover:bg-[#fff3df]">
                  <CalendarCheck className="h-5 w-5" />
                  <span>{cta('book')}</span>
                </Link>
                <Link href="/contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/24 bg-white/10 px-8 py-4 text-base font-black text-white transition hover:bg-white/16">
                  <MessageCircle className="h-5 w-5 text-[#f0d5a4]" />
                  <span>{cta('contact_us')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
