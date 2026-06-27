"use client";
import { useRequest } from "@/context/RequestContext";

const steps = [
  { number: 1, label: "تفاصيل الخدمة" },
  { number: 2, label: "الوصف" },
  { number: 3, label: "المراجعة" },
];

export default function StepIndicator() {
  const { step } = useRequest();
  return (<div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.number} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
              ${step === s.number
                ? "bg-gray-900 text-white"
                : step > s.number
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-500"}`}>
              {step > s.number ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : s.number}
            </div>
            <span className={`text-xs ${step >= s.number ? "text-gray-800 font-medium" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-24 h-0.5 mb-4 mx-1 transition-colors ${step > s.number ? "bg-gray-900" : "bg-gray-200"}`} />)}
        </div>))}
    </div>);}