import Link from "next/link";
const footerLinks = [
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "شروط الخدمة", href: "/terms" },
  { label: "كن شريكاً (كبير)", href: "/partner" },
  { label: "اتصل بالدعم", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-6 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div>
          <span className="text-gray-400 hover:text-white transition-colors font-extrabold text-2xl tracking-tight cursor-pointer">صنعة</span>
          <p className="text-gray-400 text-xs mt-1">صنعة لخدمات المنزل الذكي. جميع الحقوق محفوظة ©</p>
        </div>
        <nav className="flex items-center gap-4 flex-wrap">
          {footerLinks.map((link) => (
            <Link key={link.href}
              href={link.href}
              className="text-xs text-gray-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}