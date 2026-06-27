"use client";
import { useProfessionals } from "@/context/ProfessionalsContext";

export default function MatchScore() {
  const { selected } = useProfessionals();
  if (!selected) return null;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (selected.matchScore / 100) * circumference;

  return (<div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 text-right">درجة المطابقة</h2>
        <p className="text-xs text-gray-400 mt-1 text-right">
          بناءً على متطلباتك، يُعدّ {selected.name} خياراً ممتازاً لهذه المهمة
        </p>
      </div>
      <div className="flex justify-center">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="#111827"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{selected.matchScore}%</span>
            <span className="text-xs text-gray-400">تطابق</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {selected.matchDetails.map((detail) => (
          <div key={detail.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span>{detail.icon}</span>
                {detail.label}
              </span>
              <span className="text-xs font-medium text-gray-700">({detail.percentage}%)</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-900 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(detail.percentage, 100)}%` }}/>
            </div>
          </div>))}
      </div>
      <div className="pt-2 space-y-2">
        <p className="text-xs text-gray-500 text-right font-medium">جاهز للحجز؟</p>
        <p className="text-xs text-gray-400 text-right">
          أخذ اختيارك لـ{selected.name} وتفرقك منطق منظم المنزل الذكي
        </p>
        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
            عرض الملف
          </button>
          <button className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors">
            احجز الآن
          </button>
        </div>
      </div>
    </div>);}