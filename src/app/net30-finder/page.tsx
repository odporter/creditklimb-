'use client'

import { useState } from 'react'
import { DarkNav } from '@/components/Nav'
import Link from 'next/link'
import { Building2, Search, CheckCircle, ExternalLink, Filter, ChevronDown } from 'lucide-react'

const VENDORS = [
  {
    name: 'Uline',
    url: 'https://www.uline.com',
    description: 'Shipping, industrial, and packaging supplies. Reports to D&B.',
    minOrder: '$50',
    reportsTo: ['D&B'],
    paydexBoost: 5,
    category: 'Industrial',
  },
  {
    name: 'Grainger',
    url: 'https://www.grainger.com',
    description: 'Maintenance, repair, and operations supplies. Net 30 available.',
    minOrder: '$100',
    reportsTo: ['D&B'],
    paydexBoost: 6,
    category: 'Industrial',
  },
  {
    name: 'Quill.com',
    url: 'https://www.quill.com',
    description: 'Office supplies with Net 30 terms for qualified buyers.',
    minOrder: '$30',
    reportsTo: ['D&B', 'Experian'],
    paydexBoost: 4,
    category: 'Office',
  },
  {
    name: 'Sam\'s Club Business',
    url: 'https://www.samsclub.com/business',
    description: 'Business memberships with Net 30 on qualifying accounts.',
    minOrder: '$100',
    reportsTo: ['D&B'],
    paydexBoost: 4,
    category: 'Retail',
  },
  {
    name: 'Amazon Business',
    url: 'https://business.amazon.com',
    description: 'Business pricing, quantity discounts, and Net 30 terms.',
    minOrder: '$50',
    reportsTo: ['D&B'],
    paydexBoost: 5,
    category: 'Retail',
  },
  {
    name: 'Verizon Business',
    url: 'https://business.verizon.com',
    description: 'Cell phone and wireless plans that report to business bureaus.',
    minOrder: 'Varies',
    reportsTo: ['D&B', 'Experian'],
    paydexBoost: 6,
    category: 'Telecom',
  },
  {
    name: 'AT&T Business',
    url: 'https://www.att.com/business',
    description: 'Business wireless and internet services with credit reporting.',
    minOrder: 'Varies',
    reportsTo: ['D&B', 'Experian'],
    paydexBoost: 5,
    category: 'Telecom',
  },
  {
    name: 'Dell Business',
    url: 'https://www.dell.com/business',
    description: 'Computers, electronics, and IT with Net 30 terms.',
    minOrder: '$100',
    reportsTo: ['D&B'],
    paydexBoost: 7,
    category: 'Technology',
  },
  {
    name: 'CDW',
    url: 'https://www.cdw.com',
    description: 'Technology solutions and IT supplies. Net 30 available.',
    minOrder: '$250',
    reportsTo: ['D&B'],
    paydexBoost: 7,
    category: 'Technology',
  },
  {
    name: 'Staples Business Advantage',
    url: 'https://www.staples.com/business-advantage',
    description: 'Office supplies with dedicated account managers.',
    minOrder: '$50',
    reportsTo: ['D&B'],
    paydexBoost: 4,
    category: 'Office',
  },
  {
    name: 'Industrial Supplies',
    url: 'https://www.industrialsupplies.com',
    description: 'Industrial equipment and MRO supplies. Reports to D&B.',
    minOrder: '$75',
    reportsTo: ['D&B'],
    paydexBoost: 5,
    category: 'Industrial',
  },
  {
    name: 'Fastenal',
    url: 'https://www.fastenal.com',
    description: 'Industrial fasteners and construction supplies.',
    minOrder: '$25',
    reportsTo: ['D&B'],
    paydexBoost: 4,
    category: 'Industrial',
  },
]

const CATEGORIES = ['All', 'Industrial', 'Office', 'Retail', 'Technology', 'Telecom']

export default function Net30FinderPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = VENDORS.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                         v.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || v.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen" style={{backgroundColor: '#0f172a', color: '#e2e8f0'}}>
      <DarkNav />
      
      {/* Hero */}
      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
            <Building2 size={16} className="text-blue-400" />
            <span className="text-sm">Net30 Vendor Directory</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Build Business Credit with <span style={{color: '#60a5fa'}}>Trade Credit</span>
          </h1>
          <p className="text-xl mb-8" style={{color: '#94a3b8'}}>
            Net 30 vendor accounts that report to D&B and help build your PAYDEX score. 
            These are the accounts banks and lenders look for.
          </p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2"
              style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 px-6" style={{backgroundColor: '#0f172a'}}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Apply for Net 30 Account', desc: 'Most vendors require a D-U-N-S number and basic business info' },
              { step: '2', title: 'Make Purchases & Pay On Time', desc: 'Pay within 30 days to build positive payment history' },
              { step: '3', title: 'Watch Your PAYDEX Climb', desc: 'D&B tracks your payments and assigns a PAYDEX score (0-100)' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg text-center" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                <div className="text-2xl font-bold text-blue-400 mb-2">{item.step}</div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm" style={{color: '#94a3b8'}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 px-6" style={{backgroundColor: '#1e293b'}}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: category === cat ? '#3b82f6' : 'transparent',
                    border: `1px solid ${category === cat ? '#3b82f6' : '#475569'}`,
                    color: category === cat ? 'white' : '#94a3b8'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-sm" style={{color: '#64748b'}}>
              {filtered.length} vendors
            </div>
          </div>
        </div>
      </section>

      {/* Vendor List */}
      <section className="py-8 px-6" style={{backgroundColor: '#0f172a'}}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filtered.map((vendor, i) => (
              <div key={i} className="p-6 rounded-xl" style={{backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{vendor.name}</h3>
                      <span className="px-2 py-1 rounded text-xs" style={{backgroundColor: '#1e3a5f', color: '#60a5fa'}}>
                        {vendor.category}
                      </span>
                    </div>
                    <p className="mb-3" style={{color: '#94a3b8'}}>{vendor.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div style={{color: '#64748b'}}>
                        <strong className="text-gray-300">Min Order:</strong> {vendor.minOrder}
                      </div>
                      <div style={{color: '#64748b'}}>
                        <strong className="text-gray-300">Reports to:</strong>{' '}
                        {vendor.reportsTo.map((b, j) => (
                          <span key={j} className="ml-1 text-blue-400">{b}</span>
                        ))}
                      </div>
                      <div style={{color: '#64748b'}}>
                        <strong className="text-gray-300">PAYDEX Boost:</strong>{' '}
                        <span className="text-green-400">+{vendor.paydexBoost}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={vendor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap"
                    style={{backgroundColor: '#3b82f6', color: 'white'}}
                  >
                    Apply Now <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p style={{color: '#64748b'}}>No vendors found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Need Help Building Business Credit?</h2>
          <p className="text-xl mb-8 text-blue-100">
            We can help you get your D-U-N-S number, set up vendor accounts, and build a business credit profile from scratch.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-lg font-bold text-blue-600 transition-all" style={{backgroundColor: '#ffffff'}}>
            Get Free Consultation →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{backgroundColor: '#0f172a', borderTop: '1px solid #1e293b'}}>
        <div className="max-w-4xl mx-auto text-center" style={{color: '#64748b'}}>
          <p>Net30 Vendor Finder — Part of our Business Credit Building Suite</p>
        </div>
      </footer>
    </div>
  )
}
