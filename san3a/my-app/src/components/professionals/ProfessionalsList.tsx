"use client";
import { useProfessionals } from "@/context/ProfessionalsContext";
import ProfessionalCard from "./ProfessionalCard";

export default function ProfessionalsList() {
  const { professionals } = useProfessionals();
  return (<div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          أفضل مطابقة
        </button>
        <p className="text-sm font-semibold text-gray-800">
          تم العثور على {professionals.length} نتائج
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {professionals.map((p) => (
          <ProfessionalCard key={p.id} professional={p} />))}
      </div>
    </div>);}