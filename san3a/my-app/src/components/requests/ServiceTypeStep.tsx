"use client";
import { useRequest, ServiceType } from "@/context/RequestContext";

const services: { type: ServiceType; label: string; icon: React.ReactNode }[] = [
  {type: "سباكة",
    label: "سباكة",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>),},
  {type: "كهرباء",
    label: "كهرباء",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>),},
  {type: "تكييف",
    label: "تكييف",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>),},
  {type: "تنظيف",
    label: "تنظيف",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>),},];

export default function ServiceTypeStep() {
  const { serviceType, setServiceType, location, setLocation, schedule, setSchedule, nextStep } = useRequest();
  return (<div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3 text-right">بماذا تحتاج للمساعدة؟</h2>
        <div className="grid grid-cols-4 gap-3">
          {services.map((s) => (
            <button key={s.type}
              onClick={() => setServiceType(s.type)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                ${serviceType === s.type
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
              {s.icon}
              <span className="text-sm font-medium">{s.label}</span>
            </button>))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2 text-right">موقع الخدمة</label>
        <div className="relative">
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <input type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="أدخل موقع الخدمة"
            className="w-full pr-9 pl-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition text-right"/>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2 text-right">متى تحتاج الخدمة؟</label>
        <div className="flex gap-2">
          <button onClick={() => setSchedule("الآن")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
              ${schedule === "الآن" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            الآن
          </button>
          <button onClick={() => setSchedule("جدولة")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
              ${schedule === "جدولة" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            جدولة
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">© قد يتم تطبيق رسوم خدمة طارئة</p>
      </div>
      <div className="flex justify-between pt-2">
        <button className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">إلغاء</button>
        <button onClick={nextStep}
          disabled={!serviceType || !location}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          المتابعة للوصف
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>);}