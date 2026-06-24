'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Craftsman {
  _id: string;
  name: string;
  phone: string;
}

interface MatchingPageProps {
  params: Promise<{ requestId: string }>;
}

export default function MatchingPage({ params }: MatchingPageProps) {
  // فك الـ Promise الخاص بالـ params للحصول على الـ requestId ديناميكياً
  const { requestId } = use(params);
  const router = useRouter();

  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNearbyCraftsmen = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('لم يتم العثور على توكن تسجيل الدخول');
          return;
        }

        // مناداة الـ Endpoint الجغرافية اللي عملناها في الباك إند
        const response = await axios.get(
          `http://localhost:5000/api/v1/requests/${requestId}/nearby-craftsmen`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.status === 'success') {
          setCraftsmen(response.data.data.craftsmen);
        }
      } catch (err: any) {
        console.error('خطأ أثناء تحديث الرادار:', err);
        // لا نضع خطأ يعطل الشاشة لأن الرادار مستمر في المحاولة (Polling)
      } finally {
        setLoading(false);
      }
    };

    // تشغيل فوري عند فتح الشاشة
    fetchNearbyCraftsmen();

    // تحديث تلقائي (Polling) كل 4 ثوانٍ للبحث عن الفنيين المتاحين لايف
    const interval = setInterval(fetchNearbyCraftsmen, 4000);

    // تنظيف الـ interval عند مغادرة الصفحة
    return () => clearInterval(interval);
  }, [requestId]);

  return (
    <div className="min-h-screen bg-[#eef6ef] flex flex-col justify-between" dir="rtl">
      {/* الهيدر */}
      <header className="border-b border-gray-200/70 bg-[#eef6ef]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#0f5132] flex items-center justify-center text-white text-xs">
              ⌂
            </div>
            <span className="text-xl font-bold text-gray-900">صنعة</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a href="#" className="hover:text-gray-900">البحث عن خدمات</a>
            <a href="#" className="hover:text-gray-900">حجوزاتي</a>
            <a href="#" className="hover:text-gray-900">محترفون معتمدون</a>
          </nav>
          <button type="button" className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-black transition-colors">
            لوحة التحكم
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي للرادار */}
      <main className="max-w-md w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">جاري البحث عن أقرب فني متاح...</h2>
          <p className="text-sm text-gray-500">يقوم النظام بمسح دائرة قطرها ٥ كم حول موقعك حالياً</p>
        </div>

        {/* أنيميشن الرادار الدائري المتناسق مع الـ Theme الأخضر */}
        <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full bg-[#0f5132] opacity-10 animate-ping"></div>
          <div className="absolute w-32 h-32 rounded-full bg-[#0f5132] opacity-20 animate-pulse"></div>
          <div className="relative w-16 h-16 rounded-full bg-[#0f5132] text-white flex items-center justify-center shadow-xl font-bold border-2 border-white text-xl">
            📍
          </div>
        </div>

        {/* كارت عرض النتائج */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 mb-2 border-b pb-2 text-right">
            الفنيين المتواجدين في النطاق حالياً ({craftsmen.length})
          </h3>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 text-xs rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {loading && !error && (
            <p className="text-center text-gray-400 text-xs py-4">جاري تشغيل الرادار الجغرافي...</p>
          )}

          {!loading && craftsmen.length === 0 && !error && (
            <div className="text-center py-6 text-amber-700 bg-amber-50/50 rounded-xl font-medium text-xs border border-amber-100/50">
              لم نجد فنيين متاحين في محيطك حالياً، الرادار مستمر في المسح تلقائياً...
            </div>
          )}

          {/* قائمة الفنيين */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {craftsmen.map((craftsman) => (
              <div
                key={craftsman._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#0f5132]/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#eef6ef] text-[#0f5132] rounded-full flex items-center justify-center text-lg font-bold">
                    👨‍🔧
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-gray-900 text-sm">{craftsman.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{craftsman.phone}</p>
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded-full animate-pulse">
                  قريب ومتاح
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* زر إلغاء الطلب */}
        <button
          type="button"
          onClick={() => router.push('/requests/new')}
          className="mt-6 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100/70 px-4 py-2.5 rounded-full transition-colors mx-auto"
        >
          إلغاء الطلب والعودة
        </button>
      </main>

      {/* الفوتر */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-[#22c55e] font-bold text-base">صنعة</span>
          <span className="text-gray-500">© ٢٠٢٦ صنعة لخدمات المنازل الذكية. جميع الحقوق محفوظة.</span>
        </div>
      </footer>
    </div>
  );
}