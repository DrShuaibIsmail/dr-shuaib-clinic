import { setRequestLocale } from 'next-intl/server';
import BookPage from '@/components/pages/BookPage';

export default async function Book({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookPage />;
}
