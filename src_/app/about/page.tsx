import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, Heart, Users, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Why we built Portal and who is behind it.",
};

const TEAM = [
  { name: "Princewill O.", role: "Founder & CEO",   initials: "PO", bio: "Former security engineer. Built Portal after watching too many officials' real numbers get leaked in the wrong hands." },
  { name: "Adaeze N.",     role: "CTO",             initials: "AN", bio: "Distributed systems architect. Designed the portal number routing engine from scratch." },
  { name: "Ekene R.",      role: "Head of Design",  initials: "ER", bio: "UX lead obsessed with making complex privacy simple enough for anyone to use without thinking about it." },
  { name: "Fatima A.",     role: "Head of Security", initials: "FA", bio: "Cryptography researcher. Leads our independent audit programme and threat modelling." },
];

const TIMELINE = [
  { year: "2023",    label: "Idea",  desc: "Concept born after a high-profile official's number was leaked through a shared screenshot." },
  { year: "2024 Q1", label: "Build", desc: "Core portal number engine architected and first internal prototype built." },
  { year: "2024 Q3", label: "Alpha", desc: "Closed alpha with 50 users. Portal system proven stable under real-world messaging load." },
  { year: "2025",    label: "Beta",  desc: "Private beta launched. Waitlist open. First institutional partners onboarding." },
  { year: "2026",    label: "Now",   desc: "Public launch approaching. Portal is live and growing." },
];

const VALUES = [
  { icon: Shield, title: "Privacy is a right",          desc: "Not a premium tier. Not a setting buried in a menu. Privacy is on by default, always, for every user." },
  { icon: Zap,    title: "Architecture over policy",    desc: "We don't ask you to trust our policies. We build systems where even we can't see your real number in your chats." },
  { icon: Heart,  title: "Usability is non-negotiable", desc: "A private app that's painful to use is a failed app. Portal is designed to feel exactly like the apps you already love." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Shield className="w-3 h-3" /> About Portal
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Built because privacy<br />
            <span style={{ color: "#4A5C3E" }}>shouldn't be optional</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Portal started with one question: why does every messaging app still ask you to hand your real phone number to every person you talk to? We built the answer.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: "Georgia, serif" }}>Our mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe your phone number is one of the most sensitive pieces of personal data you own. It's linked to your identity, your bank, your location history. Yet every time you message someone new, you hand it over without thinking.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Portal was built to end that. Through generated portal numbers, your real number is architecturally separated from every conversation you have. Even if every message you've ever sent was leaked — your real number would not appear in any of them.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're building for government officials, executives, journalists, activists, and anyone who has ever felt uneasy giving their number to someone they've just met.
            </p>
          </div>
          <div className="bg-[#4A5C3E] rounded-3xl p-10 text-white">
            <Shield className="w-10 h-10 text-white/30 mb-6" />
            <blockquote className="text-lg font-medium leading-relaxed italic text-white/90">
              "Your number should be as hard to find as your home address — not printed on every message you send."
            </blockquote>
            <div className="mt-6 text-sm text-white/60">— Princewill O., Founder</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center" style={{ fontFamily: "Georgia, serif" }}>
            How we got here
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[#4A5C3E]/20" />
            <div className="space-y-10">
              {TIMELINE.map((t) => (
                <div key={t.year} className="flex gap-8 pl-14 relative">
                  <div className="absolute left-0 w-10 h-10 rounded-full bg-[#4A5C3E] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-xs font-bold text-[#4A5C3E] uppercase tracking-widest">{t.year}</span>
                      <span className="text-sm font-bold text-[#1A1A1A]">{t.label}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#F0F4F0] text-[#4A5C3E] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              <Users className="w-3 h-3" /> The team
            </span>
            <h2 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
              The people behind Portal
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="p-6 rounded-2xl bg-[#FAFAF8] border border-gray-100 hover:border-[#4A5C3E]/20 hover:shadow-sm transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#4A5C3E] flex items-center justify-center text-white text-lg font-bold mb-4">
                  {m.initials}
                </div>
                <div className="font-bold text-[#1A1A1A] mb-0.5">{m.name}</div>
                <div className="text-xs font-semibold text-[#4A5C3E] mb-3">{m.role}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: "Georgia, serif" }}>
            What we believe
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <Icon className="w-8 h-8 text-[#4DB6AC] mb-4" />
                <h3 className="font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-[#F0F4F0]">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Come build with us
          </h2>
          <p className="text-gray-500 mb-8">We're hiring across engineering, design and trust & safety.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#2E3D26] transition-colors">
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/waitlist" className="border border-[#4A5C3E] text-[#4A5C3E] font-semibold px-8 py-4 rounded-full hover:bg-[#4A5C3E]/5 transition-colors">
              Join waitlist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
