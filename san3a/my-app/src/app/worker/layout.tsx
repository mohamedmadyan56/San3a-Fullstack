import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "../../context/AuthContext";
import { WorkerProvider } from "../../context/WorkerContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "صفحة العمال",
  description: "بوابة مقدم الخدمة",
};

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-[family-name:var(--font-cairo)] antialiased bg-gray-50`}>
        <AuthProvider>
          <WorkerProvider>
            {children}
          </WorkerProvider>
        </AuthProvider>
      </body>
    </html>);}