"use client";
import { useState } from "react";
import Link from "next/link";

const allActivities = [
  {id: 1,
    title: "اكتملت خدمة التنظيف",
    worker: "أحمد محمود • أمس",
    time: "أمس",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>),},
  {id: 2,
    title: "موعد قادم لتطبيق الدهان",
    worker: "حسام محمد • الساعة 10:00",
    time: "غداً",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>),},
  {id: 3,
    title: "تم المساعدة في الخياطة",
    worker: "عمر تامر • منذ يومين، 12 أكتوبر",
    time: "منذ يومين",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>),},
  {id: 4,
    title: "إصلاح سباكة مكتمل",
    worker: "خالد سرحان • منذ 3 أيام",
    time: "منذ 3 أيام",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>),},
  {id: 5,
    title: "فحص كهرباء مجدول",
    worker: "محمد عامر • الأسبوع القادم",
    time: "الأسبوع القادم",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>),},];
export default function ActivityPanel() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? allActivities : allActivities.slice(0, 3);
  return (<aside className="w-64 shrink-0 flex flex-col gap-4 py-6 px-3">
      <Link href="/emergency">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 cursor-pointer hover:bg-red-100 transition-colors">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-red-700">خدمة الطوارئ</div>
              <div className="text-xs text-red-500 mt-0.5 leading-relaxed">
                هل تواجه مشكلة طارئة؟ اضغط هنا للحصول على مساعدة فورية 24/7
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-800">النشاط الأخير</h2>
        <div className="flex flex-col gap-3">
          {visible.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-medium text-gray-800">{item.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.worker}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1">
          <svg className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {showAll ? "عرض أقل" : "عرض الكل"}
        </button>
      </div>
    </aside>
  );}