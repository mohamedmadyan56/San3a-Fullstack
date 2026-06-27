"use client";
import { AuthProvider } from "../../context/AuthContext";
import { DisputesProvider } from "../../context/DisputesContext";

export default function DisputesProviders({ children }: { children: React.ReactNode }) {
  return (<AuthProvider>
      <DisputesProvider>
        {children}
      </DisputesProvider>
    </AuthProvider>);}