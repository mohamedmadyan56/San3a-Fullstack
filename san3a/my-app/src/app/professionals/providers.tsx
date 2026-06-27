"use client";
import { AuthProvider } from "../../context/AuthContext";
import { ProfessionalsProvider } from "../../context/ProfessionalsContext";

export default function ProfessionalsProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProfessionalsProvider>
        {children}
      </ProfessionalsProvider>
    </AuthProvider>);}