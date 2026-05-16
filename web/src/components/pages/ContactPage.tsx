'use client';

import { useLocale } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: Mail,
      label: isRtl ? 'البريد الإلكتروني' : locale === 'ru' ? 'Электронная почта' : 'Email',
      value: 'dr.shuaib@example.com',
      href: 'mailto:dr.shuaib@example.com',
    },
    {
      icon: Phone,
      label: isRtl ? 'الهاتف' : locale === 'ru' ? 'Телефон' : 'Phone',
      value: '+7 (900) 123-45-67',
      href: 'tel:+79001234567',
    },
    {
      icon: MessageCircle,
      label: isRtl ? 'تيليغرام' : 'Telegram',
      value: '@DrShuaib',
      href: 'https://t.me/DrShuaib',
    },
    {
      icon: MapPin,
      label: isRtl ? 'الموقع' : locale === 'ru' ? 'Расположение' : 'Location',
      value: isRtl ? 'موسكو، روسيا' : locale === 'ru' ? 'Москва, Россия' : 'Moscow, Russia',
      href: '#',
    },
    {
      icon: Clock,
      label: isRtl ? 'ساعات العمل' : locale === 'ru' ? 'Рабочие часы' : 'Working Hours',
      value: isRtl ? 'الأحد — الخميس: 9:00 - 17:00' : locale === 'ru' ? 'Вс — Чт: 9:00 - 17:00' : 'Sun — Thu: 9:00 AM - 5:00 PM',
      href: '#',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 bg-white min-h-screen">
      <section className="py-24 border-t border-surface-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-4 block">
              {isRtl ? 'نحن هنا لمساعدتك' : locale === 'ru' ? 'Мы здесь, чтобы помочь' : "We're Here to Help"}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight">
              {isRtl ? 'تواصل معنا' : locale === 'ru' ? 'Свяжитесь с нами' : 'Contact Us'}
            </h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-5 rounded-2xl bg-surface-50 p-6 transition-all hover:bg-primary-50"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-surface-950 mb-1">{item.label}</p>
                        <p className="text-sm text-surface-500" dir="auto">{item.value}</p>
                      </div>
                    </a>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Contact Form */}
            <AnimatedSection delay={0.2}>
              <div className="rounded-3xl bg-surface-50 p-8 sm:p-10 border border-surface-100">
                <h3 className="text-2xl font-bold text-surface-950 mb-8">
                  {isRtl ? 'أرسل رسالة' : locale === 'ru' ? 'Отправить сообщение' : 'Send a Message'}
                </h3>
                
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="h-16 w-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-surface-950 mb-2">
                      {isRtl ? 'تم الإرسال بنجاح' : 'Sent Successfully'}
                    </h4>
                    <p className="text-surface-500 text-sm">
                      {isRtl ? 'سنتواصل معك في أقرب وقت ممكن.' : 'We will get back to you shortly.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-surface-950 mb-2">
                        {isRtl ? 'الاسم الكامل' : locale === 'ru' ? 'Полное имя' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        placeholder={isRtl ? 'أدخل اسمك' : locale === 'ru' ? 'Введите имя' : 'Enter your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-surface-950 mb-2">
                        {isRtl ? 'البريد الإلكتروني' : locale === 'ru' ? 'Электронная почта' : 'Email'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        placeholder={isRtl ? 'أدخل بريدك' : locale === 'ru' ? 'Введите email' : 'Enter your email'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-surface-950 mb-2">
                        {isRtl ? 'الرسالة' : locale === 'ru' ? 'Сообщение' : 'Message'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none resize-none"
                        placeholder={isRtl ? 'اكتب رسالتك...' : locale === 'ru' ? 'Ваше сообщение...' : 'Your message...'}
                      />
                    </div>
                    
                    {status === 'error' && (
                      <p className="text-sm text-red-500 font-medium">
                        {isRtl ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.'}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-primary-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary-700 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {status === 'loading'
                          ? (isRtl ? 'جاري الإرسال...' : 'Sending...')
                          : (isRtl ? 'إرسال الرسالة' : locale === 'ru' ? 'Отправить' : 'Send Message')}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
