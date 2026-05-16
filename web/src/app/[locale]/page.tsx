import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import AboutSnippet from '@/components/home/AboutSnippet';
import SpecializationsSection from '@/components/home/SpecializationsSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSnippet />
      <SpecializationsSection />
      <HowItWorks />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
