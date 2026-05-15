# خطة مشروع موقع د. شعيب المسعودي — وثيقة المشروع الكاملة
## Dr. Shuaib Al-Massoudi — Full Project Specification Document
> **الإصدار:** 1.0 | **تاريخ الإنشاء:** مايو 2026 | **الحالة:** جاهز للتطوير

---

## 1. نظرة عامة على المشروع | Project Overview

**اسم المشروع:** موقع استشارات طبية متعدد اللغات — د. شعيب المسعودي  
**الطبيب:** دكتور شعيب علي حسن إسماعيل — طبيب عام  
**الهدف الرئيسي:** منصة احترافية لحجز الاستشارات الطبية الأونلاين حصرياً للمرضى السابقين، مع لوحة تحكم للطبيب وإشعارات فورية على تيليغرام.

**السيرة الذاتية للطبيب:**
طبيب عام – يعمل في قسم الباطنية، ويُتابع تخصصه في أمراض الجهاز الهضمي والكبد والمناظير.
تخرج الدكتور شعيب علي حسن إسماعيل من كلية الطب البشري، ويمتلك خبرة سريرية تمتد لعامين في مجال الطب العام، حيث ساهم في تشخيص وعلاج مجموعة واسعة من الحالات المرضية وفق المعايير الطبية المعتمدة.
بدأ مسيرته المهنية خلال فترة الامتياز (مرحلة التدريب العملي)، حيث عمل متطوعًا في المجال الطبي لمدة عامين، مشاركًا في تقديم الرعاية الصحية للمرضى، وقد حاز على تكريم تقديرًا لجهوده والتزامه الإنساني.
يعمل حاليًا في قسم الباطنية، إلى جانب متابعته لتخصصه في أمراض الجهاز الهضمي والكبد والمناظير، ساعيًا إلى تطوير مهاراته السريرية والعلمية.
كما يحرص على المشاركة المستمرة في المؤتمرات والمنتديات الطبية، بهدف مواكبة أحدث المستجدات في المجال الطبي وتعزيز خبراته المهنية.
يكرّس الدكتور شعيب جهوده لتقديم رعاية طبية متكاملة، قائمة على الدقة المهنية والالتزام الأخلاقي، مع اهتمام خاص بتلبية احتياجات المرضى وتحقيق أفضل النتائج العلاجية.

**اللغات المدعومة:**
- العربية (RTL) — اللغة الافتراضية
- الإنجليزية (LTR)
- الروسية (LTR)

**متطلبات جوهرية:**
- الاستشارات متاحة فقط للمرضى المسجّلين مسبقاً (لا تسجيل جديد)
- الطبيب يتحكم بمواعيد عمله من لوحة تحكم بسيطة
- إشعار تيليغرام فوري عند كل حجز
- متجاوب 100% مع الجوال والسطح المكتب
- قابل للتحويل لتطبيق موبايل مستقبلاً (PWA → React Native)

---

## 2. المكدس التقني | Tech Stack (2026)

### Frontend
```
Framework:     Next.js 15 (App Router + React Server Components)
Language:      TypeScript 5.x
Styling:       Tailwind CSS v4 + shadcn/ui v2
Animations:    Framer Motion 11 + GSAP 3
i18n:          next-intl 3.x (دعم RTL/LTR تلقائي)
State:         Zustand 5 + TanStack Query v5
Forms:         React Hook Form + Zod validation
PWA:           next-pwa (Workbox 8) — جاهز للتحويل لتطبيق
```

### Backend
```
Runtime:       Node.js 22 LTS
Framework:     Hono.js (edge-ready, سريع جداً) أو Next.js API Routes
Database:      PostgreSQL 16 + Drizzle ORM
Cache:         Redis 7 (Upstash)
Auth:          NextAuth.js v5 (Auth.js) — JWT + Sessions
File Storage:  Cloudflare R2
Email:         Resend
```

### الإشعارات | Notifications
```
Telegram Bot:  Grammy.js (أحدث مكتبة Telegram Bot بـ TypeScript)
Notifications: Telegram Bot API v7
```

### DevOps & Hosting
```
Hosting:       Vercel (Frontend + API) أو Cloudflare Workers
Database:      Neon.tech (PostgreSQL serverless) أو Supabase
CI/CD:         GitHub Actions
Monitoring:    Sentry + Vercel Analytics
Domain:        Namecheap أو Cloudflare Domains
SSL:           تلقائي (Let's Encrypt)
```

