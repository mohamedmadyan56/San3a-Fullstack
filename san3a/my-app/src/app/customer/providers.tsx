"use client";
import { AuthProvider } from "../../context/AuthContext";
import { ClientProvider } from "../../context/ClientContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (<AuthProvider>
      <ClientProvider>
        {children}
      </ClientProvider>
    </AuthProvider>);}