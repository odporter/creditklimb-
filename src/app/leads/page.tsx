'use client'

import { useState, useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { LeadForm } from '@/components/LeadForm'
import { Shield, CheckCircle, Users, TrendingUp, ArrowRight, Zap, Clock } from 'lucide-react'

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-cr-bg">
      <Nav />
      
      {/* Sticky mobile CTA */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-cr-border p-3 md:hidden shadow-lg">
        <a href="#get-started" className="cr-btn cr-btn-primary w-full text-center block">
          Get My Free Analysis →
        </a>
      </div>
      
      <section className="py-16" id="get-started">
        <div className="cr-container max-w-2xl">
          <div className="text-center mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Zap size={16} />
              100% Free — No Credit Card Required
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Credit Analysis
            </h1>
            <p className="text-cr-muted text-lg mb-6">
              Answer 3 quick questions and we'll show you exactly what's hurting your credit —
              plus send you a personalized action plan at no cost.
            </p>

            {/* Urgency + trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-cr-muted mb-2">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-green-500" />
                <span>Data stays private</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-green-500" />
                <span>3 minutes to complete</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cr-surface border border-cr-border rounded-full text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Specialists available — response within 24 hours
              </span>
            </div>
          </div>

          <LeadForm />

          {/* What you get */}
          <div className="mt-8 p-4 bg-cr-surface rounded-xl border border-cr-border">
            <h3 className="font-semibold mb-3 text-center">What you'll receive:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Personalized credit analysis',
                'Step-by-step action plan',
                'Which items to dispute first',
                'Score range assessment',
                'Free dispute letter access',
                'Priority support if desired',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
