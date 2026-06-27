"use client"; 
import { useState } from "react";
import Link from "next/link";
import { useClient } from "@/context/ClientContext";

const categoryColors: Record<string, string> = {
  سباكة: "bg-blue-50 text-blue-600",
  كهرباء: "bg-yellow-50 text-yellow-600",
  تنظيف: "bg-green-50 text-green-600",
  ذكي: "bg-purple-50 text-purple-600",
  خياطة: "bg-pink-50 text-pink-600",
  نقاشة: "bg-orange-50 text-orange-600",
};

const categoryIcons: Record<string, React.ReactNode> = {
  سباكة: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>),
  كهرباء: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>),
  تنظيف: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>),
  ذكي: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>),
  خياطة: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 0l9 9m-9-9l9-9m0 18a3 3 0 100-6 3 3 0 000 6z" />
    </svg>),
  نقاشة: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>),};

export default function ServiceCards() {
  const { services } = useClient();
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 4);
  return (<div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">اكتشف خدماتنا</h2>
        <button onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
          {showAll ? "عرض أقل" : "عرض المزيد"}
          <svg className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {visibleServices.map((service) => (<div key={service.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${categoryColors[service.category] || "bg-gray-50 text-gray-500"}`}>
              {categoryIcons[service.category]}
            </div>
            <div className="text-sm font-semibold text-gray-800">{service.title}</div>
            <div className="text-xs text-gray-400 mt-1 leading-relaxed">{service.description}</div>
            <div className="flex items-center gap-1 mt-2">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-gray-500">{service.rating}</span>
            </div>
            <Link
              href={`/requests?service=${service.category}`}
              className="mt-3 w-full py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors block text-center">
              احجز الآن
            </Link>
          </div>))}
      </div>
    </div>);}