### أدوات التطوير
```
Package Manager: pnpm 9
Linting:         ESLint 9 + Prettier 3
Testing:         Vitest + Playwright
Git Hooks:       Husky + lint-staged
```

---

## 3. هيكل المشروع | Project Structure

```
dr-massoudi/
├── apps/
│   ├── web/                        # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── [locale]/       # i18n routing
│   │   │   │   │   ├── page.tsx    # الصفحة الرئيسية
│   │   │   │   │   ├── about/      # عن الطبيب
│   │   │   │   │   ├── book/       # حجز موعد
│   │   │   │   │   ├── patient/    # بوابة المريض
│   │   │   │   │   └── contact/    # تواصل معنا
│   │   │   │   ├── api/            # API Routes
│   │   │   │   └── admin/          # لوحة التحكم (no locale)
│   │   │   ├── components/
│   │   │   │   ├── ui/             # shadcn components
│   │   │   │   ├── booking/        # مكونات الحجز
│   │   │   │   ├── admin/          # مكونات اللوحة
│   │   │   │   └── shared/         # مشتركة
│   │   │   ├── lib/
│   │   │   │   ├── db/             # Drizzle schema
│   │   │   │   ├── telegram/       # Grammy.js bot
│   │   │   │   ├── auth/           # Auth.js config
│   │   │   │   └── validations/    # Zod schemas
│   │   │   ├── hooks/              # Custom React Hooks
│   │   │   ├── stores/             # Zustand stores
│   │   │   └── messages/           # ملفات الترجمة
│   │   │       ├── ar.json
│   │   │       ├── en.json
│   │   │       └── ru.json
│   │   ├── public/
│   │   │   ├── fonts/
│   │   │   ├── images/
│   │   │   ├── manifest.json       # PWA Manifest
│   │   │   └── icons/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── bot/                        # Telegram Bot (اختياري كـ service منفصل)
│       ├── src/
│       │   ├── bot.ts
│       │   ├── handlers/
│       │   └── keyboards/
│       └── package.json
│
├── packages/
│   ├── types/                      # TypeScript shared types
│   └── utils/                      # Shared utilities
│
├── docker-compose.yml              # للتطوير المحلي
└── turbo.json                      # Turborepo config
```

---

## 4. قاعدة البيانات | Database Schema (Drizzle ORM)

