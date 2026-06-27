"use client";
import { createContext, useContext, useState, ReactNode } from "react";
export type ServiceType = "سباكة" | "كهرباء" | "تنظيف" | "تكييف" | "";
export type ScheduleType = "الآن" | "جدولة";

interface RequestContextType {
  step: number;
  setStep: (s: number) => void;
  serviceType: ServiceType;
  setServiceType: (s: ServiceType) => void;
  location: string;
  setLocation: (l: string) => void;
  schedule: ScheduleType;
  setSchedule: (s: ScheduleType) => void;
  description: string;
  setDescription: (d: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const RequestContext = createContext<RequestContextType | null>(null);
export function RequestProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [location, setLocation] = useState("دبي مارينا، بناية ٤، شقة ٤٠٢");
  const [schedule, setSchedule] = useState<ScheduleType>("الآن");
  const [description, setDescription] = useState("");
  function nextStep() { setStep((s) => Math.min(s + 1, 3)); }
  function prevStep() { setStep((s) => Math.max(s - 1, 1)); }
  function reset() {
    setStep(1);
    setServiceType("");
    setLocation("");
    setSchedule("الآن");
    setDescription("");
  }

  return (<RequestContext.Provider value={{
      step, setStep,
      serviceType, setServiceType,
      location, setLocation,
      schedule, setSchedule,
      description, setDescription,
      nextStep, prevStep, reset,}}>
      {children}
    </RequestContext.Provider>);}

export function useRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest must be used inside RequestProvider");
  return ctx;}