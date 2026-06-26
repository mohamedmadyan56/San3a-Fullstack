'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SERVICES = [
  { name: 'الدهانات', icon: '🎨' },
  { name: 'النجارة', icon: '🔨' },
  { name: 'الكهرباء', icon: '⚡' },
  { name: 'السباكة', icon: '🪠' },
  { name: 'أعمال صيانة عامة', icon: '🛠️' },
  { name: 'فتح الأقفال', icon: '🔑' },
  { name: 'التنظيف', icon: '🧹' },
  { name: 'تصليح المكيفات', icon: '❄️' },
];

const TRUST_BADGES = [
  { label: 'ضمان الرضا', icon: '✓' },
  { label: 'دعم 24/7', icon: '🎧' },
  { label: 'دفع آمن', icon: '💳' },
  { label: 'فحص السجل الجنائي', icon: '🛡️' },
];

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#dbeee0] h-80 md:h-96 rounded-2xl flex items-center justify-center text-gray-500 text-sm">
      جاري تحميل الخريطة...
    </div>
  ),
});

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* الهيدر */}
      <header className="bg-[#eef6ef] border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#0f5132] flex items-center justify-center text-white text-xs">
              ⌂
            </div>
            <span className="text-xl font-bold text-gray-900">صنعة</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a href="#" className="text-[#0f5132] font-bold border-b-2 border-[#0f5132] pb-1">
              البحث عن خدمات
            </a>
            <a href="#" className="hover:text-gray-900">حجوزاتي</a>
            <a href="#" className="hover:text-gray-900">محترفون معتمدون</a>
            <a href="#" className="hover:text-gray-900">المساعدة</a>
          </nav>
          <Link
            href="/login"
            className="bg-[#0f5132] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#0c3f27] transition-colors"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {/* الهيرو */}
      <section className="bg-gradient-to-l from-[#0a2e1f] to-[#0f5132]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

          {/* الخريطة الحقيقية */}
          <div className="relative rounded-2xl overflow-hidden order-2 md:order-1 h-80 md:h-96">
            <Map />
            {/* Badge فوق الخريطة */}
            <div className="absolute bottom-3 right-3 left-3 bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 z-[1000]">
              <div className="w-9 h-9 rounded-full bg-[#eef6ef] text-[#0f5132] flex items-center justify-center text-base">
                🛡️
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">موثق 100%</p>
                <p className="text-xs text-gray-500">محترفون مفحوصون أمنياً</p>
              </div>
            </div>
          </div>

          {/* النص والأزرار */}
          <div className="order-1 md:order-2 text-right">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              حرفيون موثوقون عند باب منزلك
            </h1>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 max-w-md mr-0 ml-auto">
              تواصل مع محترفي خدمات معتمدين وحاصلين على تقييمات عالية لجميع احتياجات صيانة وتحسين منزلك. سريع، موثوق، ومضمون.
            </p>

            <div className="flex flex-wrap gap-3 justify-end mb-10">
              <Link
                href="/requests/new"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-[#0a2e1f] font-bold text-sm px-6 py-3 rounded-full transition-colors"
              >
                احجز خدمة الآن
              </Link>
              <Link
                href="/register?role=craftsman"
                className="border border-white/40 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                انضم كحرفي
              </Link>
            </div>

            <div className="flex gap-10 justify-end border-t border-white/15 pt-6">
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">4.9/5</p>
                <p className="text-xs text-gray-400">متوسط التقييم</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">+10 آلاف</p>
                <p className="text-xs text-gray-400">محترف معتمد</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* شريط الثقة */}
      <section className="bg-[#f3f8f4] border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-gray-700">
          {TRUST_BADGES.map((b) => (
            <span key={b.label} className="flex items-center gap-2">
              <span className="text-[#0f5132]">{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>
      </section>

      {/* الخدمات */}
      <section className="bg-[#eef6ef]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">استكشف خدماتنا</h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            اعثر على المحترف المناسب لأي مهمة، من الإصلاحات السريعة إلى التجديدات الكبرى.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.name}
                href={`/requests/new?service=${encodeURIComponent(s.name)}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-3 hover:border-[#0f5132]/40 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#f3f8f4] flex items-center justify-center text-2xl">
                  {s.icon}
                </div>
                <span className="font-bold text-gray-900 text-sm">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="text-right md:order-2">
            <h3 className="text-[#22c55e] font-extrabold text-xl mb-3">صنعة</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mr-0 ml-auto">
              نصلك بالمحترفين المحليين الموثوقين لجميع احتياجات منزلك.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 items-start text-sm md:order-1">
            <a href="#" className="hover:text-white">اتصل بالدعم</a>
            <a href="#" className="hover:text-white">انضم كحرفي</a>
            <a href="#" className="hover:text-white">شروط الخدمة</a>
            <a href="#" className="hover:text-white">سياسة الخصوصية</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-gray-800 text-xs text-gray-500 text-center">
          © ٢٠٢٤ صنعة لخدمات المنازل الذكية. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}