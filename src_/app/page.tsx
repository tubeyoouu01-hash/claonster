import Link from "next/link";
import {
  Hexagon, Shield, Lock, Eye, EyeOff, MessageSquare,
  Phone, Users, FileText, Globe, CheckCircle, ChevronRight,
  Smartphone, Star, ArrowRight, Zap, Key, ServerOff,
} from "lucide-react";

// ── Shared ───────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#F0F4F0] text-[#4A5C3E] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#4A5C3E]/20 mb-6">
      {children}
    </span>
  );
}

function PortalNumber({ number }: { number: string }) {
  return (
    <span className="portal-mono text-[#4DB6AC] bg-[#4DB6AC]/10 border border-[#4DB6AC]/30 px-3 py-1.5 rounded-full text-sm font-bold">
      {number}
    </span>
  );
}

function AppStoreButton({ store }: { store: "apple" | "google" }) {
  return (
    <Link
      href="/download"
      className="flex items-center gap-3 bg-[#1A1A1A] text-white h-14 px-6 rounded-2xl hover:bg-black transition-all hover:scale-105"
    >
      {store === "apple" ? (
        <svg className="w-6 h-6 fill-white flex-shrink-0" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 fill-white flex-shrink-0" viewBox="0 0 24 24">
          <path d="M3.18 23.76c.3.17.64.22.99.14l12.12-6.99-2.54-2.54-10.57 9.39zM.79 1.03C.3 1.56 0 2.38 0 3.44v17.12c0 1.06.3 1.88.8 2.41l.13.12 9.59-9.59v-.23L.92.91.79 1.03zM20.56 10.48l-2.6-1.5-2.84 2.84 2.84 2.84 2.61-1.51c.74-.43.74-1.13-.01-1.67zM3.18.24l12.12 6.99-2.54 2.54L2.19.38c.32-.18.67-.21.99-.14z" />
        </svg>
      )}
      <div className="text-left">
        <div className="text-[10px] opacity-70 leading-none mb-0.5">
          {store === "apple" ? "Download on the" : "Get it on"}
        </div>
        <div className="text-sm font-bold leading-none">
          {store === "apple" ? "App Store" : "Google Play"}
        </div>
      </div>
    </Link>
  );
}

