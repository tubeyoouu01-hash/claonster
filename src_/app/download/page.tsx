import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, CheckCircle, ArrowRight, Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Portal",
  description: "Download Portal for iOS and Android — secure private messaging where your real number is never exposed.",
};

const REQUIREMENTS = {
  ios: ["iPhone or iPad", "iOS 15.0 or later", "~85 MB storage"],
  android: ["Android 8.0 (Oreo) or later", "~72 MB storage", "Works on phones and tablets"],
};

export default function DownloadPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/20">
            <Smartphone className="w-3 h-3" /> Download
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Get Portal now
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Free to download. No ads. No data selling. Your real number stays private from the first message.
          </p>

          {/* Big download buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {/* App Store */}
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white text-[#1A1A1A] h-16 px-7 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 group">
              <svg className="w-7 h-7 fill-[#1A1A1A] flex-shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[11px] text-gray-500 leading-none mb-0.5">Download on the</div>
                <div className="text-lg font-bold leading-none">App Store</div>
              </div>
            </a>

            {/* Google Play */}
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white text-[#1A1A1A] h-16 px-7 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105">
              <svg className="w-7 h-7 fill-[#1A1A1A] flex-shrink-0" viewBox="0 0 24 24">
                <path d="M3.18 23.76c.3.17.64.22.99.14l12.12-6.99-2.54-2.54-10.57 9.39zM.79 1.03C.3 1.56 0 2.38 0 3.44v17.12c0 1.06.3 1.88.8 2.41l.13.12 9.59-9.59v-.23L.92.91.79 1.03zM20.56 10.48l-2.6-1.5-2.84 2.84 2.84 2.84 2.61-1.51c.74-.43.74-1.13-.01-1.67zM3.18.24l12.12 6.99-2.54 2.54L2.19.38c.32-.18.67-.21.99-.14z" />
              </svg>
              <div className="text-left">
                <div className="text-[11px] text-gray-500 leading-none mb-0.5">Get it on</div>
                <div className="text-lg font-bold leading-none">Google Play</div>
              </div>
            </a>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F1C40F] text-[#F1C40F]" />)}
            </div>
            <span>4.9 · Private beta</span>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center" style={{ fontFamily: "Georgia, serif" }}>
            System requirements
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {(["ios", "android"] as const).map((platform) => (
              <div key={platform} className="p-8 rounded-2xl bg-[#FAFAF8] border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#4A5C3E]/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-[#4A5C3E]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-lg">{platform === "ios" ? "iPhone / iPad" : "Android"}</h3>
                </div>
                <ul className="space-y-3">
                  {REQUIREMENTS[platform].map((r) => (
                    <li key={r} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#4A5C3E] flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in the app */}
      <section className="py-20 px-6 bg-[#F0F4F0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Everything included, free
          </h2>
          <p className="text-gray-500 mb-12">No tiers. No feature-gating. No ads.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
            {[
              "Portal number generation",
              "End-to-end encrypted messaging",
              "Voice and video calls",
              "Secure groups",
              "Status updates with privacy controls",
              "Read receipt control",
              "Double tick control",
              "My Chats (private rooms)",
              "Multi-layer profile system",
              "Media and document sharing",
              "Blocked portals management",
              "Remote portal revocation",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                <CheckCircle className="w-4 h-4 text-[#4A5C3E] flex-shrink-0" />
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security reminder */}
      <section className="py-20 px-6 bg-[#4A5C3E] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Shield className="w-12 h-12 text-white/30 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Not on the waitlist yet?
          </h2>
          <p className="text-white/70 mb-8">Portal is in private beta. Join the waitlist and we'll send you your invite.</p>
          <Link href="/waitlist" className="inline-flex items-center gap-2 bg-white text-[#4A5C3E] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
            Join waitlist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
