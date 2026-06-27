"use client";
import { useState } from "react";
import { Dispute, useDisputes } from "@/context/DisputesContext";

const statusStyles: Record<string, string> = {
  "قيد المراجعة": "bg-yellow-50 text-yellow-600",
  "مقبول": "bg-green-50 text-green-600",
  "مرفوض": "bg-red-50 text-red-500",
  "محلول": "bg-blue-50 text-blue-600",
};

export default function DisputeRow({ dispute }: { dispute: Dispute }) {
  const { resolveDispute, rejectDispute } = useDisputes();
  const [expanded, setExpanded] = useState(false);
  return (<><tr className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
        <td className="px-4 py-3">
          <button onClick={() => setExpanded(!expanded)} className="p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors">
            <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </td>
        <td className="px-4 py-3 text-sm font-medium text-gray-700">{dispute.requestNumber}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
              {dispute.client.charAt(0)}
            </div>
            <span className="text-sm text-gray-700">{dispute.client}</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">
              {dispute.worker.charAt(0)}
            </div>
            <span className="text-sm text-gray-700">{dispute.worker}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{dispute.service}</td>
        <td className="px-4 py-3 text-sm font-medium text-gray-800">{dispute.amount}</td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[dispute.status] || "bg-gray-100 text-gray-600"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {dispute.status}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50/50 border-b border-gray-100">
          <td colSpan={7} className="px-6 py-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  أداء العميل
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">"{dispute.clientMessage}"</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  رد العامل
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">"{dispute.workerMessage}"</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={()=> rejectDispute(dispute.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                رفض الأدعاء
              </button>
              <button
                onClick={() => resolveDispute(dispute.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 text-sm font-medium rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                تصعيد للإدارة
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                إصدار إسترداد
              </button>
            </div>
          </td>
        </tr>)}</>);}