```typescript
// lib/db/schema.ts

// جدول المرضى (يُنشئه الطبيب فقط — لا تسجيل ذاتي)
export const patients = pgTable('patients', {
  id:          uuid('id').primaryKey().defaultRandom(),
  name:        varchar('name', { length: 255 }).notNull(),
  nameAr:      varchar('name_ar', { length: 255 }),
  phone:       varchar('phone', { length: 50 }).unique(),
  email:       varchar('email', { length: 255 }).unique(),
  telegramId:  varchar('telegram_id', { length: 100 }),
  preferredLang: varchar('preferred_lang', { length: 5 }).default('ar'),
  notes:       text('notes'),                    // ملاحظات خاصة بالطبيب
  isActive:    boolean('is_active').default(true),
  createdAt:   timestamp('created_at').defaultNow(),
  updatedAt:   timestamp('updated_at').defaultNow(),
});

// جدول مواعيد العمل (الطبيب يتحكم بها)
export const workingHours = pgTable('working_hours', {
  id:          uuid('id').primaryKey().defaultRandom(),
  dayOfWeek:   integer('day_of_week').notNull(), // 0=الأحد ... 6=السبت
  startTime:   time('start_time').notNull(),
  endTime:     time('end_time').notNull(),
  isActive:    boolean('is_active').default(true),
  timezone:    varchar('timezone', { length: 100 }).default('Europe/Moscow'),
});

// جدول الاستثناءات (أيام إجازة أو تعديل)
export const scheduleExceptions = pgTable('schedule_exceptions', {
  id:          uuid('id').primaryKey().defaultRandom(),
  date:        date('date').notNull(),           // تاريخ محدد
  type:        varchar('type', { length: 20 }).notNull(), // 'off' | 'custom'
  startTime:   time('start_time'),               // إذا كان custom
  endTime:     time('end_time'),
  note:        text('note'),
});

// جدول الحجوزات
export const appointments = pgTable('appointments', {
  id:            uuid('id').primaryKey().defaultRandom(),
  patientId:     uuid('patient_id').references(() => patients.id).notNull(),
  date:          date('date').notNull(),
  startTime:     time('start_time').notNull(),
  endTime:       time('end_time').notNull(),
  duration:      integer('duration').default(30),    // بالدقائق
  status:        varchar('status', { length: 20 }).default('pending'),
                 // 'pending' | 'confirmed' | 'cancelled' | 'completed'
  type:          varchar('type', { length: 30 }).default('online'),
                 // 'online' | 'phone'
  meetLink:      text('meet_link'),              // Google Meet أو Jitsi
  patientNotes:  text('patient_notes'),          // ملاحظات المريض
  doctorNotes:   text('doctor_notes'),           // ملاحظات الطبيب (خاصة)
  cancelReason:  text('cancel_reason'),
  telegramNotified: boolean('telegram_notified').default(false),
  createdAt:     timestamp('created_at').defaultNow(),
  updatedAt:     timestamp('updated_at').defaultNow(),
});

// جدول إعدادات الموقع (الطبيب يعدّلها)
export const siteSettings = pgTable('site_settings', {
  key:   varchar('key', { length: 100 }).primaryKey(),
  value: jsonb('value'),
  // مثال:
  // { key: 'consultation_duration', value: 30 }
  // { key: 'booking_notice_hours', value: 24 }  // أقل مدة قبل الحجز
  // { key: 'max_advance_days', value: 30 }       // أقصى أيام للحجز مقدماً
  // { key: 'telegram_notifications', value: true }
  // { key: 'slot_interval', value: 30 }           // مدة كل فترة
});

// جدول المشرف (الطبيب)
export const admins = pgTable('admins', {
  id:           uuid('id').primaryKey().defaultRandom(),
  email:        varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name:         varchar('name', { length: 255 }),
  telegramId:   varchar('telegram_id', { length: 100 }), // لاستقبال الإشعارات
  createdAt:    timestamp('created_at').defaultNow(),
});
```

---

## 5. صفحات الموقع | Pages & Routing

### الموقع العام (Public)

```
/[locale]/                  الصفحة الرئيسية (Landing Page)
/[locale]/about             عن الطبيب
/[locale]/services          الخدمات والتخصص
/[locale]/book              حجز موعد (للمرضى السابقين)
/[locale]/patient           بوابة المريض (تسجيل دخول + مواعيدي)
/[locale]/contact           تواصل معنا
/[locale]/faq               الأسئلة الشائعة
```

### لوحة التحكم (Admin — /admin/*)
```
/admin                      لوحة التحكم الرئيسية (Dashboard)
/admin/schedule             إدارة مواعيد العمل
/admin/appointments         قائمة الحجوزات
/admin/patients             إدارة المرضى
/admin/patients/[id]        ملف مريض
/admin/patients/new         إضافة مريض جديد
/admin/settings             الإعدادات العامة
```

---

## 6. تفصيل كل صفحة | Detailed Page Specs

### 6.1 الصفحة الرئيسية (Landing Page)

**الأقسام بالترتيب:**
1. **Hero Section** — صورة احترافية للطبيب، عنوان رئيسي بـ 3 لغات، زر "احجز موعدك الآن"
2. **Quick Stats** — عدد سنوات الخبرة، عدد المرضى، التخصص، اللغات
3. **About Snippet** — مقدمة قصيرة + رابط "اقرأ أكثر"
4. **Specializations** — بطاقات التخصصات الطبية مع أيقونات
5. **How It Works** — خطوات الحجز (3 خطوات بصورة بسيطة)
6. **Testimonials** — آراء المرضى (اختياري)
7. **Availability Banner** — "متاح الآن للاستشارات" أو وقت الموعد القادم
8. **CTA Final** — زر حجز نهائي + بيانات التواصل
9. **Footer** — الروابط، اللغات، حقوق النشر

**مميزات تقنية:**
- Lazy loading للصور
- Skeleton loading للمحتوى الديناميكي
- SEO metadata بـ 3 لغات (og:tags, meta description)
- Schema.org markup للطبيب (Physician schema)

### 6.2 صفحة الحجز (Booking Page)

