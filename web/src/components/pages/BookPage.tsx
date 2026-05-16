'use client';

import { useLocale } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Calendar, UserCheck, Stethoscope, CheckCircle2, ArrowRight, ArrowLeft, HeartPulse, Activity, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/i18n/navigation';

export default function BookPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    age: '',
    location: '',
    symptoms: '',
    hasMedicalTests: false,
    contactMethod: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (formData.preferredDate) {
      setLoadingSlots(true);
      fetch(`/api/available-slots?date=${formData.preferredDate}`)
        .then(res => res.json())
        .then(data => {
          if (data.availableSlots) {
            setAvailableSlots(data.availableSlots);
          }
        })
        .finally(() => setLoadingSlots(false));
      
      // Reset selected time when date changes
      setFormData(prev => ({ ...prev, preferredTime: '' }));
    }
  }, [formData.preferredDate]);

  const t = (ar: string, en: string, ru: string) => {
    if (locale === 'ar') return ar;
    if (locale === 'ru') return ru;
    return en;
  };

  const steps = [
    {
      icon: UserCheck,
      title: t('البيانات الأساسية', 'Basic Info', 'Основная инфо'),
    },
    {
      icon: Activity,
      title: t('الحالة الصحية', 'Condition', 'Состояние'),
    },
    {
      icon: Stethoscope,
      title: t('الاستشارة', 'Consultation', 'Консультация'),
    },
    {
      icon: Calendar,
      title: t('الموعد', 'Date', 'Дата'),
    },
    {
      icon: CheckCircle2,
      title: t('التأكيد', 'Confirm', 'Подтверждение'),
    },
  ];

  const contactMethods = [
    { id: 'WhatsApp', label: 'WhatsApp', icon: <svg className="h-7 w-7 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>, hoverClass: 'hover:border-[#25D366] hover:bg-[#25D366]/5' },
    { id: 'Telegram', label: 'Telegram', icon: <svg className="h-7 w-7 text-[#229ED9]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z" fill="#229ED9"/><path d="M5.228 11.88c4.34-1.89 7.234-3.136 8.68-3.738 4.136-1.722 4.994-2.02 5.548-2.03.122-.002.395.028.568.167.146.117.186.275.204.385.018.11.042.35.025.534-.19 2.062-1.01 6.818-1.428 8.986-.176.918-.51 1.222-.828 1.252-.693.065-1.22-.458-1.893-.896-1.05-.688-1.644-1.116-2.662-1.787-1.177-.775-.414-1.202.257-1.898.176-.182 3.23-2.96 3.288-3.212.008-.032.014-.15-.057-.213-.07-.063-.176-.042-.252-.025-.108.024-1.826 1.162-5.158 3.414-.488.337-.93.504-1.325.495-.436-.01-1.276-.247-1.898-.45-.765-.25-1.372-.382-1.32-.804.027-.22.32-.444.88-.673Z" fill="#fff"/></svg>, hoverClass: 'hover:border-[#229ED9] hover:bg-[#229ED9]/5' },
    { id: 'Max', label: 'Max', icon: <div className="h-7 w-7 flex items-center justify-center bg-[#FF5E00] text-white rounded-md font-black text-[10px]">MAX</div>, hoverClass: 'hover:border-[#FF5E00] hover:bg-[#FF5E00]/5' },
    { id: 'VK', label: 'VKontakte', icon: <svg className="h-7 w-7 text-[#0077FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z" fill="#0077FF"/><path d="M17.16 8h-1.65c-.3 0-.41.16-.48.33 0 0-1.04 2.5-2.52 4.15-.47.47-.68.62-.9.62-.11 0-.25-.15-.25-.49V8.58c0-.3-.08-.43-.33-.43H9.41c-.19 0-.3.14-.3.27 0 .28.42.34.46 1.13v3.42c0 .38-.07.45-.21.45-.4 0-1.37-2.52-1.95-5.4-.08-.26-.23-.42-.53-.42H5.23c-.35 0-.42.16-.42.33 0 .32.41 1.9 1.93 4.02 1.01 1.45 2.42 2.23 3.7 2.23 1.25 0 1.4-.28 1.4-.76v-1.74c0-.35.07-.42.33-.42.19 0 .52.09 1.29.83.88.88 1.03 1.28 1.56 1.28h1.65c.35 0 .53-.17.43-.51-.11-.34-.51-.83-1.04-1.42-.26-.31-.66-.66-.78-.85-.16-.21-.11-.3 0-.49.02-.01 1.4-1.97 1.57-2.67.08-.23-.01-.4-.36-.4Z" fill="#fff"/></svg>, hoverClass: 'hover:border-[#0077FF] hover:bg-[#0077FF]/5' },
    { id: 'Zoom', label: 'Zoom', icon: <svg className="h-7 w-7 text-[#2D8CFF]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z" fill="#2D8CFF"/><path d="M16.92 7.75c-.32-.15-.69-.02-.85.29l-1.97 3.55-7.7-4.14A1.066 1.066 0 0 0 5 8.39v7.22c0 .4.22.75.56.93.14.07.29.11.44.11.23 0 .46-.08.66-.23l7.63-5.69 1.77 3.23c.12.22.35.34.59.34.09 0 .18-.02.26-.06.32-.15.46-.53.31-.85L15.35 10l1.86-1.41c.25-.19.3-.55.11-.84-.13-.19-.4-.3-.6-.3Zm-10.92.64c0-.06.05-.11.11-.11.02 0 .04.01.05.02l7.04 3.79-7.2 5.37V8.39Zm10.02 4.54-1.22-.65-1.52-2.74L15 8.52l1.02 2.37-2.12 3.86 2.12 1.13Z" fill="#fff"/></svg>, hoverClass: 'hover:border-[#2D8CFF] hover:bg-[#2D8CFF]/5' },
    { id: 'Google Meet', label: 'Meet', icon: <svg className="h-7 w-7 text-[#00832D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z" fill="#fff" stroke="#e2e8f0"/><path d="M19.12 6.64l-1.44 1.4-1.19 1.19v5.54l1.19 1.19 1.75 1.5c.34.25.82.01.82-.41V6.95c0-.42-.48-.66-.82-.41l-.31.1Zm-4.32.86H7.8v9h7V7.5Zm-8 0H5v9h1.8v-9Z" fill="#00832D"/></svg>, hoverClass: 'hover:border-[#00832d] hover:bg-[#00832d]/5' },
  ];

  const consultationTypes = locale === 'ru' ? [
    'Гастроэнтерология',
    'Гепатология',
    'Эндоскопия',
    'Общая консультация'
  ] : isRtl ? [
    'أمراض الجهاز الهضمي',
    'أمراض الكبد',
    'مناظير المعدة والقولون',
    'استشارة عامة',
  ] : [
    'Gastroenterology',
    'Hepatology',
    'Endoscopy',
    'General',
  ];

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    return phoneRegex.test(phone.trim());
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.patientName || !formData.age || !formData.location) return;
      if (!validatePhone(formData.patientPhone)) {
        setPhoneError(t('الرجاء إدخال رقم هاتف صحيح', 'Valid phone required', 'Введите верный номер'));
        return;
      }
      setPhoneError('');
    }
    
    if (currentStep === 1 && !formData.symptoms) return;
    if (currentStep === 2 && (!formData.contactMethod || !formData.consultationType)) return;
    if (currentStep === 3 && (!formData.preferredDate)) return;
    
    if (currentStep === steps.length - 1) {
      submitBooking();
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const submitBooking = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: locale }),
      });

      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <AnimatedSection direction="up" className="text-center max-w-md w-full">
          <div className="h-24 w-24 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-surface-950 mb-4">
            {t('تم استلام طلبك بنجاح', 'Request Received', 'Заявка получена')}
          </h1>
          <p className="text-surface-500 mb-8 leading-relaxed">
            {t(
              'اطمئن، صحتك في أيدٍ أمينة. سيقوم الدكتور بمراجعة حالتك والتواصل معك قريباً لتأكيد الموعد.',
              'Rest assured. The doctor will review your case and contact you soon.',
              'Будьте спокойны. Врач рассмотрит вашу заявку и скоро свяжется с вами.'
            )}
          </p>
          {formData.hasMedicalTests && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-xl mb-8 flex items-start gap-3 text-sm text-start">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{t(
                'يرجى تجهيز صور الفحوصات الطبية السابقة لإرسالها للطبيب فور تواصله معك.',
                'Please have your medical tests ready to send when the doctor contacts you.',
                'Пожалуйста, подготовьте медицинские анализы для отправки, когда врач свяжется с вами.'
              )}</p>
            </div>
          )}
          <button onClick={() => router.push('/')} className="w-full py-4 rounded-xl bg-primary-600 text-white font-bold transition-all hover:bg-primary-700">
            {t('العودة للصفحة الرئيسية', 'Return Home', 'На главную')}
          </button>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      {/* Header */}
      <section className="py-12 text-center px-5">
        <AnimatedSection direction="up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight mb-4">
            {t('احجز استشارتك', 'Book Consultation', 'Запись на консультацию')}
          </h1>
          <p className="text-lg text-surface-500 font-medium max-w-xl mx-auto leading-relaxed">
            {t(
              'خطوات بسيطة لنفهم حالتك بشكل أفضل ونقدم لك الرعاية التي تستحقها.',
              'A few steps to help us understand your case.',
              'Несколько шагов, чтобы помочь нам понять ваш случай и оказать нужную помощь.'
            )}
          </p>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        
        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-100 -translate-y-1/2 rounded-full" />
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-primary-600 -translate-y-1/2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === currentStep;
              const isComplete = i < currentStep;
              return (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-4 border-white transition-all duration-500 ${isActive ? 'bg-primary-600 text-white shadow-elevated' : isComplete ? 'bg-emerald-500 text-white shadow-sm' : 'bg-surface-100 text-surface-400'}`}>
                    {isComplete ? <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" /> : <Icon className="h-4 w-4 md:h-5 md:w-5" />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
             {steps.map((step, i) => (
                <div key={i} className={`text-center w-20 md:w-24 -ml-4 first:ml-0 last:-mr-4 md:-ml-6 md:last:-mr-6 ${i === currentStep ? 'opacity-100 text-primary-600' : 'opacity-40 text-surface-950 hidden md:block'}`}>
                   <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">{step.title}</p>
                </div>
             ))}
          </div>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-3xl bg-surface-50 p-6 sm:p-10 border border-surface-100 shadow-sm"
          >
            {/* Step 0: Personal Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-950 mb-2">
                    {t('لنتعرف عليك أولاً 👋', 'Let\'s get to know you', 'Давайте познакомимся 👋')}
                  </h2>
                  <p className="text-surface-500 text-sm mb-6">
                    {t('بياناتك الأساسية تساعدنا في تنظيم ملفك الطبي.', 'Your basic info helps us organize your file.', 'Ваши базовые данные помогут нам организовать вашу карту.')}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-surface-950 mb-2">
                    {t('الاسم الكامل *', 'Full Name *', 'Полное имя *')}
                  </label>
                  <input type="text" value={formData.patientName} onChange={e => setFormData({ ...formData, patientName: e.target.value })} className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" placeholder={t('أدخل اسمك الكريم', 'Your full name', 'Ваше полное имя')} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-surface-950 mb-2">{t('العمر *', 'Age *', 'Возраст *')}</label>
                    <input type="number" min="1" max="120" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" placeholder={t('مثال: 35', 'e.g. 35', 'Напр. 35')} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-surface-950 mb-2">{t('المدينة *', 'City *', 'Город *')}</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" placeholder={t('اسم مدينتك', 'Your city', 'Ваш город')} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-surface-950 mb-2">
                    {t('رقم الهاتف (مفتاح الدولة يحدد دولتك) *', 'Phone Number (Code determines country) *', 'Номер телефона (код определяет страну) *')}
                  </label>
                  <input
                    type="tel"
                    value={formData.patientPhone}
                    onChange={e => {
                      const val = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '');
                      setFormData({ ...formData, patientPhone: val });
                      if (phoneError) setPhoneError('');
                    }}
                    className={`w-full rounded-xl border bg-white px-5 py-4 text-sm focus:ring-1 focus:outline-none ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-surface-200 focus:border-primary-500 focus:ring-primary-500'}`}
                    placeholder={t('مثال: 79001234567+', 'e.g. +79001234567', 'Напр. +79001234567')}
                    dir="ltr"
                  />
                  {phoneError && <p className="mt-2 text-xs font-bold text-red-500">{phoneError}</p>}
                </div>
              </div>
            )}

            {/* Step 1: Medical Condition */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-950 mb-2">
                    {t('كيف تشعر؟ نحن هنا للاستماع 🩺', 'How do you feel?', 'Как вы себя чувствуете? 🩺')}
                  </h2>
                  <p className="text-surface-500 text-sm mb-6">
                    {t('وصفك الدقيق يساعد الطبيب في فهم حالتك.', 'Your description helps the doctor prepare.', 'Ваше описание поможет врачу подготовиться.')}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-surface-950 mb-2">
                    {t('أين الألم؟ وما هي الأعراض التي تعاني منها؟ *', 'Symptoms and Pain Location *', 'Симптомы и место боли *')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.symptoms}
                    onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
                    className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none resize-none"
                    placeholder={t('اشرح ما تشعر به بالتفصيل...', 'Describe what you feel...', 'Опишите ваши ощущения в деталях...')}
                  />
                </div>

                <div className="bg-white p-5 rounded-2xl border border-surface-200">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <div className="relative flex items-center justify-center mt-1">
                      <input 
                        type="checkbox" 
                        checked={formData.hasMedicalTests}
                        onChange={e => setFormData({ ...formData, hasMedicalTests: e.target.checked })}
                        className="peer sr-only"
                      />
                      <div className="h-6 w-6 rounded border-2 border-surface-300 bg-surface-50 peer-checked:border-primary-600 peer-checked:bg-primary-600 transition-all flex items-center justify-center">
                        <CheckCircle2 className={`h-4 w-4 text-white transition-opacity ${formData.hasMedicalTests ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-surface-950">
                        {t('لدي فحوصات طبية سابقة أو تقارير', 'I have previous medical tests/reports', 'У меня есть предыдущие анализы/заключения')}
                      </span>
                      <span className="block text-xs text-surface-500 mt-1">
                        {t('سيطلبها منك الطبيب لاحقاً لمراجعتها.', 'The doctor will request them later.', 'Врач запросит их позже для ознакомления.')}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Consultation & Contact */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-surface-950 mb-2">
                    {t('نوع الاستشارة وطريقة التواصل 📱', 'Consultation & Contact', 'Тип консультации и связь 📱')}
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-bold text-surface-950 mb-3">
                    {t('القسم الطبي المختص *', 'Medical Department *', 'Медицинское отделение *')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {consultationTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, consultationType: type })}
                        className={`p-4 rounded-xl border-2 text-start font-bold transition-all ${formData.consultationType === type ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-sm' : 'border-surface-200 bg-white text-surface-700 hover:border-primary-300'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-bold text-surface-950 mb-3">
                    {t('كيف تفضل أن يتواصل معك الطبيب؟ *', 'Preferred Contact Method? *', 'Как вы предпочитаете связаться с врачом? *')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {contactMethods.map(method => {
                      const isSelected = formData.contactMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${isSelected ? 'border-surface-950 bg-white shadow-md scale-[1.02]' : `border-surface-200 bg-white text-surface-600 ${method.hoverClass}`}`}
                        >
                          {method.icon}
                          <span className={`text-sm font-bold ${isSelected ? 'text-surface-950' : ''}`}>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-950 mb-2">
                    {t('متى تفضل الموعد؟ 📅', 'When do you prefer?', 'Когда вам удобно? 📅')}
                  </h2>
                  <p className="text-surface-500 text-sm mb-6">
                    {t('هذا موعد مبدئي وسيتم تأكيده معك.', 'This is a preliminary request.', 'Это предварительный запрос.')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-surface-950 mb-2">
                    {t('التاريخ المفضل *', 'Preferred Date *', 'Желаемая дата *')}
                  </label>
                  <input type="date" min={new Date().toISOString().split('T')[0]} value={formData.preferredDate} onChange={e => setFormData({ ...formData, preferredDate: e.target.value })} className="w-full rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
                </div>
                {formData.preferredDate && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-bold text-surface-950 mb-2">
                      {t('الوقت المفضل *', 'Preferred Time *', 'Желаемое время *')}
                    </label>
                    {loadingSlots ? (
                      <p className="text-sm text-surface-400 py-4">
                        {t('جاري البحث عن المواعيد المتاحة...', 'Loading available slots...', 'Поиск доступных окон...')}
                      </p>
                    ) : availableSlots.length === 0 ? (
                      <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-sm font-bold">
                        {t('عذراً، لا توجد مواعيد متاحة في هذا اليوم. يرجى اختيار يوم آخر.', 'Sorry, no available slots on this day.', 'Извините, на этот день нет свободного времени. Пожалуйста, выберите другую дату.')}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3">
                        {availableSlots.map(time => (
                          <button
                            key={time}
                            onClick={() => setFormData({ ...formData, preferredTime: time })}
                            className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.preferredTime === time ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-sm' : 'border-surface-200 bg-white text-surface-700 hover:border-primary-300'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-950 mb-2">
                    {t('مراجعة أخيرة للطلب ✅', 'Final Review', 'Финальная проверка ✅')}
                  </h2>
                  <p className="text-surface-500 text-sm">
                    {t('تأكد من صحة بياناتك قبل الإرسال.', 'Ensure your data is correct.', 'Убедитесь в правильности ваших данных.')}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-surface-50">
                    <span className="text-surface-500">{t('المريض:', 'Patient:', 'Пациент:')}</span>
                    <span className="font-bold text-surface-950">{formData.patientName} ({formData.age} {t('سنة', 'yrs', 'лет')})</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-surface-50">
                    <span className="text-surface-500">{t('التواصل:', 'Contact:', 'Связь:')}</span>
                    <div className={isRtl ? 'text-end' : 'text-right'}>
                      <span className="font-bold text-surface-950 block" dir="ltr">{formData.patientPhone}</span>
                      <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md mt-1 inline-block">{formData.contactMethod}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-surface-50">
                    <span className="text-surface-500">{t('الاستشارة:', 'Consultation:', 'Консультация:')}</span>
                    <span className={`font-bold text-surface-950 w-1/2 ${isRtl ? 'text-end' : 'text-right'}`}>{formData.consultationType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-500">{t('الموعد المفضل:', 'Preferred Date:', 'Желаемая дата:')}</span>
                    <span className="font-bold text-surface-950">{formData.preferredDate} {formData.preferredTime}</span>
                  </div>
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-500 font-bold text-center bg-red-50 p-3 rounded-lg">
                    {t('عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'An error occurred. Please try again.', 'Произошла ошибка. Пожалуйста, попробуйте еще раз.')}
                  </p>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-surface-200">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all ${
                  currentStep === 0 ? 'text-surface-300 pointer-events-none' : 'text-surface-600 hover:text-primary-600'
                }`}
              >
                {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                {t('رجوع', 'Back', 'Назад')}
              </button>

              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 0 && (!formData.patientName || !formData.age || !formData.location || !formData.patientPhone)) ||
                  (currentStep === 1 && !formData.symptoms) ||
                  (currentStep === 2 && (!formData.contactMethod || !formData.consultationType)) ||
                  (currentStep === 3 && (!formData.preferredDate)) ||
                  status === 'loading'
                }
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary-600 text-white text-sm font-bold shadow-md transition-all hover:bg-primary-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === 'loading' ? t('جاري الإرسال...', 'Sending...', 'Отправка...') : (currentStep === steps.length - 1 ? t('تأكيد الحجز الآن', 'Confirm', 'Подтвердить') : t('متابعة', 'Continue', 'Продолжить'))}
                {status !== 'loading' && (isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />)}
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
