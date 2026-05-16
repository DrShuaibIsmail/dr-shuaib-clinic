import { pgTable, uuid, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// ── Appointments (المواعيد) ──
export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  patientPhone: varchar('patient_phone', { length: 50 }).notNull(),
  patientEmail: varchar('patient_email', { length: 255 }),
  age: integer('age'),
  location: varchar('location', { length: 255 }),
  symptoms: text('symptoms'),
  hasMedicalTests: boolean('has_medical_tests').default(false),
  consultationType: varchar('consultation_type', { length: 100 }).notNull(),
  preferredDate: varchar('preferred_date', { length: 50 }).notNull(),
  preferredTime: varchar('preferred_time', { length: 50 }),
  notes: text('notes'),
  contactMethod: varchar('contact_method', { length: 50 }),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending | confirmed | cancelled | completed
  language: varchar('language', { length: 10 }).default('ar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ── Medical Cards (كروت المعاينة) ──
export const medicalCards = pgTable('medical_cards', {
  id: uuid('id').defaultRandom().primaryKey(),
  appointmentId: uuid('appointment_id').references(() => appointments.id),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  patientAge: integer('patient_age'),
  diagnosis: text('diagnosis'),
  treatment: text('treatment'),
  prescription: text('prescription'),
  nextVisit: varchar('next_visit', { length: 50 }),
  doctorNotes: text('doctor_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Contact Messages (رسائل التواصل) ──
export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Doctor Settings (إعدادات الطبيب) ──
export const doctorSettings = pgTable('doctor_settings', {
  key: varchar('key', { length: 50 }).primaryKey(), // e.g., 'weekly_schedule'
  value: text('value').notNull(), // JSON string
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
