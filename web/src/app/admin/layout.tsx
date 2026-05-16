export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ fontFamily: "'Inter', 'Cairo', sans-serif", margin: 0, background: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
