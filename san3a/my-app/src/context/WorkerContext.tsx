"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface WorkerTask {
  id: number;
  title: string;
  client: string;
  amount: string;
  icon: ReactNode;
}

export interface WorkerEarning {
  day: string;
  fullDay: string;
  tasks: number;
  amount: number;
}

export interface WorkerStats {
  todayEarnings: string;
  completedTasks: number;
  rating: number;
  responseRate: string;
}

interface WorkerContextType {
  isOnline: boolean;
  setIsOnline: (v: boolean) => void;
  stats: WorkerStats;
  recentTasks: WorkerTask[];
  weeklyEarnings: WorkerEarning[];
}

const WorkerContext = createContext<WorkerContextType | null>(null);

const defaultStats: WorkerStats = {
  todayEarnings: "١,٣٤٠ ج.م",
  completedTasks: 12,
  rating: 4.8,
  responseRate: "٩٥٪",
};

const defaultEarnings: WorkerEarning[] = [
  { day: "الأحد", fullDay: "الأحد", tasks: 0, amount: 0 },
  { day: "الاثنين", fullDay: "الاثنين", tasks: 0, amount: 0 },
  { day: "الثلاثاء", fullDay: "الثلاثاء", tasks: 0, amount: 0 },
  { day: "الأربعاء", fullDay: "الأربعاء", tasks: 0, amount: 0 },
  { day: "الخميس", fullDay: "الخميس", tasks: 0, amount: 0 },
  { day: "الجمعة", fullDay: "الجمعة", tasks: 0, amount: 0 },
  { day: "السبت", fullDay: "السبت", tasks: 3, amount: 1340 },
];

export function WorkerProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [stats] = useState<WorkerStats>(defaultStats);
  const [weeklyEarnings] = useState<WorkerEarning[]>(defaultEarnings);
  const [recentTasks] = useState<WorkerTask[]>([]);
  return (
    <WorkerContext.Provider
      value={{
        isOnline,
        setIsOnline,
        stats,
        recentTasks,
        weeklyEarnings,
      }}>
      {children}
    </WorkerContext.Provider>
  );}
  
export function useWorker() {
  const ctx = useContext(WorkerContext);
  if (!ctx) throw new Error("useWorker must be used inside WorkerProvider");
  return ctx;}