**خطوات الحجز (Wizard — خطوة بخطوة):**

```
الخطوة 1: التحقق من الهوية
├── إدخال رقم الهاتف أو الإيميل
├── التحقق من وجود المريض في القاعدة
├── إرسال OTP (SMS أو Telegram)
└── رسالة خطأ: "عذراً، لا يمكن الحجز إلا للمرضى السابقين"

الخطوة 2: اختيار التاريخ
├── تقويم تفاعلي يعرض فقط الأيام المتاحة
├── الأيام المغلقة (إجازات، عطل) تكون رمادية غير قابلة للنقر
└── عرض منطقة وقت المريض مقارنةً بتوقيت موسكو

الخطوة 3: اختيار الوقت
├── عرض الفترات المتاحة للتاريخ المحدد
├── الفترات المحجوزة تكون غير متاحة
└── عرض مدة الاستشارة (مثلاً 30 دقيقة)

الخطوة 4: تأكيد البيانات
├── ملاحظات للطبيب (اختياري)
├── تلخيص الموعد (التاريخ، الوقت، المدة)
└── زر "تأكيد الحجز"

الخطوة 5: التأكيد النهائي
├── رسالة نجاح
├── إرسال تفاصيل الموعد لإيميل المريض
└── إشعار تيليغرام للطبيب فوراً
```

### 6.3 بوابة المريض (Patient Portal)

```
تسجيل الدخول: رقم هاتف + OTP
├── مواعيدي القادمة (مع رابط الاجتماع)
├── مواعيدي السابقة
├── إلغاء موعد (قبل X ساعة على الأقل)
└── طلب تغيير موعد
```

---

## 7. لوحة التحكم | Admin Dashboard

### 7.1 الصفحة الرئيسية (Dashboard)

```
بطاقات إحصائيات سريعة:
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  مواعيد اليوم  │ مواعيد الأسبوع  │  إجمالي المرضى  │   في الانتظار   │
│       3         │       12        │       87         │        2        │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

جدول اليوم: عرض ساعة بساعة
قائمة آخر الحجوزات
إشعارات سريعة
```

### 7.2 إدارة جدول العمل (Schedule Manager)

**هذه أهم صفحة في اللوحة — سهلة الاستخدام جداً:**

```
طريقة العرض: جدول أسبوعي تفاعلي

الأحد   | الاثنين  | الثلاثاء | الأربعاء | الخميس  | الجمعة  | السبت
09:00   | 09:00   | مغلق    | 10:00   | 09:00   | مغلق   | مغلق
  |       |           |           |           |         |
17:00   | 15:00   |           | 18:00   | 17:00   |         |

أزرار سريعة:
[ + إضافة يوم عمل ]  [ إضافة إجازة ]  [ نسخ الأسبوع ]

إدارة الاستثناءات:
- إضافة يوم إجازة محدد (مع سبب)
- تعديل ساعات يوم محدد
- إجازة متعددة الأيام

إعدادات عامة:
- مدة الاستشارة: [30] دقيقة
- الحد الأدنى قبل الحجز: [24] ساعة
- الحد الأقصى للحجز المسبق: [30] يوم
- منطقة التوقيت: [Europe/Moscow]
```

### 7.3 إدارة الحجوزات

```
فلاتر:
[ الكل ] [ اليوم ] [ هذا الأسبوع ] [ قيد الانتظار ] [ مؤكد ] [ ملغى ]

جدول:
المريض | التاريخ | الوقت | الحالة | الإجراءات
──────────────────────────────────────────────
أحمد م.  | 05 مايو | 10:00 | ✅ مؤكد  | [عرض] [ألغِ] [رابط Meet]
فاطمة ع. | 06 مايو | 14:00 | ⏳ انتظار | [تأكيد] [ألغِ]

عند النقر على حجز:
- تفاصيل كاملة
- ملاحظات المريض
- حقل ملاحظات الطبيب الخاصة
- رابط اجتماع Google Meet
- زر إرسال تذكير للمريض
```

### 7.4 إدارة المرضى

