"use client";
import { createContext, useContext, useState, ReactNode } from "react";
export interface ClientActivity {
  id: number;
  title: string;
  worker: string;
  date: string;
  amount: string;
  icon: ReactNode;
}
export interface ClientStats {
  activeRequests: number;
  favorites: number;
  completedServices: number;
}
export interface Service {
  id: number;
  title: string;
  description: string;
  rating: number;
  category: string;
}

interface ClientContextType {
  stats: ClientStats;
  recentActivity: ClientActivity[];
  services: Service[];
  userName: string;
}

const ClientContext = createContext<ClientContextType | null>(null);
const defaultStats: ClientStats = {
  activeRequests: 2,
  favorites: 5,
  completedServices: 12,
};

const defaultServices: Service[] = [
  { id: 1, title: "السباكة", description: "إصلاحات وتركيب أنظمة السباكة في المنازل", rating: 4.8, category: "سباكة" },
  { id: 2, title: "الكهرباء", description: "فحص وإصلاح الأعطال الكهربائية والأجهزة", rating: 4.7, category: "كهرباء" },
  { id: 3, title: "التنظيف العميق", description: "تنظيف شامل للمنازل والمكاتب والمحلات", rating: 4.9, category: "تنظيف" },
  { id: 4, title: "المنزل الذكي", description: "تركيب وبرمجة أنظمة المنازل الذكية والكاميرات", rating: 4.6, category: "ذكي" },
  { id: 5, title: "خياطة", description: "خياطة وتفصيل الملابس وإصلاح الأقمشة", rating: 4.5, category: "طرزي" },
  { id: 6, title: "نقاشة", description: "دهانات ونقاشة الجدران والأسقف باحترافية", rating: 4.7, category: "نقاشة" },
];

export function ClientProvider({ children }: { children: ReactNode }) {
  const [stats] = useState<ClientStats>(defaultStats);
  const [recentActivity] = useState<ClientActivity[]>([]);
  const [services] = useState<Service[]>(defaultServices);
  const [userName] = useState("سارة");

  return (<ClientContext.Provider value={{ stats, recentActivity, services, userName }}>
      {children}
    </ClientContext.Provider>
  );}

export function useClient() {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error("useClient must be used inside ClientProvider");
  return ctx;
}