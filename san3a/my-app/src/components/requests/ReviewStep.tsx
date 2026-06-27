"use client";
import { useRequest } from "@/context/RequestContext";
import { useRouter } from "next/navigation";

export default function ReviewStep() {
  const { serviceType, location, schedule, description, prevStep, reset } = useRequest();
  const router = useRouter();
  function handleSubmit() {
    reset();
    router.push("/customer");
  }

  return (<div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-1 text-right">مراجعة الطلب</h2>
        <p className="text-sm text-gray-400 mb-4 text-right">تأكد من البيانات قبل الإرسال</p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
          {[
            { label: "نوع الخدمة", value: serviceType },
            { label: "الموقع", value: location },
            { label: "الوقت", value: schedule },
            { label: "الوصف", value: description },
          ].map((row) => (
            <div key={row.label} className="flex items-start justify-between px-4 py-3">
              <span className="text-xs text-gray-400">{row.label}</span>
              <span className="text-sm font-medium text-gray-800 text-right max-w-xs">{row.value}</span>
            </div>))}
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <button onClick={prevStep}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          رجوع
        </button>
        <button onClick={handleSubmit}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors">
          إرسال الطلب
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>);}