```
قائمة المرضى مع بحث وفلترة

إضافة مريض جديد:
┌────────────────────────────────────────────────┐
│ الاسم (عربي)    [                            ] │
│ الاسم (انجليزي) [                            ] │
│ رقم الهاتف      [                            ] │
│ البريد الإلكتروني [                          ] │
│ تيليغرام (اختياري) [                         ] │
│ اللغة المفضلة   [ العربية ▼ ]                │
│ ملاحظات طبية    [                            ] │
│                                                │
│           [ حفظ المريض ]                      │
└────────────────────────────────────────────────┘

ملف المريض يتضمن:
- معلوماته الشخصية
- سجل مواعيده الكاملة
- ملاحظات الطبيب
- زر "حجز موعد له"
```

---

## 8. نظام تيليغرام | Telegram Notification System

### إعداد البوت

```typescript
// lib/telegram/bot.ts
import { Bot, InlineKeyboard } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

// دالة إرسال إشعار حجز جديد للطبيب
export async function notifyDoctorNewBooking(appointment: AppointmentDetails) {
  const keyboard = new InlineKeyboard()
    .text('✅ تأكيد الحجز', `confirm_${appointment.id}`)
    .text('❌ إلغاء الحجز', `cancel_${appointment.id}`);

  const message = `
🔔 **حجز جديد!**

👤 المريض: ${appointment.patientName}
📅 التاريخ: ${appointment.date}
⏰ الوقت: ${appointment.time} (موسكو)
📝 ملاحظات: ${appointment.notes || 'لا توجد'}

[عرض في لوحة التحكم](${process.env.ADMIN_URL}/admin/appointments/${appointment.id})
  `;

  await bot.api.sendMessage(
    process.env.DOCTOR_TELEGRAM_ID!,
    message,
    { 
      parse_mode: 'Markdown',
      reply_markup: keyboard
    }
  );
}

// إشعار تأكيد/إلغاء للمريض (إذا عنده تيليغرام)
export async function notifyPatient(
  telegramId: string,
  message: string,
  lang: 'ar' | 'en' | 'ru'
) {
  await bot.api.sendMessage(telegramId, message, { parse_mode: 'Markdown' });
}

// معالجة أزرار التأكيد/الإلغاء من تيليغرام
bot.callbackQuery(/^confirm_(.+)$/, async (ctx) => {
  const appointmentId = ctx.match[1];
  // تحديث الحجز في قاعدة البيانات
  // إشعار المريض بالتأكيد
  await ctx.answerCallbackQuery('✅ تم تأكيد الحجز');
  await ctx.editMessageText('✅ تم تأكيد هذا الحجز');
});

bot.callbackQuery(/^cancel_(.+)$/, async (ctx) => {
  // طلب سبب الإلغاء
  await ctx.answerCallbackQuery();
  await ctx.reply('يرجى كتابة سبب الإلغاء:');
});
```

### سيناريوهات الإشعارات

| الحدث | المستلم | القناة |
|-------|---------|--------|
| حجز جديد | الطبيب | تيليغرام + Dashboard |
| تأكيد حجز | المريض | إيميل + تيليغرام (إن وجد) |
| إلغاء من الطبيب | المريض | إيميل + تيليغرام |
| تذكير (24 ساعة قبل) | المريض | إيميل + تيليغرام |
| تذكير (1 ساعة قبل) | الطبيب + المريض | تيليغرام |

---

## 9. نظام المصادقة | Authentication

### المرضى
```
طريقة الدخول: رقم الهاتف + OTP (4-6 أرقام)
مصدر OTP: Telegram أو SMS (Twilio/سمسة)
المدة: الجلسة تنتهي بعد 7 أيام
```

### الطبيب (Admin)
```
طريقة الدخول: إيميل + كلمة مرور قوية
2FA اختياري: عبر تيليغرام
الجلسة: 30 يوم
حماية: Rate limiting، CSRF protection، Helmet.js headers
```

### الحماية الإضافية
```typescript
// middleware.ts
export const config = {
  matcher: ['/admin/:path*', '/patient/:path*', '/api/booking/:path*']
};

// التحقق من أن المريض موجود في القاعدة قبل السماح بالحجز
async function verifyPatientExists(identifier: string) {
  const patient = await db.query.patients.findFirst({
    where: or(
      eq(patients.phone, identifier),
      eq(patients.email, identifier)
    )
  });
  if (!patient) throw new Error('PATIENT_NOT_FOUND');
  return patient;
}
```

---

## 10. API Endpoints

