"use client";
import { useState } from "react";
import WorkerNavbar from "@/components/worker/WorkerNavbar";
import Footer from "@/components/layout/Footer";
import WorkerSidebar from "@/components/worker/WorkerSidebar";
import StatsCard from "@/components/worker/StatsCard";
import WeeklyChart from "@/components/worker/WeeklyChart";
import RecentTasks from "@/components/worker/RecentTasks";

const stats = [
  {label: "أرباح اليوم",
    value: "١,٣٤٠ ج.م",
    change: "٧٢٪ +",
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>),},
  {label: "المهام المنجزة",
    value: "١٢",
    change: "٢٠ +",
    positive: true,
    icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>),},
  {label: "التقييم",
    value: "٤.٨",
    change: "٠.٥ —",
    positive: false,
    icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>),},
  {label: "معدل الاستجابة",
    value: "٩٥٪",
    change: "٢٪ +",
    positive: true,
    icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>),},];
export default function WorkerPage() {
  const [isOnline, setIsOnline] = useState(true);
  return (<div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <WorkerNavbar />
      <div className="flex flex-1">
        <WorkerSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم العامل</h1>
              <p className="text-sm text-gray-500 mt-1">نظرة عامة على أدائك وأرباحك</p>
            </div>
            <div className="flex items-center bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setIsOnline(false)}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full transition-colors
                  ${!isOnline ? "bg-gray-900 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
                {!isOnline && <span className="w-2 h-2 rounded-full bg-orange-400" />}
                غير متصل
              </button>
              <button onClick={() => setIsOnline(true)}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full transition-colors
                  ${isOnline ? "bg-gray-900 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
                {isOnline && <span className="w-2 h-2 rounded-full bg-green-400" />}
                متصل
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatsCard key={s.label} {...s} />))}
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <WeeklyChart/>
            <RecentTasks/>
          </div>
        </main>
      </div>
      <Footer/>
    </div>);}