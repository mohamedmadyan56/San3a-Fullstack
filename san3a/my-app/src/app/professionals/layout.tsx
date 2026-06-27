import type { Metadata } from "next";
import ProfessionalsProviders from "./providers";

export const metadata: Metadata = {
  title: "المحترفون",
  description: "اختر المحترف المناسب لخدمتك",
};

export default function ProfessionalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfessionalsProviders>
      {children}
    </ProfessionalsProviders>
  );
}