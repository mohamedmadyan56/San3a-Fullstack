"use client";
import { useState } from "react";
import { useClient } from "@/context/ClientContext";

const lastServiceData = {
  title: "تنظيف عميق",
  worker: "أحمد محمود",
  date: "12 أكتوبر 2024",
  amount: "٨٠ ج.م",
  status: "مكتملة",
  rating: 4.9,
};

const favoritesData = [
  { id: 1, name: "أحمد محمود", service: "تنظيف", rating: 4.9 },
  { id: 2, name: "خالد سرحان", service: "سباكة", rating: 4.8 },
  { id: 3, name: "محمد عامر", service: "كهرباء", rating: 4.7 },
  { id: 4, name: "عمر تامر", service: "نقاشة", rating: 4.6 },
  { id: 5, name: "سامي حسن", service: "طرزي", rating: 4.5 },
];

const activeRequestsData = [
  { id: 1, title: "إصلاح سباكة", worker: "خالد سرحان", date: "غداً 10:00", status: "مجدول" },
  { id: 2, title: "فحص كهرباء", worker: "محمد عامر", date: "الأسبوع القادم", status: "قيد الانتظار" },
];

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>);}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

function StatCard({ label, value, icon, color, onClick }: StatCardProps) {
  return (<div onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-2xl font-bold text-gray-900 mt-0.5">{value}</div>
      </div>
    </div>);}

export default function ClientStats() {
  const { stats } = useClient();
  const [activeModal, setActiveModal] = useState<"last" | "favorites" | "requests" | null>(null);
  return (<>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="آخر خدمة"
          value={stats.completedServices}
          color="bg-green-50 text-green-600"
          onClick={() => setActiveModal("last")}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>}/>
        <StatCard label="المفضلة"
          value={stats.favorites}
          color="bg-red-50 text-red-500"
          onClick={() => setActiveModal("favorites")}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>}/>
        <StatCard label="طلبات نشطة"
          value={stats.activeRequests}
          color="bg-blue-50 text-blue-600"
          onClick={() => setActiveModal("requests")}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>}/>
      </div>
      {activeModal === "last" && (<Modal title="تفاصيل آخر خدمة" onClose={() => setActiveModal(null)}>
          <div className="space-y-3">
            {[{ label: "الخدمة", value: lastServiceData.title },
              { label: "العامل", value: lastServiceData.worker },
              { label: "التاريخ", value: lastServiceData.date },
              { label: "المبلغ", value: lastServiceData.amount },
              { label: "الحالة", value: lastServiceData.status },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <span className="text-xs text-gray-400">{row.label}</span>
                <span className="text-sm font-medium text-gray-800">{row.value}</span>
              </div>))}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-gray-400">التقييم</span>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-gray-800">{lastServiceData.rating}</span>
              </div>
            </div>
          </div>
        </Modal>)}
      {activeModal === "favorites" && (<Modal title="قائمة المفضلة" onClose={() => setActiveModal(null)}>
          <div className="flex flex-col gap-3">
            {favoritesData.map((fav) => (<div key={fav.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-bold">
                    {fav.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{fav.name}</div>
                    <div className="text-xs text-gray-400">{fav.service}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-gray-600">{fav.rating}</span>
                </div>
              </div>))}
          </div>
        </Modal> )}
      {activeModal === "requests" && (<Modal title="الطلبات النشطة" onClose={() => setActiveModal(null)}>
          <div className="flex flex-col gap-3">
            {activeRequestsData.map((req) => (<div key={req.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">{req.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    req.status === "مجدول" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400">{req.worker} • {req.date}</div>
              </div>))}
          </div>
        </Modal>)}</>);}