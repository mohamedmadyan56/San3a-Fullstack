"use client";
import { useRequest } from "@/context/RequestContext";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StepIndicator from "@/components/requests/StepIndicator";
import ServiceTypeStep from "@/components/requests/ServiceTypeStep";
import DescriptionStep from "@/components/requests/DescriptionStep";
import ReviewStep from "@/components/requests/ReviewStep";

export default function RequestPage() {
  const { step } = useRequest();

  return (<div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Navbar/>
      <main className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">طلب خدمة</h1>
            <p className="text-sm text-gray-500 mt-1">أخبرنا بما تحتاجه، وسنجد لك المحترف المناسب</p>
          </div>
          <StepIndicator/>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            {step === 1 && <ServiceTypeStep />}
            {step === 2 && <DescriptionStep />}
            {step === 3 && <ReviewStep />}
          </div>
        </div>
      </main>
      <Footer/>
    </div>);}