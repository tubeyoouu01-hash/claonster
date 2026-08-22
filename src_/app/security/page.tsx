import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, EyeOff, Server, Key, CheckCircle, ArrowRight, AlertTriangle, FileSearch } from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  description: "How Portal protects your identity through architecture, not just policy.",
};

const PILLARS = [
  { icon: Lock,     title: "End-to-end encryption",    desc: "Every portal channel uses independent E2E encryption. Messages are encrypted on your device and can only be decrypted by the recipient. Not even Portal can read them." },
  { icon: EyeOff,   title: "Zero knowledge",           desc: "We have no knowledge of message content, contact graphs, or who you communicate with. Our servers route encrypted blobs — nothing more." },
  { icon: Server,   title: "No real number in storage", desc: "After SMS verification your real phone number is permanently discarded. What remains is a cryptographic identity tied to your portal alias — never to your number." },
  { icon: Key,      title: "Per-channel key derivation", desc: "Each portal pair derives its own unique encryption key. Compromising one channel's key reveals nothing about any other conversation." },
  { icon: Eye,      title: "Forward secrecy",          desc: "Keys rotate regularly. If past keys are ever compromised, past messages remain protected because new keys cannot decrypt old ciphertext." },
  { icon: FileSearch,title: "Independent audit",       desc: "Our cryptographic implementation is open to audit by independent security researchers. We publish findings publicly — including vulnerabilities." },
];

const THREAT_MODEL = [
  { threat: "Contact shares your portal number",  outcome: "Attacker gets a dead channel ID. Cannot message you, cannot find you, cannot learn your real number." },
  { threat: "Man-in-the-middle attack",           outcome: "E2E encryption makes MITM impossible without detection. Key fingerprints are displayed for manual verification." },
  { threat: "Portal servers are compromised",     outcome: "Servers hold only encrypted blobs and portal IDs. No real numbers, no message content, no contact lists." },
  { threat: "Legal subpoena of Portal",           outcome: "We cannot provide what we do not have. No real numbers, no message logs, no metadata linking portals to identities." },
  { threat: "Device is seized",                   outcome: "App lock (biometric or PIN) required. Remote portal revocation possible to invalidate all active channels." },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/20">
            <Shield className="w-3 h-3" /> Security model
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Architecture you can<br />
            <span style={{ color: "#4DB6AC" }}>actually trust</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Privacy by policy is a promise. Privacy by architecture is a guarantee. This is how Portal is built.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-6 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Georgia, serif" }}>
            Security foundations
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#4DB6AC]/15 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#4DB6AC]" />
                </div>
                <h3 className="font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat model */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-red-500/20">
              <AlertTriangle className="w-3 h-3" /> Threat model
            </span>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
              What happens when things go wrong
            </h2>
          </div>
          <div className="space-y-4">
            {THREAT_MODEL.map((t) => (
              <div key={t.threat} className="grid sm:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10">
                <div className="bg-red-500/8 p-6 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300 font-medium">{t.threat}</p>
                </div>
                <div className="bg-[#4DB6AC]/8 p-6 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#4DB6AC] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">{t.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we collect */}
      <section className="py-20 px-6 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12" style={{ fontFamily: "Georgia, serif" }}>
            What we collect vs what we don't
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-[#4DB6AC]" />
                <h3 className="font-bold text-white">We store</h3>
              </div>
              {["Encrypted portal alias","Account creation timestamp","Encrypted message blobs (temporarily)","Portal channel metadata (encrypted)"].map((i) => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DB6AC] flex-shrink-0" />
                  <span className="text-sm text-gray-300">{i}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-500/5 rounded-2xl p-8 border border-red-500/20">
              <div className="flex items-center gap-2 mb-6">
                <EyeOff className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-white">We never store</h3>
              </div>
              {["Your real phone number","Message content","Contact lists or graphs","Call logs","Location data","Device identifiers"].map((i) => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bug bounty */}
      <section className="py-20 px-6 bg-[#4A5C3E]">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Shield className="w-12 h-12 mx-auto text-white/30 mb-6" />
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Security research & bug bounty
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            We welcome responsible disclosure. If you find a vulnerability in Portal, we want to know. We offer bounties for verified, responsible disclosures.
          </p>
          <Link href="/contact?subject=security" className="inline-flex items-center gap-2 bg-white text-[#4A5C3E] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
            Report a vulnerability <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/40 text-xs mt-4">Please do not disclose publicly before we've had a chance to fix it.</p>
        </div>
      </section>
    </>
  );
}
