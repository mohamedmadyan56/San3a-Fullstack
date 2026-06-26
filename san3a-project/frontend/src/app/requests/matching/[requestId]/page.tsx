'use client';
import { useEffect, useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Craftsman {
  _id: string;
  name: string;
  phone: string;
  avatar?: string;
  rating?: number;
  distance?: number; // بالمتر، راجعة من $geoNear في الباك إند
}

interface MatchingPageProps {
  params: Promise<{ requestId: string }>;
}

// أقصى وقت انتظار قبل ما نعرض خيار توسيع نطاق البحث (بالثواني)
const TIMEOUT_THRESHOLD = 60;
const POLL_INTERVAL_MS = 4000;
// بعد المدة دي (ثابتة)، ننتقل تلقائياً لصفحة نتائج التطابق، أيًا كان عدد الفنيين
const AUTO_REDIRECT_SECONDS = 15;

export default function MatchingPage({ params }: MatchingPageProps) {
  const { requestId } = use(params);
  const router = useRouter();

  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [searchRadiusExpanded, setSearchRadiusExpanded] = useState<boolean>(false);

  // نستخدم ref عشان نعرف الفنيين الجداد (لإضافة أنيميشن fade-in بس على الجداد)
  const knownIdsRef = useRef<Set<string>>(new Set());
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchNearbyCraftsmen = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('لم يتم العثور على توكن تسجيل الدخول');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/v1/requests/${requestId}/nearby-craftsmen`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: searchRadiusExpanded ? { radius: 10000 } : undefined,
          }
        );

        if (response.data.status === 'success') {
          const fetched: Craftsman[] = response.data.data.craftsmen;

          // تحديد الفنيين الجداد اللي لسه ظاهرين أول مرة عشان الأنيميشن
          const freshIds = new Set<string>();
          fetched.forEach((c) => {
            if (!knownIdsRef.current.has(c._id)) {
              freshIds.add(c._id);
              knownIdsRef.current.add(c._id);
            }
          });
          setNewIds(freshIds);

          setCraftsmen(fetched);
          setError('');
        }
      } catch (err: any) {
        console.error('خطأ أثناء تحديث الرادار:', err);
        // لا نضع خطأ يعطل الشاشة لأن الرادار مستمر في المحاولة (Polling)
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyCraftsmen();
    const interval = setInterval(fetchNearbyCraftsmen, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [requestId, searchRadiusExpanded]);

  // عداد الوقت المنقضي منذ بداية البحث
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // انتقال تلقائي لصفحة نتائج التطابق بعد مدة ثابتة، طالما فيه فني واحد على الأقل
  // الانتقال اليدوي عبر الزر بيتم فوراً بدون انتظار الوقت ده
  useEffect(() => {
    if (elapsedSeconds >= AUTO_REDIRECT_SECONDS && craftsmen.length > 0) {
      router.push(`/requests/matching/${requestId}/results`);
    }
  }, [elapsedSeconds, craftsmen.length, requestId, router]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectCraftsman = (craftsman: Craftsman) => {
    setSelectedId(craftsman._id);
    // TODO: مناداة API لإرسال طلب مباشر لهذا الفني أو تأكيد الاختيار
  };

  const showTimeoutNotice = elapsedSeconds >= TIMEOUT_THRESHOLD && !searchRadiusExpanded;

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
        <div className="text-center mb-4">
          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">جاري البحث عن أقرب فني متاح...</h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            يقوم النظام بمسح دائرة قطرها {searchRadiusExpanded ? '١٠' : '٥'} كم حول موقعك حالياً
          </p>
        </div>

        {/* عداد الوقت المنقضي */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f5132] animate-pulse"></span>
          <span className="text-sm font-mono font-black text-gray-600 tracking-widest">
            {formatTime(elapsedSeconds)}
          </span>
        </div>

        {/* أنيميشن الرادار الدائري المتناسق مع الـ Theme الأخضر */}
        <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full bg-[#0f5132] opacity-10 animate-ping"></div>
          <div className="absolute w-32 h-32 rounded-full bg-[#0f5132] opacity-20 animate-pulse"></div>
          <div className="relative w-16 h-16 rounded-full bg-[#0f5132] text-white flex items-center justify-center shadow-xl font-bold border-2 border-white text-xl">
            📍
          </div>
        </div>

        {/* رسالة توسيع نطاق البحث بعد مرور وقت طويل */}
        {showTimeoutNotice && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 text-center">
            <p className="text-sm font-bold text-amber-800 mb-2">
              لم نجد فنيين كافيين بعد، حابب نوسّع نطاق البحث؟
            </p>
            <button
              type="button"
              onClick={() => setSearchRadiusExpanded(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
            >
              توسيع النطاق إلى ١٠ كم
            </button>
          </div>
        )}

        {/* زر الانتقال اليدوي لصفحة النتائج، يظهر بمجرد وجود فني واحد على الأقل */}
        {craftsmen.length > 0 && (
          <button
            type="button"
            onClick={() => router.push(`/requests/matching/${requestId}/results`)}
            className="mb-4 bg-[#0f5132] hover:bg-[#0c3f27] text-white text-sm font-bold py-3 rounded-full transition-colors w-full"
          >
            عرض النتائج ({craftsmen.length})
          </button>
        )}

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

          {/* Skeleton loading بدل النص الفارغ */}
          {loading && !error && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1.5">
                      <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
                      <div className="h-2.5 w-14 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && craftsmen.length === 0 && !error && (
            <div className="text-center py-6 text-amber-700 bg-amber-50/50 rounded-xl font-medium text-xs border border-amber-100/50">
              لم نجد فنيين متاحين في محيطك حالياً، الرادار مستمر في المسح تلقائياً...
            </div>
          )}

          {/* قائمة الفنيين */}
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {craftsmen.map((craftsman) => {
              const isNew = newIds.has(craftsman._id);
              const isSelected = selectedId === craftsman._id;
              const distanceKm =
                typeof craftsman.distance === 'number'
                  ? (craftsman.distance / 1000).toFixed(1)
                  : null;
              const rating = craftsman.rating ?? 4.5;

              return (
                <div
                  key={craftsman._id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#eef6ef] border-[#0f5132]'
                      : 'bg-gray-50 border-gray-100 hover:border-[#0f5132]/30'
                  } ${isNew ? 'animate-[fadeIn_0.5s_ease-out]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#eef6ef] text-[#0f5132] rounded-full flex items-center justify-center text-lg font-bold">
                      👨‍🔧
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-gray-900 text-sm">{craftsman.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                          ⭐ {rating.toFixed(1)}
                        </span>
                        {distanceKm && (
                          <span className="text-xs text-gray-500">
                            على بعد {distanceKm} كم
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectCraftsman(craftsman)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors ${
                      isSelected
                        ? 'bg-[#0f5132] text-white'
                        : 'bg-green-100 text-green-800 hover:bg-[#0f5132] hover:text-white'
                    }`}
                  >
                    {isSelected ? 'تم الاختيار ✓' : 'اختيار'}
                  </button>
                </div>
              );
            })}
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

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}