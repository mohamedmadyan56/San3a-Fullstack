'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface MatchBreakdown {
  distance: number;
  rating: number;
  responseTime: number;
  history: number;
}

interface MatchResult {
  _id: string;
  name: string;
  phone: string;
  avatar?: string;
  rating: number;
  distanceKm: number;
  avgResponseTimeSeconds: number | null;
  completedWithClient: number;
  matchPercentage: number;
  breakdown: MatchBreakdown;
}

interface ResultsPageProps {
  params: Promise<{ requestId: string }>;
}

// نفس نظام الألوان المستخدم في صفحة الرادار
const BRAND_GREEN = '#0f5132';

// أبعاد دائرة التقدم الدائرية (SVG)
const CIRCLE_SIZE = 220;
const CIRCLE_STROKE = 16;
const CIRCLE_RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE) / 2;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function formatResponseTime(seconds: number | null): string {
  if (seconds === null) return 'فني جديد';
  if (seconds < 60) return `${Math.round(seconds)} ثانية`;
  return `${Math.round(seconds / 60)} دقيقة`;
}

export default function MatchResultsPage({ params }: ResultsPageProps) {
  const { requestId } = use(params);
  const router = useRouter();

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('لم يتم العثور على توكن تسجيل الدخول');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/v1/requests/${requestId}/match-results`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === 'success') {
          setMatches(response.data.data.matches);
        }
      } catch (err: any) {
        console.error('خطأ أثناء جلب نتائج التطابق:', err);
        setError('تعذر تحميل نتائج التطابق، حاول مرة أخرى');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchResults();
  }, [requestId]);

  const handleConfirmSelection = async (craftsman: MatchResult) => {
    setSelectingId(craftsman._id);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/v1/requests/${requestId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConfirmedId(craftsman._id);
    } catch (err: any) {
      console.error('خطأ أثناء تأكيد الاختيار:', err);
      setError('تعذر تأكيد الاختيار، حاول مرة أخرى');
    } finally {
      setSelectingId(null);
    }
  };

  // الكارد الرائد هو الأعلى نسبة تطابق دائماً، بغض النظر عمّا اختاره العميل بالفعل
  const topMatch = matches[0];
  const restMatches = matches.slice(1);

  const dashOffset = topMatch
    ? CIRCLE_CIRCUMFERENCE - (topMatch.matchPercentage / 100) * CIRCLE_CIRCUMFERENCE
    : CIRCLE_CIRCUMFERENCE;

  return (
    <div className="min-h-screen bg-[#eef6ef]" dir="rtl">
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

      <main className="max-w-6xl mx-auto px-6 py-10">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 text-sm rounded-xl text-center font-medium mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 animate-pulse h-96"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-28"></div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="text-center py-16 text-amber-700 bg-amber-50/50 rounded-2xl font-medium border border-amber-100/50">
            <p className="mb-4">لم نجد فنيين متاحين لحساب نتائج التطابق.</p>
            <button
              type="button"
              onClick={() => router.push(`/requests/matching/${requestId}`)}
              className="bg-[#0f5132] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#0c3f27] transition-colors"
            >
              العودة للرادار
            </button>
          </div>
        )}

        {!loading && !error && topMatch && (
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 items-start">
            {/* الكارد الرائد: أعلى نسبة تطابق */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1 text-center">درجة المطابقة</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  بناءً على متطلباتك، يعتبر {topMatch.name} خياراً ممتازاً لهذه المهمة.
                </p>

                <div className="relative mx-auto" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
                  <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} className="-rotate-90">
                    <circle
                      cx={CIRCLE_SIZE / 2}
                      cy={CIRCLE_SIZE / 2}
                      r={CIRCLE_RADIUS}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth={CIRCLE_STROKE}
                    />
                    <circle
                      cx={CIRCLE_SIZE / 2}
                      cy={CIRCLE_SIZE / 2}
                      r={CIRCLE_RADIUS}
                      fill="none"
                      stroke={BRAND_GREEN}
                      strokeWidth={CIRCLE_STROKE}
                      strokeDasharray={CIRCLE_CIRCUMFERENCE}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-[#0f5132]">{topMatch.matchPercentage}%</span>
                    <span className="text-sm text-gray-500 font-medium">تطابق</span>
                  </div>
                </div>

                {/* تفاصيل التطابق (breakdown) */}
                <div className="mt-8 space-y-4">
                  <BreakdownRow
                    label="مطابقة المسافة"
                    weightLabel="(40%)"
                    detail={`ممتاز (${topMatch.distanceKm} كم)`}
                    score={topMatch.breakdown.distance}
                  />
                  <BreakdownRow
                    label="جودة التقييم"
                    weightLabel="(30%)"
                    detail={`فئة متميزة (${topMatch.rating.toFixed(1)})`}
                    score={topMatch.breakdown.rating}
                  />
                  <BreakdownRow
                    label="سرعة الاستجابة"
                    weightLabel="(20%)"
                    detail={`استجابة في ${formatResponseTime(topMatch.avgResponseTimeSeconds)}`}
                    score={topMatch.breakdown.responseTime}
                  />
                  <BreakdownRow
                    label="التاريخ السابق"
                    weightLabel="(10%)"
                    detail={topMatch.completedWithClient > 0 ? `${topMatch.completedWithClient} تعاملات سابقة` : 'فني جديد'}
                    score={topMatch.breakdown.history}
                  />
                </div>
              </div>

              {/* بطاقة جاهز للحجز */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-1">جاهز للحجز؟</h3>
                <p className="text-sm text-gray-500 mb-4">
                  أكد اختيارك لـ {topMatch.name} لمباشرة العمل.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleConfirmSelection(topMatch)}
                    disabled={selectingId === topMatch._id || confirmedId === topMatch._id}
                    className="flex-1 bg-gray-900 hover:bg-black text-white text-sm font-bold py-3 rounded-full transition-colors disabled:opacity-60"
                  >
                    {confirmedId === topMatch._id
                      ? 'تم الحجز ✓'
                      : selectingId === topMatch._id
                      ? 'جاري التأكيد...'
                      : 'احجز الآن'}
                  </button>
                  <button
                    type="button"
                    className="flex-1 border border-gray-300 text-gray-700 text-sm font-bold py-3 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    عرض الملف
                  </button>
                </div>
              </div>
            </div>

            {/* قائمة كل النتائج */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-gray-900">تم العثور على {matches.length} نتائج</h3>
                <span className="text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                  الأفضل مطابقة ▾
                </span>
              </div>

              <div className="space-y-3">
                {matches.map((m) => {
                  const isTop = m._id === topMatch._id;
                  const isConfirmed = confirmedId === m._id;
                  return (
                    <div
                      key={m._id}
                      className={`rounded-xl border p-4 transition-all ${
                        isTop ? 'border-[#0f5132] bg-[#eef6ef]' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            {m.rating.toFixed(1)} ⭐
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <h4 className="font-bold text-gray-900 text-sm">{m.name}</h4>
                            {m.completedWithClient > 0 && (
                              <span className="text-[10px] text-[#0f5132] font-bold bg-[#eef6ef] px-2 py-0.5 rounded-full">
                                تعامل سابق
                              </span>
                            )}
                          </div>
                          <div className="w-9 h-9 bg-white text-[#0f5132] rounded-full flex items-center justify-center text-base font-bold border border-gray-200">
                            👨‍🔧
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-200/70 pt-3 mb-3">
                        <div>
                          <p className="text-[11px] text-gray-400">المسافة</p>
                          <p className="text-xs font-bold text-gray-700">{m.distanceKm} كم</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400">الاستجابة</p>
                          <p className="text-xs font-bold text-gray-700">{formatResponseTime(m.avgResponseTimeSeconds)}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400">التطابق</p>
                          <p className="text-xs font-bold text-[#0f5132]">{m.matchPercentage}%</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConfirmSelection(m)}
                        disabled={selectingId === m._id || isConfirmed}
                        className={`w-full text-xs font-bold py-2.5 rounded-full transition-colors disabled:opacity-60 ${
                          isConfirmed
                            ? 'bg-[#0f5132] text-white'
                            : 'bg-white border border-[#0f5132] text-[#0f5132] hover:bg-[#0f5132] hover:text-white'
                        }`}
                      >
                        {isConfirmed ? 'تم الاختيار ✓' : selectingId === m._id ? 'جاري الاختيار...' : 'اختيار المحترف'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && matches.length > 0 && (
          <button
            type="button"
            onClick={() => router.push(`/requests/matching/${requestId}`)}
            className="mt-6 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100/70 px-4 py-2.5 rounded-full transition-colors mx-auto block"
          >
            العودة للرادار وتوسيع البحث
          </button>
        )}
      </main>

      {/* الفوتر */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-[#22c55e] font-bold text-base">صنعة</span>
          <span className="text-gray-500">© ٢٠٢٦ صنعة لخدمات المنازل الذكية. جميع الحقوق محفوظة.</span>
        </div>
      </footer>
    </div>
  );
}

// صف واحد من تفاصيل التطابق (مسافة / تقييم / استجابة / تاريخ) مع شريط تقدم
function BreakdownRow({
  label,
  weightLabel,
  detail,
  score,
}: {
  label: string;
  weightLabel: string;
  detail: string;
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-xs">
        <span className="text-gray-400">{detail}</span>
        <span className="font-bold text-gray-700">
          {label} <span className="text-gray-400 font-normal">{weightLabel}</span>
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0f5132] rounded-full"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        ></div>
      </div>
    </div>
  );
}