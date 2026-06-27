"use client";
import { useDisputes, DisputeStatus } from "@/context/DisputesContext";
import DisputeRow from "./DisputeRow";

const filterOptions: DisputeStatus[] = ["الكل", "مقبول", "قيد المراجعة", "مرفوض", "محلول"];
export default function DisputesTable() {
  const { paginated, selectedStatus, setSelectedStatus, currentPage, setCurrentPage, totalPages, totalItems, itemsPerPage } = useDisputes();
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  return (<div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {filterOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-colors
              ${selectedStatus === status
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {status}
          </button> ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir="rtl">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-4 py-3 w-8" />
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">رقم الطلب</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">العميل</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">الفني</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">الخدمة</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">المبلغ</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((dispute) => (
                  <DisputeRow key={dispute.id} dispute={dispute} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-gray-400 text-sm">
                    لا توجد نزاعات مطابقة
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between" dir="rtl">
        <p className="text-sm text-gray-500">عرض {start} إلى {end} من أصل {totalItems} نشاط</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${page === currentPage ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              {page}
            </button> ))}
          <button onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>);}