### Public API
```
GET  /api/availability?date=YYYY-MM-DD    جلب الأوقات المتاحة
POST /api/auth/verify-patient             التحقق من المريض (phone/email)
POST /api/auth/send-otp                   إرسال OTP
POST /api/auth/verify-otp                 التحقق من OTP
GET  /api/appointments/my                 مواعيدي (محمي)
POST /api/appointments/book               حجز موعد (محمي)
PUT  /api/appointments/:id/cancel         إلغاء موعد (محمي)
```

### Admin API (محمية بـ admin session)
```
GET  /api/admin/dashboard/stats           إحصائيات اللوحة
GET  /api/admin/appointments              قائمة الحجوزات
PUT  /api/admin/appointments/:id          تعديل حجز
POST /api/admin/schedule                  حفظ جدول العمل
GET  /api/admin/schedule                  جلب جدول العمل
POST /api/admin/schedule/exception        إضافة استثناء
GET  /api/admin/patients                  قائمة المرضى
POST /api/admin/patients                  إضافة مريض
PUT  /api/admin/patients/:id              تعديل مريض
GET  /api/admin/settings                  الإعدادات
PUT  /api/admin/settings                  حفظ الإعدادات
POST /api/admin/telegram/test             اختبار الإشعار
```

### Webhooks
```
POST /api/webhooks/telegram               Telegram Bot Webhook
```

---

## 11. تصميم واجهة المستخدم | UI/UX Design Direction

### الهوية البصرية
```
الألوان الرئيسية:
  Primary:    #1B4F72  (أزرق داكن طبي - ثقة واحترافية)
  Secondary:  #2E86C1  (أزرق متوسط)
  Accent:     #17A589  (أخضر طبي للنجاح والتأكيد)
  Background: #F8FAFC  (أبيض مائل للرمادي الفاتح)
  Dark Mode:  #0F172A  (خلفية داكنة ناعمة)

الخطوط:
  العربية:    Noto Naskh Arabic (للمحتوى) + Cairo (للعناوين)
  الإنجليزية: Playfair Display (للعناوين) + Inter (للمحتوى)
  الروسية:    Noto Serif (للعناوين) + PT Sans (للمحتوى)
```

### التصميم العام
```
الأسلوب: Luxury Medical — نظيف، فاخر، يوحي بالثقة والاحترافية
الحركة:  انتقالات ناعمة، Parallax خفيف، hover effects أنيقة
البطاقات: زوايا ناعمة 16px، ظلال خفيفة، backdrop blur
الأيقونات: Lucide Icons (متناسق مع shadcn/ui)
```

### دعم RTL/LTR
```typescript
// في next.config.ts
// i18n routing مع دعم dir تلقائي
const locales = ['ar', 'en', 'ru'];
const rtlLocales = ['ar'];

// في layout.tsx
<html 
  lang={locale} 
  dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}
>
```

---

## 12. متطلبات PWA | Progressive Web App

```json
// public/manifest.json
{
  "name": "د. شعيب المسعودي — استشارات طبية",
  "short_name": "Dr. Massoudi",
  "description": "استشارات طبية أونلاين",
  "start_url": "/ar",
  "display": "standalone",
  "background_color": "#1B4F72",
  "theme_color": "#1B4F72",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "screenshots": [...],
  "shortcuts": [
    {
      "name": "احجز موعد",
      "url": "/ar/book",
      "icons": [{ "src": "/icons/book-96.png", "sizes": "96x96" }]
    }
  ]
}
```

**مميزات PWA:**
- قابل للتثبيت على الجوال مباشرةً كتطبيق
- إشعارات Push (اختياري)
- عمل offline للصفحات الثابتة
- تحميل سريع جداً (Core Web Vitals محسّن)

**خارطة التحويل للتطبيق المستقبلي:**
```
PWA → Capacitor.js → iOS/Android App
أو
PWA → React Native (شاركة الكود 70%)
```

---

## 13. الأمان | Security Checklist

- [ ] HTTPS إلزامي على كل المسارات
- [ ] Rate Limiting: 5 محاولات OTP كل 15 دقيقة
- [ ] Rate Limiting: 10 حجوزات كل ساعة لكل مريض
- [ ] CSRF Protection على كل API mutations
- [ ] Input Validation بـ Zod على Frontend و Backend
- [ ] SQL Injection: محمية بـ Drizzle ORM (prepared statements)
- [ ] XSS: Next.js محمي افتراضياً
- [ ] Helmet.js headers
- [ ] Environment Variables فقط في .env (لا secrets في الكود)
- [ ] Telegram Bot Token آمن في Environment
- [ ] Admin routes محمية بـ middleware
- [ ] بيانات المرضى: تشفير sensitive fields
- [ ] GDPR/بيانات شخصية: سياسة خصوصية واضحة

