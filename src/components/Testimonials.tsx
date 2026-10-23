import React, { useState } from 'react';
import { Quote, Star, Award, Building2, GraduationCap, CheckCircle } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTestimonials = TESTIMONIALS.filter((t) => {
    if (activeTab === 'academic') return t.id === 'test-1';
    if (activeTab === 'industry') return t.id === 'test-2' || t.id === 'test-4';
    if (activeTab === 'projects') return t.id === 'test-3';
    return true;
  });

  return (
    <section className="py-20 border-b border-slate-800/80" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Endorsements & Peer Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Academic & Industry Testimonials
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Attributable feedback from department supervisors, internship mentors, and collaborative project evaluators.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-lg w-fit mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Testimonials ({TESTIMONIALS.length})
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'academic'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Academic Faculty
          </button>
          <button
            onClick={() => setActiveTab('industry')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'industry'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Industry & Internship
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Agritech Field Evaluator
          </button>
        </div>

        {/* 2x2 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial: Testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-lg"
            >
              <div>
                {/* Quote Icon & Relationship Context */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Quote className="w-6 h-6 text-blue-500/50" />
                  <span className="text-[11px] font-mono text-slate-400">
                    {testimonial.relationship}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Author Attribution Card */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Monogram Avatar */}
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-400 shrink-0">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{testimonial.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-xs text-slate-400 leading-snug">{testimonial.role}</div>
                    <div className="text-[11px] text-blue-400/90 font-medium">{testimonial.organization}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
