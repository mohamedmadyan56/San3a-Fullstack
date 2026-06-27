import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import DisputesProviders from "./providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "إدارة النزاعات",
  description: "مراجعة وحل طلبات تصعيد الخدمة النشطة",
};

export default function DisputesLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-[family-name:var(--font-cairo)] antialiased bg-gray-50`}>
        <DisputesProviders>
          {children}
        </DisputesProviders>
      </body>
    </html>);}