"use client";
import { useRequest } from "@/context/RequestContext";

export default function DescriptionStep() {
  const { description, setDescription, nextStep, prevStep } = useRequest();

  return (<div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-1 text-right">صف المشكلة</h2>
        <p className="text-sm text-gray-400 mb-3 text-right">اشرح المشكلة بالتفصيل لمساعدة المحترف</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="مثال: تسريب ماسورة المطبخ، المياه بتتجمع تحت الحوض..."
          rows={5}
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition text-right resize-none"/>
        <p className="text-xs text-gray-400 mt-1 text-left">{description.length} / 500</p>
      </div>
      <div className="flex justify-between pt-2">
        <button onClick={prevStep}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          المتابعة للوصف
        </button>
        <button onClick={nextStep}
          disabled={!description.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          المراجعة
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>);}