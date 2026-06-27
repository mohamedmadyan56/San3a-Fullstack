"use client";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,} from "recharts";

const data = [
  { day: "الأحد", fullDay: "الأحد", tasks: 0, amount: 0 },
  { day: "الاثنين", fullDay: "الاثنين", tasks: 0, amount: 0 },
  { day: "الثلاثاء", fullDay: "الثلاثاء", tasks: 0, amount: 0 },
  { day: "الأربعاء", fullDay: "الأربعاء", tasks: 0, amount: 0 },
  { day: "الخميس", fullDay: "الخميس", tasks: 0, amount: 0 },
  { day: "الجمعة", fullDay: "الجمعة", tasks: 0, amount: 0 },
  { day: "السبت", fullDay: "السبت", tasks: 3, amount: 1340 },];

export default function WeeklyChart() {
  const [showModal, setShowModal] = useState(false);
  return (<>
     <div className="bg-white rounded-xl border border-gray-100 p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">الأرباح الأسبوعية</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
            عرض التفاصيل
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
              formatter={(value) => [`${value} ج.م`, "الأرباح"]}/>
            <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fill="url(#earningsGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()} dir="rtl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">تفاصيل الأرباح الأسبوعية</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-xs font-semibold text-gray-400">اليوم</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400">عدد المهام</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.day} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-sm text-gray-700">{row.fullDay}</td>
                    <td className="py-3 text-sm text-gray-700">{row.tasks}</td>
                    <td className="py-3 text-sm font-medium text-gray-900">{row.amount > 0 ? `${row.amount} ج.م` : "—"}</td>
                  </tr>))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-100">
                  <td className="pt-3 text-sm font-bold text-gray-900">الإجمالي</td>
                  <td className="pt-3 text-sm font-bold text-gray-900">{data.reduce((s, r) => s + r.tasks, 0)}</td>
                  <td className="pt-3 text-sm font-bold text-gray-900">{data.reduce((s, r) => s + r.amount, 0)} ج.م</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>)}
    </>);}