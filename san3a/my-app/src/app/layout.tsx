import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { UsersProvider } from "../context/UsersContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",});
export const metadata: Metadata = {
  title: "إدارة المستخدمين",
  description: "لوحة التحكم لمراجعة وإدارة جميع مستخدمي المنصة",};
export default function RootLayout({
  children,
}: {children: React.ReactNode;}) {
  return (<html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-[family-name:var(--font-cairo)] antialiased bg-gray-50`}>
        <AuthProvider>
          <UsersProvider>
            {children}
          </UsersProvider>
        </AuthProvider>
      </body>
    </html>);}
