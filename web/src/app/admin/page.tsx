'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Phone, MapPin, CalendarDays, Clock, FileText, CheckCircle2, XCircle, AlertCircle, MessageCircle, FolderOpen, PlusCircle, Activity, Pill, UserCheck, LogOut, Search, TrendingUp, Calendar, Heart, Bell, Settings, LayoutDashboard, Users, Check, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type Appointment = {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  age?: number;
  location?: string;
  symptoms?: string;
  hasMedicalTests?: boolean;
  contactMethod?: string;
  consultationType: string;
  preferredDate: string;
  preferredTime?: string;
  notes?: string;
  status: string;
  createdAt: string;
};

type MedicalCard = {
  id: string;
  patientName: string;
  patientAge?: number;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  nextVisit?: string;
  doctorNotes?: string;
  createdAt: string;
};

const WaveSVG = ({ color }: { color: string }) => {
  const id = color.replace('#', '');
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-60">
      <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,15 C20,28 30,2 50,15 C70,28 80,2 100,15 L100,30 L0,30 Z" fill={`url(#grad-${id})`} />
        <path d="M0,15 C20,28 30,2 50,15 C70,28 80,2 100,15" fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'dashboard' | 'appointments' | 'cards' | 'newcard' | 'settings'>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cards, setCards] = useState<MedicalCard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [consultationFilter, setConsultationFilter] = useState('all');
  
  // Schedule state
  const [weeklySchedule, setWeeklySchedule] = useState<Record<number, string[]>>({
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  });
  const [newSlotTime, setNewSlotTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [cardForm, setCardForm] = useState({
    patientName: '', patientAge: '', diagnosis: '', treatment: '', prescription: '', nextVisit: '', doctorNotes: '',
  });

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }), [token]);

  const login = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = useCallback(async () => {
    const res = await fetch('/api/admin/settings', { headers: headers() });
    if (res.ok) {
      const data = await res.json();
      if (data.weekly_schedule) setWeeklySchedule(data.weekly_schedule);
    }
  }, [headers]);

  const saveSettings = async () => {
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ key: 'weekly_schedule', value: weeklySchedule }),
    });
    setLoading(false);
  };

  const addSlot = (day: number) => {
    if (!newSlotTime) return;
    setWeeklySchedule(prev => {
      const slots = [...prev[day]];
      if (!slots.includes(newSlotTime)) slots.push(newSlotTime);
      return { ...prev, [day]: slots.sort() };
    });
  };

  const removeSlot = (day: number, slot: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(s => s !== slot)
    }));
  };

  const loadAppointments = useCallback(async () => {
    const res = await fetch('/api/admin/appointments', { headers: headers() });
    if (res.ok) setAppointments(await res.json());
  }, [headers]);

  const loadCards = useCallback(async () => {
    const res = await fetch('/api/admin/cards', { headers: headers() });
    if (res.ok) setCards(await res.json());
  }, [headers]);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/appointments', {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ id, status }),
    });
    loadAppointments();
  };

  const createCard = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/cards', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        ...cardForm,
        patientAge: cardForm.patientAge ? parseInt(cardForm.patientAge) : undefined,
      }),
    });
    if (res.ok) {
      setCardForm({ patientName: '', patientAge: '', diagnosis: '', treatment: '', prescription: '', nextVisit: '', doctorNotes: '' });
      setTab('cards');
      loadCards();
    }
    setLoading(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) {
      loadAppointments();
      loadCards();
      loadSettings();
    }
  }, [token, loadAppointments, loadCards, loadSettings]);

  const statusConfig: Record<string, { color: string, bg: string, label: string, icon: any }> = {
    pending: { color: 'text-[#F59E0B]', bg: 'bg-[#FEF3C7]/50', label: 'بانتظار التأكيد', icon: Clock },
    confirmed: { color: 'text-[#10B981]', bg: 'bg-[#D1FAE5]/50', label: 'مؤكد', icon: CheckCircle2 },
    completed: { color: 'text-blue-600', bg: 'bg-blue-100/50', label: 'مكتمل', icon: UserCheck },
    cancelled: { color: 'text-red-600', bg: 'bg-red-100/50', label: 'ملغي', icon: XCircle },
  };

  const getContactIcon = (method?: string) => {
    if (!method) return { icon: MessageCircle, color: 'text-slate-400', bg: 'bg-slate-100', label: 'غير محدد' };
    const lower = method.toLowerCase();
    if (lower.includes('whatsapp') || lower.includes('واتس')) return { icon: MessageCircle, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', label: 'واتساب' };
    if (lower.includes('phone') || lower.includes('اتصال') || lower.includes('هاتف')) return { icon: Phone, color: 'text-blue-500', bg: 'bg-blue-100/50', label: 'اتصال هاتفي' };
    if (lower.includes('telegram') || lower.includes('تيليجرام')) return { icon: MessageCircle, color: 'text-[#0088cc]', bg: 'bg-[#0088cc]/10', label: 'تيليجرام' };
    if (lower.includes('video') || lower.includes('فيديو') || lower.includes('zoom')) return { icon: Video, color: 'text-purple-500', bg: 'bg-purple-100/50', label: 'مكالمة فيديو' };
    return { icon: MessageCircle, color: 'text-slate-500', bg: 'bg-slate-100', label: method };
  };

  // 1. Grouping appointments to count distinct patients
  const patientGroups = useMemo(() => {
    const groups = Object.values(
      appointments.reduce((acc, apt) => {
        if (!acc[apt.patientPhone]) {
          acc[apt.patientPhone] = { 
            patientName: apt.patientName, 
            age: apt.age, 
            location: apt.location, 
            phone: apt.patientPhone, 
            appointments: [] 
          };
        }
        acc[apt.patientPhone].appointments.push(apt);
        return acc;
      }, {} as Record<string, { patientName: string, age?: number, location?: string, phone: string, appointments: Appointment[] }>)
    );

    if (!searchQuery) return groups;
    const lowerQ = searchQuery.toLowerCase();
    return groups.filter(g => 
      g.patientName.toLowerCase().includes(lowerQ) || 
      g.phone.includes(lowerQ)
    );
  }, [appointments, searchQuery]);

  const filteredCards = useMemo(() => {
    if (!searchQuery) return cards;
    const lowerQ = searchQuery.toLowerCase();
    return cards.filter(c => c.patientName.toLowerCase().includes(lowerQ));
  }, [cards, searchQuery]);

  // Appointment Filters Data
  const uniqueLocations = useMemo(() => {
    const locs = appointments.map(a => a.location).filter(Boolean) as string[];
    return Array.from(new Set(locs));
  }, [appointments]);

  const uniqueConsultations = useMemo(() => {
    const cons = appointments.map(a => a.consultationType).filter(Boolean) as string[];
    return Array.from(new Set(cons));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchSearch = !searchQuery || apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || apt.patientPhone.includes(searchQuery);
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchLocation = locationFilter === 'all' || apt.location === locationFilter;
      const matchConsultation = consultationFilter === 'all' || apt.consultationType === consultationFilter;
      
      return matchSearch && matchStatus && matchLocation && matchConsultation;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [appointments, searchQuery, statusFilter, locationFilter, consultationFilter]);

  // 2. Real dashboard statistics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.preferredDate === todayStr);
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const upcomingAppointments = appointments.filter(a => ['pending', 'confirmed'].includes(a.status)).slice(0, 5);

  // 3. Real pie chart data for consultation types
  const casesDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    appointments.forEach(a => {
      counts[a.consultationType] = (counts[a.consultationType] || 0) + 1;
    });
    const colors = ['#4F46E5', '#0EA5E9', '#38BDF8', '#22D3EE', '#818CF8'];
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length]
    })).sort((a, b) => b.value - a.value);
  }, [appointments]);

  // 4. Real latest activities
  const recentActivities = useMemo(() => {
    const items = [
      ...appointments.map(a => ({ type: 'appointment', text: 'تم حجز موعد جديد', desc: a.patientName, date: new Date(a.createdAt).getTime(), icon: CalendarDays, color: 'text-emerald-500', bg: 'bg-emerald-50' })),
      ...cards.map(c => ({ type: 'card', text: 'تم إضافة سجل طبي', desc: c.patientName, date: new Date(c.createdAt).getTime(), icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' }))
    ];
    return items.sort((a, b) => b.date - a.date).slice(0, 5);
  }, [appointments, cards]);

  const timeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 60000); // in minutes
    if (diff < 1) return 'الآن';
    if (diff < 60) return `منذ ${diff} دقيقة`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  };

  // Login Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative bg-white p-8 sm:p-12 rounded-[2rem] w-full max-w-md shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100"
        >
          <div className="h-20 w-20 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/30">
            <Activity className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 mb-2">النظام الطبي الموحد</h1>
          <p className="text-center text-slate-500 mb-10 text-sm font-medium">الرجاء تسجيل الدخول للوحة التحكم</p>
          
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 bg-red-50 p-4 rounded-2xl text-sm font-bold text-center mb-6">
              {error}
            </motion.p>
          )}
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              placeholder="كلمة المرور"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center tracking-widest font-mono text-lg outline-none"
              dir="ltr"
            />
            <button
              onClick={login}
              disabled={loading || !password}
              className="w-full py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? 'جاري التحقق...' : 'دخول'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { key: 'dashboard' as const, label: 'لوحة التحكم', icon: LayoutDashboard },
    { key: 'appointments' as const, label: 'المواعيد', icon: CalendarDays, count: pendingAppointments.length > 0 ? pendingAppointments.length : undefined },
    { key: 'cards' as const, label: 'المرضى والسجلات', icon: Users, count: cards.length },
    { key: 'newcard' as const, label: 'سجل جديد', icon: PlusCircle },
    { key: 'settings' as const, label: 'إعدادات الجدولة', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FE] text-[#2B3674] font-sans selection:bg-indigo-100" dir="rtl">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] fixed inset-y-0 right-0 bg-white border-l border-slate-100 z-50 shadow-[4px_0_24px_rgb(0,0,0,0.02)]">
        <div className="p-8 pb-6 flex items-center justify-center gap-3 border-b border-slate-50">
          <div className="h-10 w-10 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-md shrink-0">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="text-right">
            <h1 className="text-lg font-black text-[#2B3674] leading-tight">النظام الطبي الموحد</h1>
            <p className="text-slate-400 text-[10px] font-bold mt-0.5">لوحة تحكم د. شعيب</p>
          </div>
        </div>
        
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = tab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl font-bold transition-all ${
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-[#A3AED0] hover:bg-slate-50 hover:text-[#2B3674]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#4F46E5]' : 'text-[#A3AED0]'}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-md ${isActive ? 'bg-[#4F46E5] text-white' : 'bg-red-500 text-white shadow-sm shadow-red-500/30'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          <button onClick={() => {setToken(''); localStorage.removeItem('admin_token')}} className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-100 py-3 rounded-xl text-sm font-bold transition-all active:scale-95">
            <LogOut className="h-4 w-4" /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:mr-[280px] pb-24 lg:pb-8 min-h-screen flex flex-col">
        
        {/* Top Header */}
        <header className="bg-white/50 backdrop-blur-md px-6 py-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shadow-sm shrink-0 border border-slate-200">
                <img src="https://ui-avatars.com/api/?name=Dr+Shuaib&background=4F46E5&color=fff" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-black text-[#2B3674]">د. شعيب</h1>
                <p className="text-[#A3AED0] text-[10px] font-bold">الطبيب المعالج</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {(tab === 'appointments' || tab === 'cards') && (
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3AED0]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="ابحث هنا..."
                    className="w-full bg-white rounded-full pl-4 pr-11 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all shadow-sm text-[#2B3674] font-medium placeholder:text-[#A3AED0]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-left w-full md:w-auto justify-end">
            <div>
              <h2 className="text-xl font-black text-[#2B3674] flex items-center gap-2">مرحباً د. شعيب 👋</h2>
              <p className="text-[#A3AED0] text-xs font-bold mt-1 text-left">هذا ملخص نشاطك اليوم</p>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="p-4 sm:p-6 w-full flex-1 max-w-7xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              
              {tab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Patients */}
                    <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgb(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36">
                      <div className="flex justify-between items-start z-10">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Users className="h-5 w-5" /></div>
                        <div className="text-left">
                          <p className="text-[#A3AED0] text-xs font-bold mb-1">إجمالي المرضى</p>
                          <h3 className="text-[#2B3674] text-2xl font-black">{patientGroups.length}</h3>
                          <p className="text-emerald-500 text-[10px] font-bold mt-1">حسابات مسجلة</p>
                        </div>
                      </div>
                      <WaveSVG color="#10B981" />
                    </div>

                    {/* Today's Appointments */}
                    <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgb(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36 border border-transparent hover:border-orange-100 cursor-pointer transition-colors" onClick={() => setTab('appointments')}>
                      <div className="flex justify-between items-start z-10">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"><CalendarDays className="h-5 w-5" /></div>
                        <div className="text-left">
                          <p className="text-[#A3AED0] text-xs font-bold mb-1">مواعيد اليوم</p>
                          <h3 className="text-[#2B3674] text-2xl font-black">{todayAppointments.length}</h3>
                          <p className="text-orange-500 text-[10px] font-bold mt-1">لليوم الحالي</p>
                        </div>
                      </div>
                      <WaveSVG color="#F97316" />
                    </div>

                    {/* Pending Appointments */}
                    <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgb(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36 border border-transparent hover:border-red-100 cursor-pointer transition-colors" onClick={() => setTab('appointments')}>
                      <div className="flex justify-between items-start z-10">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500"><AlertCircle className="h-5 w-5" /></div>
                        <div className="text-left">
                          <p className="text-[#A3AED0] text-xs font-bold mb-1">بانتظار التأكيد</p>
                          <h3 className="text-[#2B3674] text-2xl font-black">{pendingAppointments.length}</h3>
                          <p className="text-red-500 text-[10px] font-bold mt-1">يتطلب المراجعة</p>
                        </div>
                      </div>
                      <WaveSVG color="#EF4444" />
                    </div>

                    {/* Completed Cards */}
                    <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgb(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36 border border-transparent hover:border-blue-100 cursor-pointer transition-colors" onClick={() => setTab('cards')}>
                      <div className="flex justify-between items-start z-10 mt-1">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><FileText className="h-5 w-5" /></div>
                        <div className="text-left">
                          <p className="text-[#A3AED0] text-xs font-bold mb-1">السجلات الطبية</p>
                          <h3 className="text-[#2B3674] text-2xl font-black">{cards.length}</h3>
                          <p className="text-blue-500 text-[10px] font-bold mt-1">وصفات وسجلات</p>
                        </div>
                      </div>
                      <WaveSVG color="#3B82F6" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Patients Distribution */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgb(0,0,0,0.02)] border border-slate-50 flex flex-col items-center">
                      <h3 className="text-lg font-black text-[#2B3674] mb-2 w-full text-right">أنواع الاستشارات</h3>
                      <div className="flex-1 w-full flex items-center justify-between">
                        <div className="w-1/2 h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            {casesDistribution.length > 0 ? (
                              <PieChart>
                                <Pie data={casesDistribution} innerRadius={35} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                                  {casesDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                              </PieChart>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-bold">لا يوجد بيانات</div>
                            )}
                          </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 space-y-3">
                          {casesDistribution.slice(0, 4).map(d => (
                            <div key={d.name} className="flex items-center justify-end gap-2 text-xs font-bold text-[#A3AED0]">
                              <span className="truncate max-w-[80px]" title={d.name}>{d.name}</span>
                              <span className="text-[#2B3674] w-6 text-left">{d.value}</span>
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgb(0,0,0,0.02)] lg:col-span-2 border border-slate-50 flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <button onClick={() => setTab('appointments')} className="text-xs text-[#4F46E5] font-bold bg-[#4F46E5]/10 px-3 py-1.5 rounded-lg hover:bg-[#4F46E5]/20 transition-colors">عرض المواعيد</button>
                        <h3 className="text-lg font-black text-[#2B3674]">المواعيد القادمة</h3>
                      </div>
                      
                      <div className="flex-1 space-y-3 overflow-y-auto max-h-64 pr-2">
                        {upcomingAppointments.length > 0 ? upcomingAppointments.map((apt) => (
                          <div key={apt.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                            <div className="text-left font-mono text-sm font-bold text-[#2B3674] w-24">
                              <div className="text-[10px] text-slate-400 mb-0.5">{apt.preferredDate}</div>
                              {apt.preferredTime || 'لم يحدد'}
                            </div>
                            <div className={`px-2 py-1 rounded-md text-[10px] font-bold shrink-0 ${statusConfig[apt.status]?.bg} ${statusConfig[apt.status]?.color}`}>
                              {statusConfig[apt.status]?.label}
                            </div>
                            <div className="text-right flex-1 px-4">
                              <h4 className="text-sm font-black text-[#2B3674] truncate">{apt.patientName}</h4>
                              <p className="text-[10px] text-[#A3AED0] font-medium truncate">{apt.consultationType}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black shrink-0 shadow-inner">
                               {apt.patientName.charAt(0)}
                            </div>
                          </div>
                        )) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-8">
                            <CalendarDays className="h-8 w-8 opacity-50" />
                            <p className="text-sm font-bold">لا توجد مواعيد قادمة</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Important Alerts */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgb(0,0,0,0.02)] border border-slate-50">
                      <h3 className="text-lg font-black text-[#2B3674] mb-6 flex items-center gap-2 justify-end"><Bell className="h-5 w-5"/> تنبيهات وملاحظات</h3>
                      <div className="space-y-4">
                        {pendingAppointments.length > 0 ? (
                          <div className="bg-red-50 p-4 rounded-2xl flex items-start gap-4 cursor-pointer hover:bg-red-100 transition-colors" onClick={() => setTab('appointments')}>
                            <div className="h-8 w-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0"><AlertCircle className="h-4 w-4"/></div>
                            <div className="text-right flex-1">
                              <h4 className="text-sm font-black text-red-700">مواعيد بانتظار التأكيد</h4>
                              <p className="text-xs text-red-500/80 font-medium">يوجد {pendingAppointments.length} مواعيد تحتاج للمراجعة</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-emerald-50 p-4 rounded-2xl flex items-start gap-4">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center shrink-0"><CheckCircle2 className="h-4 w-4"/></div>
                            <div className="text-right flex-1">
                              <h4 className="text-sm font-black text-emerald-700">لا يوجد تنبيهات</h4>
                              <p className="text-xs text-emerald-500/80 font-medium">تمت مراجعة جميع المواعيد</p>
                            </div>
                          </div>
                        )}
                        
                        {todayAppointments.length > 0 && (
                          <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-4 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => setTab('appointments')}>
                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0"><CalendarDays className="h-4 w-4"/></div>
                            <div className="text-right flex-1">
                              <h4 className="text-sm font-black text-blue-700">عيادة اليوم نشطة</h4>
                              <p className="text-xs text-blue-500/80 font-medium">لديك {todayAppointments.length} مراجعات اليوم</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Latest Activities */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgb(0,0,0,0.02)] border border-slate-50">
                      <h3 className="text-lg font-black text-[#2B3674] mb-6 text-right">أحدث النشاطات في النظام</h3>
                      {recentActivities.length > 0 ? (
                        <div className="relative before:absolute before:inset-y-2 before:right-4 before:w-0.5 before:bg-slate-100 space-y-6 pr-12">
                          {recentActivities.map((act, i) => (
                            <div key={i} className="relative">
                              <div className={`absolute -right-[43px] top-0 h-8 w-8 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-10 ${act.bg} ${act.color}`}>
                                <act.icon className="h-3.5 w-3.5"/>
                              </div>
                              <div>
                                <h4 className="text-sm font-black text-[#2B3674]">{act.text} <span className="font-bold text-slate-500 text-xs">({act.desc})</span></h4>
                                <p className="text-[10px] text-[#A3AED0] font-medium mt-1" dir="ltr">{timeAgo(act.date)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-400 font-bold text-sm">لم يتم تسجيل أي نشاطات بعد</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Functional Tabs */}
              {tab === 'appointments' && (
                <div className="space-y-6">
                  {/* Filters Bar */}
                  <div className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
                    <div className="flex-1 w-full sm:w-auto">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">الحالة</label>
                      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full bg-slate-50 px-4 py-3 rounded-xl border-transparent focus:border-blue-500 outline-none text-sm font-bold text-slate-700 cursor-pointer">
                        <option value="all">جميع الحالات</option>
                        <option value="pending">بانتظار التأكيد</option>
                        <option value="confirmed">مؤكدة</option>
                        <option value="completed">مكتملة</option>
                        <option value="cancelled">ملغاة</option>
                      </select>
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">الدولة / المدينة</label>
                      <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full bg-slate-50 px-4 py-3 rounded-xl border-transparent focus:border-blue-500 outline-none text-sm font-bold text-slate-700 cursor-pointer">
                        <option value="all">جميع المواقع</option>
                        {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">نوع الاستشارة / المرض</label>
                      <select value={consultationFilter} onChange={e => setConsultationFilter(e.target.value)} className="w-full bg-slate-50 px-4 py-3 rounded-xl border-transparent focus:border-blue-500 outline-none text-sm font-bold text-slate-700 cursor-pointer">
                        <option value="all">جميع التخصصات</option>
                        {uniqueConsultations.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {filteredAppointments.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FolderOpen className="h-10 w-10 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">لا توجد مواعيد مطابقة</h3>
                      <p className="text-slate-500">جرب تغيير الفلاتر أو كلمات البحث.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredAppointments.map((apt, index) => {
                        const sConf = statusConfig[apt.status] || statusConfig.pending;
                        const StatusIcon = sConf.icon;
                        
                        return (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}
                            key={apt.id} 
                            className="relative bg-white rounded-3xl p-5 shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-slate-100/50 flex flex-col gap-5 overflow-hidden group hover:border-indigo-100 transition-colors"
                          >
                            {/* Decorative blur orb */}
                            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${sConf.color.replace('text-', 'bg-')}`} />

                            {/* Header: Date, Method, Status */}
                            <div className="flex justify-between items-center z-10">
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{apt.preferredDate}</span>
                                  <span className="text-lg font-black text-[#2B3674] -mt-1 font-mono tracking-tight">{apt.preferredTime || 'لم يحدد'}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {apt.contactMethod && (
                                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black ${getContactIcon(apt.contactMethod).bg} ${getContactIcon(apt.contactMethod).color}`}>
                                    {(() => {
                                      const CI = getContactIcon(apt.contactMethod).icon;
                                      return <CI className="h-3.5 w-3.5" />;
                                    })()}
                                    <span className="hidden sm:inline">{getContactIcon(apt.contactMethod).label}</span>
                                  </div>
                                )}
                                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black shadow-sm ${sConf.bg} ${sConf.color}`}>
                                  <StatusIcon className="h-3.5 w-3.5" /> {sConf.label}
                                </span>
                              </div>
                            </div>

                            {/* Patient Profile section */}
                            <div className="flex items-start gap-4 z-10">
                              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#38BDF8] text-white flex justify-center items-center font-black text-xl shadow-lg shadow-indigo-500/30 shrink-0 border-2 border-white">
                                {apt.patientName.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-black text-lg text-[#2B3674] flex items-center gap-2 truncate">
                                  {apt.patientName}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                                  {apt.age && <span className="font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{apt.age} سنة</span>}
                                  <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" /> <span dir="ltr">{apt.patientPhone}</span></span>
                                  {apt.location && <span className="flex items-center gap-1.5 text-indigo-600 font-bold"><MapPin className="h-3.5 w-3.5" /> {apt.location}</span>}
                                </div>
                              </div>
                            </div>

                            {/* Medical Details */}
                            <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-100/50 space-y-3 z-10">
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                  <span className="text-[9px] uppercase tracking-wider font-black text-slate-400 block mb-0.5">الاستشارة</span>
                                  <div className="font-bold text-sm text-[#2B3674] truncate">{apt.consultationType}</div>
                                </div>
                                {apt.hasMedicalTests && (
                                  <div className="flex items-center justify-center h-10 w-10 bg-blue-100 text-blue-600 rounded-xl shadow-sm shrink-0" title="يوجد فحوصات طبية مرفقة">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                )}
                              </div>

                              {apt.symptoms && (
                                <div className="relative pt-3 mt-3 border-t border-slate-200/60">
                                  <span className="absolute -top-2.5 right-4 bg-slate-50 px-2 text-[9px] uppercase tracking-wider font-black text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3"/> الأعراض / الشكوى</span>
                                  <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1 line-clamp-2 hover:line-clamp-none transition-all cursor-pointer" title="انقر لعرض المزيد">{apt.symptoms}</p>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 mt-auto z-10">
                              <a href={`https://wa.me/${apt.patientPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-2xl transition-all shrink-0">
                                <MessageCircle className="h-5 w-5" />
                              </a>
                              
                              {apt.status === 'pending' && (
                                <>
                                  <button onClick={() => updateStatus(apt.id, 'confirmed')} className="flex-1 h-12 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-black rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2">
                                    <CheckCircle2 className="h-5 w-5" /> تأكيد الموعد
                                  </button>
                                  <button onClick={() => updateStatus(apt.id, 'cancelled')} className="flex items-center justify-center w-12 h-12 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all active:scale-95 shrink-0">
                                    <XCircle className="h-5 w-5"/>
                                  </button>
                                </>
                              )}
                              
                              {apt.status === 'confirmed' && (
                                <button onClick={() => updateStatus(apt.id, 'completed')} className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2">
                                  <Check className="h-5 w-5"/> إنجاز طبي
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {tab === 'cards' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCards.length === 0 && (
                    <div className="col-span-full bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="h-10 w-10 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">لا توجد سجلات طبية</h3>
                      <p className="text-slate-500">قم بإنشاء سجلات للمرضى من تبويب "سجل جديد".</p>
                    </div>
                  )}
                  {filteredCards.map((card, index) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}
                      key={card.id} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-200 transition-colors"
                    >
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-6">
                        <div>
                          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-1">
                            {card.patientName} {card.patientAge && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{card.patientAge} سنة</span>}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(card.createdAt).toLocaleDateString('ar-SA')}</p>
                        </div>
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                          <Heart className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {card.diagnosis && <div><span className="text-slate-400 block text-[10px] uppercase tracking-wider font-black mb-1">التشخيص</span><div className="font-medium text-slate-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">{card.diagnosis}</div></div>}
                        {card.treatment && <div><span className="text-slate-400 block text-[10px] uppercase tracking-wider font-black mb-1">العلاج</span><div className="font-medium text-slate-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">{card.treatment}</div></div>}
                        {card.prescription && <div><span className="text-blue-500 block text-[10px] uppercase tracking-wider font-black mb-1 flex items-center gap-1"><Pill className="h-3 w-3" /> الوصفة الطبية</span><div className="font-bold text-blue-800 text-sm bg-blue-50/50 border border-blue-100 p-4 rounded-xl leading-relaxed">{card.prescription}</div></div>}
                        {card.nextVisit && <div><span className="text-slate-400 block text-[10px] uppercase tracking-wider font-black mb-1">الزيارة القادمة</span><div className="font-bold text-emerald-700 text-sm bg-emerald-50 border border-emerald-100 p-3 rounded-xl">{card.nextVisit}</div></div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === 'newcard' && (
                <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-3xl mx-auto">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">اسم المريض *</label>
                        <input type="text" value={cardForm.patientName} onChange={(e) => setCardForm({ ...cardForm, patientName: e.target.value })} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-bold" placeholder="الاسم الكامل" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">العمر</label>
                        <input type="number" value={cardForm.patientAge} onChange={(e) => setCardForm({ ...cardForm, patientAge: e.target.value })} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-bold" placeholder="سنة" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">التشخيص الطبي</label>
                      <textarea rows={2} value={cardForm.diagnosis} onChange={(e) => setCardForm({ ...cardForm, diagnosis: e.target.value })} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-medium resize-none" placeholder="اكتب التشخيص هنا..." />
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-black text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Pill className="h-3 w-3" /> الوصفة الطبية (الأدوية)</label>
                      <textarea rows={4} value={cardForm.prescription} onChange={(e) => setCardForm({ ...cardForm, prescription: e.target.value })} className="w-full px-5 py-4 bg-blue-50/50 rounded-2xl border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-bold text-blue-900 resize-none leading-relaxed" placeholder="Rx..." />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">خطة العلاج</label>
                        <textarea rows={2} value={cardForm.treatment} onChange={(e) => setCardForm({ ...cardForm, treatment: e.target.value })} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-medium resize-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">ملاحظات سرية</label>
                        <textarea rows={2} value={cardForm.doctorNotes} onChange={(e) => setCardForm({ ...cardForm, doctorNotes: e.target.value })} className="w-full px-5 py-4 bg-amber-50/50 rounded-2xl border-transparent focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm font-medium text-amber-900 resize-none" placeholder="تظهر للطبيب فقط" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">موعد الزيارة القادمة</label>
                      <input type="text" value={cardForm.nextVisit} onChange={(e) => setCardForm({ ...cardForm, nextVisit: e.target.value })} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-bold" placeholder="مثال: بعد أسبوعين" />
                    </div>

                    <button
                      onClick={createCard}
                      disabled={loading || !cardForm.patientName}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-4 flex justify-center items-center gap-2"
                    >
                      {loading ? 'جاري الحفظ...' : <><CheckCircle2 className="h-5 w-5" /> حفظ السجل الطبي</>}
                    </button>
                  </div>
                </div>
              )}

              {/* === Settings Tab === */}
              {tab === 'settings' && (
                <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((dayName, dayIndex) => (
                      <div key={dayIndex} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                          <h3 className="font-black text-slate-800 text-lg flex items-center gap-2"><CalendarDays className="h-5 w-5 text-blue-500" />{dayName}</h3>
                          <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                            <input
                              type="time"
                              className="px-2 py-1.5 rounded-lg border-none text-sm outline-none bg-transparent font-bold text-slate-700"
                              onChange={(e) => setNewSlotTime(e.target.value)}
                            />
                            <button
                              onClick={() => addSlot(dayIndex)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all"
                            >
                              <PlusCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {weeklySchedule[dayIndex]?.length === 0 && (
                            <div className="w-full text-center py-4 bg-slate-100/50 rounded-xl border border-slate-200 border-dashed text-slate-400 text-sm font-bold">
                              مغلق - لا يوجد مواعيد
                            </div>
                          )}
                          {weeklySchedule[dayIndex]?.map(time => (
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={time} className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 pl-2 pr-3 py-1.5 rounded-xl font-bold text-sm shadow-sm">
                              <span dir="ltr">{time}</span>
                              <button onClick={() => removeSlot(dayIndex, time)} className="text-slate-300 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 rounded-lg p-1 ml-1">
                                <XCircle className="h-3.5 w-3.5" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={saveSettings}
                    disabled={loading}
                    className="w-full mt-10 py-5 bg-slate-900 hover:bg-slate-800 text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {loading ? 'جاري الحفظ...' : <><CheckCircle2 className="h-5 w-5" /> تحديث جدول العمل</>}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* Mobile Bottom Navigation (Glassmorphism iOS style) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-2xl border-t border-slate-200 px-2 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-10px_40px_rgb(0,0,0,0.05)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className="relative flex flex-col items-center justify-center w-16 gap-1"
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-2xl transition-all duration-300 ${isActive ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-500/30' : 'text-slate-400'}`}>
                <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              </div>
              <span className={`text-[10px] font-black transition-colors ${isActive ? 'text-[#4F46E5]' : 'text-slate-500'}`}>
                {item.label}
              </span>
              {/* Badge for mobile */}
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute top-0 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Safe area padding for mobile bottom nav */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
