'use client'

import Link from 'next/link'
import Image from 'next/image'
import { JSX, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/', label: 'الرئيسية' },
  { href: '/services', label: 'خدماتنا' },
  { href: '/about', label: 'من نحن' },
]

export default function Navbar(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const toggleMobileMenu = (): void => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - RIGHT side in RTL */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/images/logo.png" 
              alt="صنعة" 
              width={140} 
              height={60} 
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - CENTER */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href + link.label} 
                href={link.href} 
                className="text-[#111111] hover:text-[#EF860B] font-semibold text-base transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#EF860B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons - LEFT side in RTL */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-7 py-2.5 border-2 border-[#111111] text-[#111111] rounded-xl font-bold hover:bg-[#111111] hover:text-white transition-all duration-300"
            >
              سجل كفني
            </Link>
            <Link 
              href="/request" 
              className="px-7 py-2.5 bg-[#EF860B] text-white rounded-xl font-bold hover:bg-[#D97706] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              اطلب فني
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={mobileOpen ? faTimes : faBars} 
              className="w-6 h-6 text-[#111111]" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href + link.label} 
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-[#111111] font-semibold hover:text-[#EF860B] transition-colors border-b border-gray-50 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <Link href="/request" className="block w-full text-center px-6 py-3 bg-[#EF860B] text-white rounded-xl font-bold">
              اطلب فني
            </Link>
            <Link href="/login" className="block w-full text-center px-6 py-3 border-2 border-[#111111] text-[#111111] rounded-xl font-bold">
              سجل كفني
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}