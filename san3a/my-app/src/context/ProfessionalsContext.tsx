"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface MatchDetail {
  label: string;
  percentage: number;
  icon: string;
}

export interface Professional {
  id: string;
  name: string;
  rating: number;
  badge: string;
  price: string;
  duration: string;
  distance: string;
  avatar: string;
  matchScore: number;
  matchDetails: MatchDetail[];
}

interface ProfessionalsContextType {
  professionals: Professional[];
  selected: Professional | null;
  setSelected: (p: Professional) => void;
}

const ProfessionalsContext = createContext<ProfessionalsContextType | null>(null);
const defaultProfessionals: Professional[] = [
  {id: "1",
    name: "أحمد م.",
    rating: 4.9,
    badge: "مدرب مُعتمد",
    price: "٥٩٩",
    duration: "١٥ دقيقة",
    distance: "٢.٤ كم",
    avatar: "أ",
    matchScore: 92,
    matchDetails: [
      { label: "مطابقة المسافة", percentage: 140, icon: "📍" },
      { label: "جودة التقييم", percentage: 130, icon: "⭐" },
      { label: "سرعة الاستجابة", percentage: 120, icon: "⚡" },
      { label: "التاريخ السابق", percentage: 115, icon: "📋" },
    ],
  },
  {id: "2",
    name: "سارة ك.",
    rating: 4.7,
    badge: "طبية",
    price: "٥٥",
    duration: "٢٥ دقيقة",
    distance: "١.١ كم",
    avatar: "س",
    matchScore: 85,
    matchDetails: [
      { label: "مطابقة المسافة", percentage: 150, icon: "📍" },
      { label: "جودة التقييم", percentage: 120, icon: "⭐" },
      { label: "سرعة الاستجابة", percentage: 110, icon: "⚡" },
      { label: "التاريخ السابق", percentage: 100, icon: "📋" },
    ],
  },
  {id: "3",
    name: "عمر ت.",
    rating: 4.8,
    badge: "مدرب مُعتمد",
    price: "٥٥",
    duration: "٣٠ دقيقة",
    distance: "٣.٥ كم",
    avatar: "ع",
    matchScore: 78,
    matchDetails: [
      { label: "مطابقة المسافة", percentage: 110, icon: "📍" },
      { label: "جودة التقييم", percentage: 125, icon: "⭐" },
      { label: "سرعة الاستجابة", percentage: 115, icon: "⚡" },
      { label: "التاريخ السابق", percentage: 105, icon: "📋" },],},];

export function ProfessionalsProvider({ children }: { children: ReactNode }) {
  const [professionals] = useState<Professional[]>(defaultProfessionals);
  const [selected, setSelected] = useState<Professional>(defaultProfessionals[0]);

  return (<ProfessionalsContext.Provider value={{ professionals, selected, setSelected }}>
      {children}
    </ProfessionalsContext.Provider>);}

export function useProfessionals() {
  const ctx = useContext(ProfessionalsContext);
  if (!ctx) throw new Error("useProfessionals must be used inside ProfessionalsProvider");
  return ctx;}