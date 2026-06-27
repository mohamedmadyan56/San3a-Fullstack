"use client";
import { AuthProvider } from "../../context/AuthContext";
import { RequestProvider } from "../../context/RequestContext";

export default function RequestProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RequestProvider>
        {children}
      </RequestProvider>
    </AuthProvider>);}