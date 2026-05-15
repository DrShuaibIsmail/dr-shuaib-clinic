# 11. التصميم وPWA والأداء | Design, PWA & Performance

---

## الهوية البصرية

```
الألوان:
  Primary:    #1B4F72  (أزرق داكن طبي)
  Secondary:  #2E86C1  (أزرق متوسط)
  Accent:     #17A589  (أخضر طبي)
  Background: #F8FAFC  (أبيض مائل رمادي)
  Dark Mode:  #0F172A  (داكن ناعم)

الخطوط:
  العربية:   Noto Naskh Arabic + Cairo
  English:   Playfair Display + Inter
  Русский:   Noto Serif + PT Sans

الأسلوب: Luxury Medical — نظيف، فاخر، يوحي بالثقة
الحركة:  Framer Motion — انتقالات ناعمة
البطاقات: زوايا 16px، ظلال خفيفة
الأيقونات: Lucide Icons
```

## دعم RTL/LTR
```
العربية: RTL تلقائي
الإنجليزية والروسية: LTR
تبديل تلقائي بناءً على locale
```

---

## PWA

```json
{
  "name": "د. شعيب المسعودي — استشارات طبية",
  "short_name": "Dr. Massoudi",
  "start_url": "/ar",
  "display": "standalone",
  "theme_color": "#1B4F72"
}
```

- قابل للتثبيت على الجوال
- عمل offline للصفحات الثابتة
- Core Web Vitals محسّن

---

## الأداء

```
LCP: < 2.5 ثانية
FID: < 100ms
CLS: < 0.1
Lighthouse: 90+

تحسينات: next/image, font subsetting, SSG, ISR, bundle splitting
```

---

# 12. هيكل المشروع | Project Structure

```
dr-massoudi/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx           # الرئيسية
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── book/              # حجز موعد
│   │   │   ├── register/          # تسجيل مريض جديد
│   │   │   ├── patient/           # بوابة المريض
│   │   │   ├── contact/
│   │   │   └── faq/
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/
│   │   │   ├── appointments/
│   │   │   ├── cards/
│   │   │   ├── register/
│   │   │   ├── files/
│   │   │   ├── promotions/
│   │   │   ├── admin/
│   │   │   └── webhooks/
│   │   └── admin/                 # لوحة التحكم
│   │       ├── page.tsx           # Dashboard
│   │       ├── schedule/
│   │       ├── appointments/
│   │       ├── patients/
│   │       ├── registrations/
│   │       ├── cards/
│   │       ├── promotions/
│   │       └── settings/
│   ├── components/
│   │   ├── ui/                    # shadcn
│   │   ├── booking/
│   │   ├── admin/
│   │   ├── cards/
│   │   └── shared/
│   ├── lib/
│   │   ├── db/                    # Drizzle schema
│   │   ├── telegram/
│   │   ├── auth/
│   │   ├── cards/                 # Card generation logic
│   │   └── validations/
│   ├── hooks/
│   └── messages/                  # i18n
│       ├── ar.json
│       ├── en.json
│       └── ru.json
├── public/
│   ├── fonts/
│   ├── images/
│   ├── manifest.json
│   └── icons/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

# 13. مراحل التطوير | Development Phases

### المرحلة 1 — الأساس (أسبوع 1-2)
```
- إعداد Next.js + TypeScript + Tailwind + shadcn/ui
- قاعدة البيانات (Neon.tech) + Drizzle ORM + كل الجداول
- نظام المصادقة (Admin login)
- i18n (ar/en/ru) + RTL/LTR
- نظام الألوان والخطوط
```

### المرحلة 2 — الموقع العام (أسبوع 2-3)
```
- الصفحة الرئيسية (Hero, Stats, Services, CTA)
- صفحة عن الطبيب
- صفحة الخدمات
- صفحة التواصل + FAQ
- Navigation + Footer
- بانر العرض المجاني (الهيكل)
```

### المرحلة 3 — نظام المرضى (أسبوع 3-4)
```
- صفحة تسجيل مريض جديد
- نظام المراجعة (Admin يقبل/يرفض)
- تسجيل دخول المريض (OTP)
- بوابة المريض
- رفع الملفات الطبية
```

### المرحلة 4 — نظام الحجز + البطاقات (أسبوع 4-5)
```
- نظام توليد البطاقات/الأكواد
- لوحة إدارة البطاقات
- التقويم وحساب المواعيد (مع timezone)
- Booking Wizard (6 خطوات مع إدخال الكود)
- نظام العروض المجانية
```

### المرحلة 5 — لوحة التحكم (أسبوع 5-6)
```
- Dashboard الإحصائيات
- إدارة جدول العمل
- إدارة الحجوزات + الدفع
- إدارة المرضى + طلبات التسجيل
- إحصائيات البطاقات
- الإعدادات
```

### المرحلة 6 — الإشعارات والإطلاق (أسبوع 6-7)
```
- إشعارات تيليغرام
- إيميل التأكيد (Resend)
- PWA + SEO + Schema.org
- Testing (Vitest + Playwright)
- Deployment (Vercel)
```

---

# 14. المكوّنات الرئيسية

```
<LanguageSwitcher />        تبديل اللغة
<PromoBanner />             بانر العرض المجاني
<CalendarPicker />          تقويم تفاعلي مع timezone
<TimeSlotGrid />            شبكة الأوقات
<BookingWizard />           حجز متعدد الخطوات
<CardCodeInput />           إدخال كود البطاقة
<CardGenerator />           توليد بطاقات (Admin)
<CardStatsPanel />          إحصائيات البطاقات
<AppointmentCard />         بطاقة موعد
<PatientCard />             بطاقة مريض
<RegistrationCard />        طلب تسجيل (قبول/رفض)
<WeeklyScheduleEditor />    محرر جدول الأسبوع
<FileUploader />            رفع ملفات طبية
<OTPInput />                إدخال OTP
<PhoneInput />              رقم هاتف دولي
<StatusBadge />             حالة الحجز/الدفع
<DashboardStats />          بطاقات الإحصائيات
<ConfirmDialog />           نافذة تأكيد
<TimezoneDisplay />         عرض التوقيتين
```

---

# 15. متغيرات البيئة

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://dr-massoudi.com
TELEGRAM_BOT_TOKEN=...
DOCTOR_TELEGRAM_ID=...
RESEND_API_KEY=...
FROM_EMAIL=noreply@dr-massoudi.com
CARD_ENCRYPTION_KEY=...          # مفتاح تشفير الأكواد
ADMIN_URL=https://dr-massoudi.com
NODE_ENV=production
```

---

# 16. ملاحظات المطوّر

1. **البطاقات:** استخدم `crypto.randomBytes` لتوليد أكواد آمنة غير قابلة للتخمين
2. **التوقيتات:** خزّن UTC في DB، حوّل للعرض بتوقيت المريض
3. **Double-booking:** استخدم DB transactions مع SELECT FOR UPDATE
4. **OTP:** Telegram أولاً (مجاني) ثم SMS احتياطي
5. **Telegram:** Webhook وليس polling في الإنتاج
6. **Admin URL:** أخفها بمسار مخصص

---

**انتهت الخطة | End of Plan v2.0**
