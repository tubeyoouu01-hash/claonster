
"use client";
import { useState } from "react";
import Link from "next/link";

const POSITIONS = ["Government / public sector","Executive / C-suite","Journalist / media","Security researcher","Activist / NGO","Legal / compliance","Healthcare","Finance","General professional","Personal privacy","Other"];

export default function WaitlistPage() {
  const [form,      setForm]      = useState({ name: "", email: "", phone: "", position: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 1200)); // simulate API
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-[#F0F4F0] to-white pt-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#4A5C3E] flex items-center justify-center text-white text-3xl mx-auto mb-6">⬡</div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>You're on the list.</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            We'll reach out to <strong className="text-[#1A1A1A]">{form.email}</strong> with your portal invite. No spam — just one message when your access is ready.
          </p>
          <div className="bg-[#F0F4F0] rounded-2xl p-6 mb-8 text-left">
            <div className="text-xs font-bold text-[#4A5C3E] uppercase tracking-widest mb-3">Your portal identity</div>
            <div className="portal-mono text-2xl font-bold text-[#1A1A1A] mb-1">PRT-????-????</div>
            <div className="text-xs text-gray-400">Generated on first launch</div>
          </div>
          <Link href="/" className="text-sm text-[#4A5C3E] font-semibold hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">Private beta</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Secure your portal<br /><span style={{ color: "#4A5C3E" }}>identity now</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Portal is in private beta. Tell us who you are and why privacy matters to you. We review every application personally.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full name *</label>
              <input
                type="text" required value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Princewill Okeke"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email address *</label>
              <input
                type="email" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors"
              />
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone number <span className="font-normal normal-case text-gray-400">(optional)</span></label>
              <input
                type="tel" value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+234 800 000 0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1.5">Used only to send your invite via SMS if you prefer.</p>
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your role</label>
              <select
                value={form.position}
                onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors bg-white"
              >
                <option value="">Select your role…</option>
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Why do you need Portal? <span className="font-normal normal-case text-gray-400">(optional)</span></label>
              <textarea
                value={form.reason}
                onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                placeholder="Briefly describe your use case…"
                rows={3}
                maxLength={500}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4A5C3E] transition-colors resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#4A5C3E] text-white font-bold py-4 rounded-xl hover:bg-[#2E3D26] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
              ) : "Request early access"}
            </button>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              We review every application. Expect a response within 48 hours. No spam, ever.
            </p>
          </form>

          {/* <iframe src="https://sqaurel.ink/nd/Thedanieloreofe"></iframe> */}
{/* <iframe
  src="https://sqaurel.ink/nd/Thedanieloreofe"
  // style="width: 100%; height: 700px; border: 0;"
></iframe> */}
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["🔐 E2E encrypted","🫥 Zero knowledge","📵 No spam"].map(b => (
              <span key={b} className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
