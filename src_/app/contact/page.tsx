
"use client";
import { useState } from "react";
import { Mail, MessageSquare, Shield, Building2, Send, CheckCircle } from "lucide-react";

const SUBJECTS = [
  "General enquiry",
  "Technical support",
  "Partnership / enterprise",
  "Security / vulnerability report",
  "Press / media",
  "Careers",
  "Other",
];

const CONTACT_CARDS = [
  { icon: MessageSquare, title: "General support",    desc: "Questions about the app, your account or features.", email: "support@portal.app" },
  { icon: Shield,        title: "Security",           desc: "Responsible disclosure and vulnerability reports.", email: "security@portal.app" },
  { icon: Building2,     title: "Enterprise & press", desc: "Partnerships, institutional accounts, media enquiries.", email: "hello@portal.app" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Mail className="w-3 h-3" /> Contact us
          </span>
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Get in touch
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            We're a small team and we read every message. Expect a response within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="pb-8 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4 mb-12">
          {CONTACT_CARDS.map(({ icon: Icon, title, desc, email }) => (
            <a key={title} href={`mailto:${email}`}
              className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#4A5C3E]/30 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F0] flex items-center justify-center mb-4 group-hover:bg-[#4A5C3E]/10 transition-colors">
                <Icon className="w-5 h-5 text-[#4A5C3E]" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] mb-1 text-sm">{title}</h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{desc}</p>
              <span className="text-xs text-[#4A5C3E] font-mono font-semibold">{email}</span>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
              <CheckCircle className="w-16 h-16 text-[#4A5C3E] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "Georgia, serif" }}>Message received</h2>
              <p className="text-gray-500">We'll get back to <strong className="text-[#1A1A1A]">{form.email}</strong> within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "Georgia, serif" }}>Send us a message</h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Princewill Okeke"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                <select value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors bg-white">
                  <option value="">Select a subject…</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you need…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#4A5C3E] text-white font-bold py-4 rounded-xl hover:bg-[#2E3D26] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                  : <><Send className="w-4 h-4" />Send message</>}
              </button>
            </form>
          )}
        </div>
      </section>

      <div className="h-20" />
    </>
  );
}
