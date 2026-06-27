"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "مدير" | "عضو";
  avatar?: string;
}
interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  function login(user: AuthUser) {
    setUser(user);
  }
  function logout() {
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}