---

## 14. الأداء | Performance Requirements

```
Core Web Vitals (هدف):
  LCP (Largest Contentful Paint): < 2.5 ثانية
  FID (First Input Delay):         < 100ms
  CLS (Cumulative Layout Shift):   < 0.1

تحسينات:
  - Next.js Image Optimization (next/image)
  - Font subsetting (تحميل الأحرف المستخدمة فقط)
  - Static pages مُولَّدة مسبقاً (SSG للصفحات الثابتة)
  - ISR للبيانات شبه الثابتة (Incremental Static Regeneration)
  - API responses: caching مع Redis
  - Bundle splitting تلقائي بـ Next.js
  - Lighthouse Score هدف: 90+ في كل المعايير
```

---

## 15. التدويل | Internationalization (i18n)

```typescript
// messages/ar.json
{
  "home": {
    "hero_title": "استشارات طبية متخصصة",
    "hero_subtitle": "مع د. شعيب المسعودي",
    "cta_book": "احجز موعدك الآن",
    "availability": "متاح للاستشارات"
  },
  "booking": {
    "step1_title": "التحقق من هويتك",
    "step1_description": "أدخل رقم هاتفك أو بريدك الإلكتروني المسجّل",
    "not_found_error": "عذراً، هذا الرقم غير مسجّل. الاستشارات متاحة للمرضى السابقين فقط.",
    "select_date": "اختر التاريخ",
    "select_time": "اختر الوقت",
    "confirm_booking": "تأكيد الحجز",
    "booking_success": "تم حجز موعدك بنجاح! ستصلك رسالة تأكيد."
  },
  "errors": {
    "slot_taken": "هذا الوقت محجوز بالفعل، يرجى اختيار وقت آخر.",
    "advance_notice": "يجب الحجز قبل 24 ساعة على الأقل."
  }
}

// messages/en.json — نفس المفاتيح بالإنجليزية
// messages/ru.json — نفس المفاتيح بالروسية
```

**اختيار اللغة:**
- زر تبديل اللغة في كل الصفحات (أعلى يمين)
- حفظ التفضيل في cookie
- URL يعكس اللغة: `/ar/book` أو `/en/book` أو `/ru/book`
- لغة الإيميل تتبع لغة المريض المحفوظة

---

## 16. متغيرات البيئة | Environment Variables

```env
# قاعدة البيانات
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://dr-massoudi.com

# Telegram
TELEGRAM_BOT_TOKEN=...
DOCTOR_TELEGRAM_ID=...        # معرّف تيليغرام الطبيب لاستقبال الإشعارات

# الإيميل
RESEND_API_KEY=...
FROM_EMAIL=noreply@dr-massoudi.com

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Google Meet (للروابط التلقائية) - اختياري
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# OTP (SMS) — اختياري
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# رابط لوحة التحكم
ADMIN_URL=https://dr-massoudi.com

# البيئة
NODE_ENV=production
```

---

## 17. خطة التطوير والمراحل | Development Phases

### المرحلة 1 — الأساس (أسبوع 1-2)
```
✅ إعداد المشروع (Next.js + TypeScript + Tailwind)
✅ قاعدة البيانات وSchema الكامل
✅ نظام المصادقة (Admin + Patient)
✅ i18n setup (ar/en/ru)
✅ تصميم نظام الألوان والخطوط
```

### المرحلة 2 — الموقع العام (أسبوع 2-3)
```
✅ الصفحة الرئيسية (Landing Page)
✅ صفحة عن الطبيب
✅ صفحة الخدمات
✅ صفحة التواصل
✅ Footer + Navigation
```

### المرحلة 3 — نظام الحجز (أسبوع 3-4)
```
✅ منطق التقويم وحساب المواعيد المتاحة
✅ Booking Wizard (5 خطوات)
✅ بوابة المريض (عرض مواعيد، إلغاء)
✅ OTP verification
```

