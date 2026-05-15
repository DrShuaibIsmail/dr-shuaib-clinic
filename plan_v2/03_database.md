# 4. قاعدة البيانات الكاملة | Database Schema

---

## جدول المرضى (مُحدّث — يدعم المسارين)

```typescript
export const patients = pgTable('patients', {
  id:              uuid('id').primaryKey().defaultRandom(),
  name:            varchar('name', { length: 255 }).notNull(),
  nameAr:          varchar('name_ar', { length: 255 }),
  phone:           varchar('phone', { length: 50 }).unique(),
  email:           varchar('email', { length: 255 }).unique(),
  whatsapp:        varchar('whatsapp', { length: 50 }),
  telegramId:      varchar('telegram_id', { length: 100 }),
  preferredLang:   varchar('preferred_lang', { length: 5 }).default('ar'),
  
  // جديد: الدولة والتوقيت
  country:         varchar('country', { length: 100 }),
  timezone:        varchar('timezone', { length: 100 }).default('Europe/Moscow'),
  
  // جديد: نوع التسجيل
  registrationType: varchar('registration_type', { length: 20 }).default('doctor_added'),
  // 'doctor_added' | 'self_registered'
  isApproved:      boolean('is_approved').default(false),
  // المرضى المضافين من الطبيب = true تلقائياً
  // المسجّلين ذاتياً = false حتى يوافق الطبيب
  
  consultationReason: text('consultation_reason'),
  // سبب طلب الاستشارة (للمرضى الجدد)
  
  notes:           text('notes'),
  isActive:        boolean('is_active').default(true),
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
});
```

## جدول مواعيد العمل

```typescript
export const workingHours = pgTable('working_hours', {
  id:          uuid('id').primaryKey().defaultRandom(),
  dayOfWeek:   integer('day_of_week').notNull(), // 0=الأحد ... 6=السبت
  startTime:   time('start_time').notNull(),
  endTime:     time('end_time').notNull(),
  isActive:    boolean('is_active').default(true),
  timezone:    varchar('timezone', { length: 100 }).default('Europe/Moscow'),
});
```

## جدول الاستثناءات (إجازات/تعديلات)

```typescript
export const scheduleExceptions = pgTable('schedule_exceptions', {
  id:          uuid('id').primaryKey().defaultRandom(),
  date:        date('date').notNull(),
  type:        varchar('type', { length: 20 }).notNull(), // 'off' | 'custom'
  startTime:   time('start_time'),
  endTime:     time('end_time'),
  note:        text('note'),
});
```

## جدول الحجوزات (مُحدّث — يدعم البطاقات)

```typescript
export const appointments = pgTable('appointments', {
  id:              uuid('id').primaryKey().defaultRandom(),
  patientId:       uuid('patient_id').references(() => patients.id).notNull(),
  date:            date('date').notNull(),
  startTime:       time('start_time').notNull(),
  endTime:         time('end_time').notNull(),
  duration:        integer('duration').default(30),
  
  status:          varchar('status', { length: 20 }).default('pending'),
  // 'pending' | 'confirmed' | 'cancelled' | 'completed'
  
  type:            varchar('type', { length: 30 }).default('online'),
  // 'online' | 'phone'
  
  // الدفع بالبطاقة
  paymentCardId:   uuid('payment_card_id').references(() => paymentCards.id),
  paymentStatus:   varchar('payment_status', { length: 20 }).default('unpaid'),
  // 'unpaid' | 'paid_by_card' | 'free_promo' | 'free_doctor'
  
  meetLink:        text('meet_link'),
  patientNotes:    text('patient_notes'),
  doctorNotes:     text('doctor_notes'),
  cancelReason:    text('cancel_reason'),
  telegramNotified: boolean('telegram_notified').default(false),
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
});
```

## جدول الملفات الطبية

```typescript
export const patientFiles = pgTable('patient_files', {
  id:            uuid('id').primaryKey().defaultRandom(),
  patientId:     uuid('patient_id').references(() => patients.id).notNull(),
  appointmentId: uuid('appointment_id').references(() => appointments.id),
  fileName:      varchar('file_name', { length: 255 }).notNull(),
  fileUrl:       text('file_url').notNull(),
  fileType:      varchar('file_type', { length: 50 }),
  // 'report' | 'xray' | 'lab_result' | 'other'
  fileSize:      integer('file_size'),
  uploadedAt:    timestamp('uploaded_at').defaultNow(),
});
```

## جدول المشرف (الطبيب)

```typescript
export const admins = pgTable('admins', {
  id:           uuid('id').primaryKey().defaultRandom(),
  email:        varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name:         varchar('name', { length: 255 }),
  telegramId:   varchar('telegram_id', { length: 100 }),
  createdAt:    timestamp('created_at').defaultNow(),
});
```

## جدول الإعدادات

```typescript
export const siteSettings = pgTable('site_settings', {
  key:   varchar('key', { length: 100 }).primaryKey(),
  value: jsonb('value'),
  // أمثلة:
  // { key: 'consultation_duration', value: 30 }
  // { key: 'booking_notice_hours', value: 24 }
  // { key: 'max_advance_days', value: 30 }
  // { key: 'telegram_notifications', value: true }
  // { key: 'slot_interval', value: 30 }
  // { key: 'doctor_specialization', value: '...' }
});
```

> ملاحظة: جداول `paymentCards` و `promotions` موجودة في ملف `02_payment_cards.md`
