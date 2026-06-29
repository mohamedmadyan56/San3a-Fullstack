import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { JSX } from 'react/jsx-runtime'

interface QuickLink {
  href: string
  label: string
}

interface ContactItem {
  icon: typeof faPhone
  text: string
}

const quickLinks: QuickLink[] = [
  { href: '/', label: 'الرئيسية' },
  { href: '/services', label: 'خدماتنا' },
  { href: '/about', label: 'من نحن' },
  { href: '/login', label: 'سجل كفني' },
]

const contactItems: ContactItem[] = [
  { icon: faPhone, text: '+20 2568 5226' },
  { icon: faEnvelope, text: 'info@sanaa.com' },
]

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-[#0F0F30] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image 
              src="/images/logo.png" 
              alt="صنعة" 
              width={150} 
              height={60} 
              className="h-16 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed max-w-md text-lg">
              منصة صنعة هي الحل الأمثل لجميع خدماتك المنزلية. نوفر لك فنيين محترفين وموثوقين في جميع التخصصات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#EF860B]">روابط سريعة</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#EF860B] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#EF860B]">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-300">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className="w-5 h-5 text-[#EF860B]" 
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2026 صنعة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}