### المرحلة 4 — لوحة التحكم (أسبوع 4-5)
```
✅ Dashboard الإحصائيات
✅ إدارة جدول العمل (Weekly view)
✅ إدارة الحجوزات
✅ إدارة المرضى (CRUD)
✅ إعدادات الموقع
```

### المرحلة 5 — الإشعارات والتكاملات (أسبوع 5)
```
✅ Telegram Bot setup + إشعارات
✅ إيميل التأكيد (Resend)
✅ Reminder system (Cron jobs)
✅ Google Meet تكامل (اختياري)
```

### المرحلة 6 — إطلاق (أسبوع 6)
```
✅ Testing شامل (Unit + E2E)
✅ Lighthouse optimization
✅ Domain + SSL setup
✅ Deployment على Vercel
✅ PWA Manifest
✅ SEO final setup
```

---

## 18. المكوّنات الرئيسية القابلة لإعادة الاستخدام | Key Reusable Components

```typescript
// مكوّنات يجب بناؤها:

<LanguageSwitcher />          // تبديل اللغة مع حفظ التفضيل
<CalendarPicker />            // تقويم مع تحديد المتاح/المغلق
<TimeSlotGrid />              // شبكة الأوقات المتاحة
<BookingWizard />             // Wizard الحجز متعدد الخطوات
<AppointmentCard />           // بطاقة موعد (للمريض والإدارة)
<PatientCard />               // بطاقة مريض
<WeeklyScheduleEditor />      // محرر جدول الأسبوع للطبيب
<NotificationBadge />         // شارة الإشعارات
<StatusBadge />               // حالة الحجز (pending/confirmed/etc)
<DashboardStats />            // بطاقات الإحصائيات
<ConfirmDialog />             // نافذة التأكيد
<OTPInput />                  // إدخال رمز OTP
<PhoneInput />                // إدخال رقم الهاتف الدولي
```

---

## 19. قائمة التحقق النهائية | Final Checklist

### قبل الإطلاق:
- [ ] جميع الصفحات تعمل بـ 3 لغات بشكل صحيح
- [ ] RTL يعمل بشكل كامل بالعربية
- [ ] الحجز يرفض المستخدمين غير المسجّلين
- [ ] إشعار تيليغرام يصل عند كل حجز
- [ ] الطبيب يمكنه تعديل جدول عمله بسهولة
- [ ] الأوقات تُعرض بمنطقة توقيت موسكو
- [ ] الموقع يعمل على iPhone و Android و Desktop
- [ ] PWA قابل للتثبيت على الجوال
- [ ] بيانات المرضى محمية ومشفّرة
- [ ] Lighthouse Score 90+ على كل الأقسام
- [ ] لا يمكن الحجز بنفس الوقت مرتين (Race condition محمية)
- [ ] إيميل التأكيد يُرسل بلغة المريض
- [ ] Admin 2FA يعمل
- [ ] SSL وHTTPS يعمل

---

## 20. ملاحظات للمطوّر | Developer Notes

1. **أهم شيء:** نظام الحجز يجب أن يستخدم database transactions لمنع double-booking — استخدم `SELECT FOR UPDATE` أو Optimistic locking.

2. **التوقيتات:** خزّن كل التوقيتات بـ UTC في قاعدة البيانات، وحوّلها للعرض بمنطقة التوقيت المطلوبة في Frontend.

3. **الـ OTP:** استخدم Telegram كخيار أول (مجاني) ثم SMS كاحتياطي.

4. **Cron Jobs:** استخدم Vercel Cron Jobs أو QStash (Upstash) للتذكيرات.

5. **الأمان:** راجع OWASP Top 10 قبل الإطلاق.

6. **قابلية التطوير:** الكود مكتوب بطريقة يسهل نقله لـ React Native مستقبلاً — احتفظ بـ business logic منفصلة عن UI.

7. **تيليغرام:** احرص على إعداد Webhook وليس polling في الإنتاج.

8. **Admin URL:** يُنصح بإخفاؤها (`/admin-panel-dr-massoudi` بدل `/admin`) أو حمايتها بـ IP whitelist.

---

**إنتهت الوثيقة | End of Document**
*هذه الوثيقة شاملة وجاهزة للتسليم لأي مطوّر أو فريق تطوير.*
*آخر تحديث: مايو 2026*
