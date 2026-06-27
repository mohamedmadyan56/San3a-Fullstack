"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
export type DisputeStatus = "الكل" | "مقبول" | "قيد المراجعة" | "مرفوض" | "محلول";
export interface Dispute {
  id: string;
  requestNumber: string;
  client: string;
  worker: string;
  service: string;
  amount: string;
  status: DisputeStatus;
  clientMessage: string;
  workerMessage: string;
}

interface DisputesContextType {
  disputes: Dispute[];
  filtered: Dispute[];
  selectedStatus: DisputeStatus;
  setSelectedStatus: (s: DisputeStatus) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  paginated: Dispute[];
  resolveDispute: (id: string) => void;
  rejectDispute: (id: string) => void;
}

const ITEMS_PER_PAGE = 3;

const defaultDisputes: Dispute[] = [
  {id: "1",
    requestNumber: "#REQ-8992",
    client: "أحمد حسن",
    worker: "عمر السباك",
    service: "إصلاح نسب أنابيب",
    amount: "٤٥ ج.م",
    status: "قيد المراجعة",
    clientMessage: "العامل لم يكمل العمل بشكل صحيح وترك المكان في حالة سيئة",
    workerMessage: "قمت بإنجاز العمل المطلوب بالكامل وفق الاتفاق",
  },
  {id: "2",
    requestNumber: "#REQ-8991",
    client: "سارة كريم",
    worker: "تيك فيكس للحلول",
    service: "تركيب قفل ذكي",
    amount: "١٢٠ ج.م",
    status: "مرفوض",
    clientMessage: "قام العامل بإتلاف الباب أثناء تركيب القفل الذكي",
    workerMessage: "قام الفريق بإنجاز تركيب الباب أثناء تركيب القفل الذكي، أفيد بأن أداء العامل يسمل",
  },
  {id: "3",
    requestNumber: "#REQ-8985",
    client: "من نيل",
    worker: "شبكة كيان بور",
    service: "تنظيف عميق",
    amount: "٨٠ ج.م",
    status: "مقبول",
    clientMessage: "الخدمة لم تكن بالمستوى المطلوب",
    workerMessage: "تم تقديم الخدمة كاملة حسب الاتفاق",
  },
  {id: "4",
    requestNumber: "#REQ-8980",
    client: "محمد سالم",
    worker: "أحمد الكهربائي",
    service: "فحص كهرباء",
    amount: "٦٠ ج.م",
    status: "محلول",
    clientMessage: "تم حل المشكلة بعد التواصل",
    workerMessage: "تم إنجاز العمل بالكامل",
  },
  {id: "5",
    requestNumber: "#REQ-8975",
    client: "نور الهدى",
    worker: "شركة النظافة",
    service: "تنظيف مكيف",
    amount: "٩٠ ج.م",
    status: "قيد المراجعة",
    clientMessage: "المكيف لم يعمل بشكل صحيح بعد الخدمة",
    workerMessage: "تم تنظيف المكيف بالكامل والمشكلة في الجهاز نفسه",
  },
];

const DisputesContext = createContext<DisputesContextType | null>(null);
export function DisputesProvider({ children }: { children: ReactNode }) {
  const [disputes, setDisputes] = useState<Dispute[]>(defaultDisputes);
  const [selectedStatus, setSelectedStatus] = useState<DisputeStatus>("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = useMemo(() => {
    if (selectedStatus === "الكل") return disputes;
    return disputes.filter((d) => d.status === selectedStatus);
  }, [disputes, selectedStatus]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function resolveDispute(id: string) {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "محلول" } : d))
    );
  }

  function rejectDispute(id: string) {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "مرفوض" } : d))
    );
  }

  return (<DisputesContext.Provider value={{
      disputes,
      filtered,
      selectedStatus,
      setSelectedStatus: (s) => { setSelectedStatus(s); setCurrentPage(1); },
      currentPage,
      setCurrentPage,
      totalPages,
      totalItems: filtered.length,
      itemsPerPage: ITEMS_PER_PAGE,
      paginated,
      resolveDispute,
      rejectDispute,}}>
      {children}
    </DisputesContext.Provider>
  );}

export function useDisputes() {
  const ctx = useContext(DisputesContext);
  if (!ctx) throw new Error("useDisputes must be used inside DisputesProvider");
  return ctx;}