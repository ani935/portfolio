import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, ExternalLink, MessageSquare, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'AI & ML Engineering Opportunity',
    message: ''
  });
  const [sentMessage, setSentMessage] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mailto link as resilient real-world fallback
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formState.subject
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    )}`;

    setSentMessage(true);
    // Allow user to trigger default client if they wish
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSentMessage(false);
      setFormState({
        name: '',
        email: '',
        subject: 'AI & ML Engineering Opportunity',
        message: ''
      });
    }, 4000);
  };

  return (
    <section className="py-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries & Channel Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                Get In Touch
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Initiate Conversation
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Available for full-time Artificial Intelligence & Machine Learning engineering roles,
                applied research fellowships, and technical collaborations in Agentic AI and RAG architecture.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3 pt-2">
              {/* Email */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-semibold text-white font-mono hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Phone</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-semibold text-white font-mono hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyPhone}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Location Base</div>
                  <div className="text-sm font-semibold text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">Send Direct Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the details below. This generates a direct message routed to Aniket Das.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Sarah Jenkins"
                      className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="sarah@organization.com"
                      className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Scope / Role Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe the opportunity, technical team, or research scope..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md shadow-blue-600/20 active:translate-y-0.5"
                >
                  {sentMessage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Opening Mail Client & Logging Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message to Aniket Das</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
