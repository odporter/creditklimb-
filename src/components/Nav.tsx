'use client'

import Link from 'next/link'
import { Shield, Menu, X, Building2 } from 'lucide-react'
import { useState } from 'react'

// Light nav (default)
export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="text-cr-primary" size={24} />
          <span className="text-lg font-bold text-gray-900">
            CreditKlimb<span className="text-cr-primary">™</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/leads" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Free Analysis
          </Link>
          <Link href="/dispute" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Dispute Letters
          </Link>
          <Link href="/tools" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Tools
          </Link>
          <Link href="/net30-finder" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Net30 Finder
          </Link>
          <Link href="/business-credit" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Business Credit
          </Link>
          <Link href="/credit-building" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Build Credit
          </Link>
          <Link href="/learn" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Learn
          </Link>
          <Link href="/contact" className="cr-btn cr-btn-primary text-sm">
            Get Help
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-white border-t border-gray-100">
          <Link href="/leads" className="block text-sm font-medium py-2 text-gray-600">Free Analysis</Link>
          <Link href="/dispute" className="block text-sm font-medium py-2 text-gray-600">Dispute Letters</Link>
          <Link href="/net30-finder" className="block text-sm font-medium py-2 text-gray-600">Net30 Finder</Link>
          <Link href="/business-credit" className="block text-sm font-medium py-2 text-gray-600">Business Credit</Link>
          <Link href="/credit-building" className="block text-sm font-medium py-2 text-gray-600">Build Credit</Link>
          <Link href="/learn" className="block text-sm font-medium py-2 text-gray-600">Learn</Link>
          <Link href="/contact" className="cr-btn cr-btn-primary text-sm w-full text-center">Get Help</Link>
        </div>
      )}
    </nav>
  )
}

// Dark nav for business pages
export function DarkNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50" style={{backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b'}}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="text-blue-400" size={24} />
          <span className="text-lg font-bold text-white">
            CreditKlimb<span className="text-blue-400">™</span> Business
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/net30-finder" className="text-sm font-medium text-gray-400 hover:text-white">
            Net30 Finder
          </Link>
          <Link href="/business-credit" className="text-sm font-medium text-gray-400 hover:text-white">
            Business Credit
          </Link>
          <Link href="/contact" className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{backgroundColor: '#3b82f6'}}>
            Get Help
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3" style={{backgroundColor: '#0f172a'}}>
          <Link href="/net30-finder" className="block text-sm font-medium py-2 text-gray-400">Net30 Finder</Link>
          <Link href="/business-credit" className="block text-sm font-medium py-2 text-gray-400">Business Credit</Link>
          <Link href="/credit-building" className="block text-sm font-medium py-2 text-gray-400">Build Credit</Link>
          <Link href="/contact" className="block text-sm font-medium py-2 text-white">Get Help</Link>
        </div>
      )}
    </nav>
  )
}
