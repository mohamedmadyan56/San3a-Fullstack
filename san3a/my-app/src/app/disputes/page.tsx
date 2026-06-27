import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisputesSidebar from "@/components/disputes/DisputesSidebar";
import DisputesTable from "@/components/disputes/DisputesTable";

export default function DisputesPage() {
  return (<div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Navbar/>
      <div className="flex flex-1">
        <DisputesSidebar/>
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">إدارة النزاعات</h1>
              <p className="text-sm text-gray-500 mt-1">مراجعة وحل طلبات تصعيد الخدمة النشطة</p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-lg border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500"/>
              ١٢ مفتوح
            </span>
          </div>
          <DisputesTable/>
        </main>
      </div>
      <Footer/>
    </div>);}