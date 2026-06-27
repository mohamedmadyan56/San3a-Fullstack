"use client";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientSidebar from "@/components/client/ClientSidebar";
import ClientStats from "@/components/client/ClientStatus";
import ServiceCards from "@/components/client/ServiceCards";
import ActivityPanel from "@/components/client/ActivityPanel";

export default function ClientPage() {
  return (<div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Navbar/>
      <div className="flex flex-1">
        <ClientSidebar/>
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">أهلاً سارة 👋</h1>
            <p className="text-sm text-gray-500 mt-1">نظرة عامة على خدماتك وطلباتك</p>
          </div>
          <ClientStats/>
          <ServiceCards/>
        </main>
        <ActivityPanel/>
      </div>
      <Footer/>
    </div>);}