// ── HERO ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F0] via-[#FAFAF8] to-[#E8F4F3] -z-10" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#4A5C3E]/6 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#4DB6AC]/6 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left */}
        <div>
          <Badge>
            <Hexagon className="w-3 h-3 fill-[#4A5C3E]" />
            Now in private beta
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Message freely.<br />
            <span className="gradient-text">Disappear completely.</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl">
            Portal replaces your real phone number with a generated portal identity for every conversation.
            If your contact leaks — they get a dead channel ID.{" "}
            <strong className="text-gray-700">Your number is never touched.</strong>
          </p>

          {/* Portal number demos */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["PRT-8821-AXQZ", "PRT-3912-MNQR", "PRT-7104-ZNJP"].map((n) => (
              <PortalNumber key={n} number={n} />
            ))}
            <span className="portal-mono text-gray-400 text-sm flex items-center">← one per contact</span>
          </div>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <AppStoreButton store="apple" />
            <AppStoreButton store="google" />
          </div>
          <p className="text-xs text-gray-400">Free to download · iOS & Android</p>
        </div>

        {/* Right — phone mockup */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Phone shell */}
            <div className="bg-[#1A1A1A] rounded-[3.5rem] p-3 shadow-2xl shadow-black/25 animate-float">
              <div
                className="bg-[#F8F8F8] rounded-[3rem] overflow-hidden w-[260px]"
                style={{ aspectRatio: "9/19.5" }}
              >
                {/* Chat header */}
                <div className="bg-[#4A5C3E] px-5 pt-10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">E</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-bold">Ekene R.</div>
                      <div className="portal-mono text-white/60 text-[9px] truncate">PRT-3821-KQMX</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#4DB6AC] flex-shrink-0" />
                  </div>
                </div>

                {/* Security bar */}
                <div className="bg-[#4DB6AC]/10 border-b border-[#4DB6AC]/20 px-4 py-1.5 flex items-center justify-center gap-1.5">
                  <Lock className="w-2.5 h-2.5 text-[#4DB6AC]" />
                  <span className="text-[9px] text-[#4DB6AC] font-semibold">End-to-end encrypted</span>
                </div>

                {/* Messages */}
                <div className="p-3 space-y-2 bg-[#F5F5F5] flex-1">
                  {[
                    { from: "them", text: "Portal active. Proceed." },
                    { from: "me",   text: "Documents received." },
                    { from: "them", text: "Secure channel only." },
                    { from: "me",   text: "Confirmed. Standing by." },
                  ].map((m, i) => (
                    <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`px-3 py-1.5 rounded-xl text-[11px] max-w-[80%] leading-snug ${
                          m.from === "me"
                            ? "bg-[#4A5C3E] text-white"
                            : "bg-white text-gray-800 shadow-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating callouts */}
            <div className="absolute -right-10 top-16 bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100 flex items-center gap-2 whitespace-nowrap">
              <Lock className="w-3.5 h-3.5 text-[#4A5C3E]" />
              <span className="text-xs font-bold text-[#4A5C3E]">Your number hidden</span>
            </div>
            <div className="absolute -left-12 bottom-20 bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100 flex items-center gap-2 whitespace-nowrap">
              <Hexagon className="w-3.5 h-3.5 text-[#4DB6AC] fill-[#4DB6AC]" />
              <span className="text-xs font-bold text-[#4DB6AC]">Portal generated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: "01", icon: Smartphone,   title: "Register with your number",   desc: "Your real number is used only for one-time verification. It is never stored in any chat, shared with contacts, or visible in any message." },
    { n: "02", icon: Hexagon,      title: "Generate a portal number",    desc: 'Tap "New Portal" and you receive a unique code like PRT-8821-AXQZ. Share that code with whoever you want to talk to.' },
    { n: "03", icon: MessageSquare,title: "Chat through the portal",     desc: "All messages route through that portal ID. Your contact never sees your real number — only the portal code exists in their app." },
    { n: "04", icon: Shield,       title: "If it leaks — nothing happens", desc: "A leaked portal number reveals only a dead channel ID. Your real identity remains completely protected." },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>How it works</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            Privacy by architecture,<br />not by policy
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="flex gap-5 p-8 rounded-2xl bg-[#FAFAF8] border border-gray-100 hover:border-[#4A5C3E]/30 hover:shadow-sm transition-all group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#4A5C3E]/8 flex items-center justify-center group-hover:bg-[#4A5C3E]/15 transition-colors">
                  <Icon className="w-5 h-5 text-[#4A5C3E]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#4A5C3E]/40 mb-1 font-mono">{s.n}</div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── FEATURES ────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: Hexagon,      title: "Portal numbers",         desc: "Each connection gets a unique one-time portal ID. Leak-proof by design." },
    { icon: Lock,         title: "End-to-end encryption",  desc: "Every portal channel is independently encrypted. Zero knowledge architecture." },
    { icon: Eye,          title: "Read receipt control",   desc: "Toggle read receipts and double ticks globally or per individual chat." },
    { icon: Star,         title: "Stories with privacy",   desc: "Post status updates visible to everyone, selected contacts, or nobody." },
    { icon: Users,        title: "Secure groups",          desc: "Each group message auto-generates a fresh portal — no single point of tracking." },
    { icon: Phone,        title: "Portal calls",           desc: "Voice and video calls routed through portal channels, not your real number." },
    { icon: FileText,     title: "My Chats",               desc: "Private self-chat rooms for notes and drafts. Only you can see them." },
    { icon: Globe,        title: "Global profile",         desc: "One identity across all portals, or different profiles per portal or number." },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            Everything you expect.<br />
            <span className="gradient-text">Nothing they can find.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md hover:border-[#4A5C3E]/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F0F4F0] flex items-center justify-center mb-4 group-hover:bg-[#4A5C3E]/10 transition-colors">
                  <Icon className="w-5 h-5 text-[#4A5C3E]" />
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/features" className="inline-flex items-center gap-2 text-[#4A5C3E] font-semibold text-sm hover:underline">
            See all features <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── WHO IT'S FOR ────────────────────────────────────────────────
function WhoItsFor() {
  const personas = [
    { icon: Shield,       title: "Government officials",       desc: "Communicate without exposing personal numbers to counterparts, contractors or the public." },
    { icon: Zap,          title: "Executives & professionals", desc: "Keep your real number off the record in business dealings, partnerships and negotiations." },
    { icon: FileText,     title: "Journalists & activists",    desc: "Source protection built in. No contact can accidentally or intentionally expose you." },
    { icon: Lock,         title: "Everyday privacy",          desc: "You shouldn't have to give your real number to every person you meet online or offline." },
  ];

  return (
    <section className="py-24 px-6 bg-[#1A1A1A] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>Who it's for</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
            Built for people who<br />can't afford exposure
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex gap-5 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#4DB6AC]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── SECURITY CALLOUT ────────────────────────────────────────────
function SecurityCallout() {
  const pillars = [
    { icon: Lock,      label: "E2E Encrypted"         },
    { icon: EyeOff,    label: "Zero knowledge"        },
    { icon: ServerOff, label: "No real number stored" },
    { icon: Key,       label: "Open audit"            },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#F0F4F0] to-[#E8F4F3]">
      <div className="max-w-3xl mx-auto text-center">
        <Badge>Security first</Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: "Georgia, serif" }}>
          Your real number lives<br />nowhere in our system
        </h2>
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          After verification, your phone number is discarded. We store only your encrypted portal identity.
          No metadata logs. No message content. No contact graph. Nothing to subpoena.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {pillars.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-sm border border-[#4A5C3E]/10">
              <Icon className="w-4 h-4 text-[#4A5C3E]" />
              <span className="text-sm font-semibold text-[#4A5C3E]">{label}</span>
            </div>
          ))}
        </div>
        <Link
          href="/security"
          className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2E3D26] transition-colors"
        >
          Read our security model <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { quote: "This is the first app I've used where I genuinely believe my number can't be traced back to me through any conversation.", name: "Senior government official", role: "West Africa" },
    { quote: "Portal changed how I work with sources. I hand them a portal number, not my real contact. Game changer.", name: "Investigative journalist", role: "Lagos" },
    { quote: "The portal number system is elegant. If one gets compromised you generate a new one. Clean architecture.", name: "Security researcher", role: "Abuja" },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Badge>Early users</Badge>
          <h2 className="text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: "Georgia, serif" }}>
            What beta users say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[#FAFAF8] border border-gray-100">
              <CheckCircle className="w-6 h-6 text-[#4A5C3E] mb-4 opacity-40" />
              <p className="text-sm text-gray-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <div className="font-bold text-sm text-[#1A1A1A]">{t.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WAITLIST CTA ────────────────────────────────────────────────
function WaitlistCTA() {
  return (
    <section className="py-24 px-6 bg-[#4A5C3E]">
      <div className="max-w-2xl mx-auto text-center text-white">
        <Hexagon className="w-12 h-12 text-white/40 fill-white/10 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
          Your identity.<br />Your channel.
        </h2>
        <p className="text-white/70 text-lg mb-10 leading-relaxed">
          Portal is in private beta. Join the waitlist and be among the first to receive a portal identity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/waitlist" className="bg-white text-[#4A5C3E] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-base inline-flex items-center justify-center gap-2">
            Join the waitlist <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/download" className="bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-colors text-base text-center">
            Download app
          </Link>
        </div>
        <p className="text-white/40 text-xs mt-6">No spam. One invite message only.</p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <SecurityCallout />
      <Testimonials />
      <WaitlistCTA />
    </>
  );
}
