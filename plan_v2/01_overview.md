# خطة مشروع د. شعيب المسعودي — الإصدار 2.0

> **الإصدار:** 2.0 | **تاريخ:** مايو 2026 | **الحالة:** قيد المراجعة

---

## 1. نظرة عامة على المشروع

**اسم المشروع:** منصة استشارات طبية دولية — د. شعيب المسعودي
**الطبيب:** د. شعيب المسعودي — يمني مقيم في روسيا

### الهدف الرئيسي
منصة احترافية للاستشارات الطبية الأونلاين تخدم مرضى من:
- 🇷🇺 روسيا (مرضى سابقين + جدد)
- 🇾🇪 اليمن (مرضى جدد)
- 🇺🇸 أمريكا (مرضى جدد)

### اللغات المدعومة
- العربية (RTL) — اللغة الافتراضية
- الإنجليزية (LTR)
- الروسية (LTR)

### المميزات الرئيسية
1. **مساران للمرضى:** سابقين (دخول مباشر) + جدد (تسجيل ذاتي بموافقة الطبيب)
2. **نظام بطاقات الدفع:** أكواد مشفرة يولّدها الطبيب من لوحة التحكم
3. **عروض استشارة مجانية:** بانر إعلاني يتحكم به الطبيب من اللوحة
4. **إشعارات تيليغرام فورية** عند كل حجز
5. **دعم المناطق الزمنية** (موسكو، صنعاء، أمريكا)
6. **PWA** جاهز للتحويل لتطبيق موبايل
7. **رفع ملفات طبية** (تقارير، أشعة، تحاليل)
8. **تحكم كامل من لوحة التحكم** بكل شيء

---

## 2. المكدس التقني (مبسّط وفعّال)

### Frontend
```
Framework:     Next.js 15 (App Router)
Language:      TypeScript 5.x
Styling:       Tailwind CSS v4 + shadcn/ui v2
Animations:    Framer Motion 11
i18n:          next-intl 3.x
Data:          TanStack Query v5
Forms:         React Hook Form + Zod
PWA:           next-pwa (Workbox 8)
```

### Backend
```
API:           Next.js API Routes (App Router)
Database:      PostgreSQL 16 (Neon.tech serverless)
ORM:           Drizzle ORM
Auth:          NextAuth.js v5 (Auth.js)
Email:         Resend
File Storage:  Cloudflare R2 أو Vercel Blob
```

### الإشعارات
```
Telegram:      Telegram Bot API مباشرة (fetch)
```

### DevOps
```
Hosting:       Vercel
CI/CD:         GitHub Actions
Monitoring:    Sentry + Vercel Analytics
```

### أدوات التطوير
```
Package:       pnpm 9
Linting:       ESLint 9 + Prettier 3
Testing:       Vitest + Playwright
```
