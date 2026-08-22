import type { Metadata } from "next";
import Link from "next/link";
import {
  Hexagon, MessageSquare, Phone, Users, Star, Globe,
  FileText, Lock, Eye, CheckCircle, ArrowRight, Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything Portal can do — portal numbers, encrypted calls, stories, groups and more.",
};

const SECTIONS = [
  {
    id: "portal-numbers",
    badge: "Core",
    icon: Hexagon,
    title: "Portal Numbers",
    desc: "The fundamental building block of Portal. Every connection starts with a generated portal number — never your real phone number.",
    points: [
      "Each DM pair gets a unique one-time portal (e.g. PRT-8821-AXQZ)",
      "You share the portal, not your real number",
      "If a portal leaks, only a dead channel ID is exposed",
      "Generate new portals anytime to replace old ones",
      "Portals are linked to encrypted channels, not identities",
    ],
    accent: "#4A5C3E",
    bg: "bg-white",
    altBg: "bg-[#F0F4F0]",
  },
  {
    id: "messaging",
    badge: "Messaging",
    icon: MessageSquare,
    title: "Chat & Messaging",
    desc: "Full-featured messaging built around portal channels. Everything you expect — with none of the number exposure.",
    points: [
      "Text, images, video, documents, voice messages",
      "Per-chat or global read receipt control",
      "Per-chat or global double tick control",
      "Message reactions, replies, forwarding",
      "Disappearing messages with configurable timers",
      "My Chats — multiple private self-chat rooms",
    ],
    accent: "#4DB6AC",
    bg: "bg-[#FAFAF8]",
    altBg: "bg-[#E8F4F3]",
  },
  {
    id: "calls",
    badge: "Calls",
    icon: Phone,
    title: "Portal Calls",
    desc: "Voice and video calls routed through portal channels. Your real number never appears in a call.",
    points: [
      "HD voice and video calling",
      "Call history linked to portal numbers",
      "Granular call permissions per portal or globally",
      "Encrypted call metadata — no call logs stored",
    ],
    accent: "#D97706",
    bg: "bg-white",
    altBg: "bg-[#FFFBEB]",
  },
  {
    id: "groups",
    badge: "Groups",
    icon: Users,
    title: "Secure Groups",
    desc: "Every message in a group auto-generates a fresh portal number — making it impossible to track message flow.",
    points: [
      "Each message gets a unique GRP portal number automatically",
      "Admin controls: restrict messaging and info editing",
      "Member-level settings: allow/disallow contact saving",
      "Invite via link with reset capability",
      "Mute per group, leave or delete group",
      "Group media and document gallery",
    ],
    accent: "#7C3AED",
    bg: "bg-[#FAFAF8]",
    altBg: "bg-[#F5F3FF]",
  },
  {
    id: "status",
    badge: "Status",
    icon: Star,
    title: "Status & Stories",
    desc: "Post text, photo and video status updates with fine-grained privacy per update.",
    points: [
      "Text statuses with custom background colours",
      "Photo statuses with crop (9:16 format)",
      "Video statuses with trim tool (max 30s)",
      "Per-post privacy: everyone / selected numbers / selected portals / exclude specific contacts",
      "View count and viewer list for your own statuses",
      "Toggle viewer visibility on/off globally",
      "24-hour automatic deletion",
    ],
    accent: "#BE185D",
    bg: "bg-white",
    altBg: "bg-[#FFF0F5]",
  },
  {
    id: "profile",
    badge: "Identity",
    icon: Globe,
    title: "Multi-layer Profile System",
    desc: "Control what each contact sees. Three profile layers — global, per phone number, per portal.",
    points: [
      "Global profile: one identity across all portals",
      "Number profile: different identity per phone number",
      "Custom portal profile: unique identity per conversation",
      "Switch between layers with one tap",
      "Avatar, name and bio independently configurable",
    ],
    accent: "#4A5C3E",
    bg: "bg-[#FAFAF8]",
    altBg: "bg-[#F0F4F0]",
  },
  {
    id: "privacy",
    badge: "Privacy",
    icon: Lock,
    title: "Privacy Controls",
    desc: "Granular privacy settings at every level — global defaults you can override per portal or per group.",
    points: [
      "Last seen visibility: everyone / portals only / nobody",
      "Online status visibility with the same three tiers",
      "Profile photo visibility controls",
      "Who can add you to groups",
      "Who can call you",
      "Read receipts and double ticks — global and per-chat",
      "Blocked portals list with unblock flow",
    ],
    accent: "#4DB6AC",
    bg: "bg-white",
    altBg: "bg-[#E8F4F3]",
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Shield className="w-3 h-3" /> Features
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Built for privacy.<br />
            <span style={{ color: "#4A5C3E" }}>Engineered for real use.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            Portal doesn't strip features in the name of privacy. You get everything — messaging, calls, groups, stories — running through a system where your real number is architecturally impossible to expose.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap justify-center gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 px-3 py-2 rounded-full hover:border-[#4A5C3E] hover:text-[#4A5C3E] transition-colors"
              >
                <s.icon className="w-3 h-3" />
                {s.badge}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Feature sections */}
      {SECTIONS.map((s, i) => {
        const Icon = s.icon;
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className={`py-20 px-6 ${flip ? s.altBg : s.bg}`}>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div className={flip ? "md:order-2" : ""}>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                  style={{ backgroundColor: s.accent + "18", color: s.accent }}
                >
                  <Icon className="w-3 h-3" />
                  {s.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                  {s.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">{s.desc}</p>
                <ul className="space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: s.accent }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={`flex items-center justify-center ${flip ? "md:order-1" : ""}`}>
                <div
                  className="w-full max-w-[260px] aspect-[9/16] rounded-3xl flex items-center justify-center"
                  style={{ backgroundColor: s.accent + "10", border: `2px solid ${s.accent}20` }}
                >
                  <Icon className="w-16 h-16" style={{ color: s.accent, opacity: 0.25 }} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 px-6 bg-[#4A5C3E] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Ready to try it?
          </h2>
          <p className="text-white/70 mb-8">Join the waitlist or download the beta now.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/waitlist" className="inline-flex items-center gap-2 bg-white text-[#4A5C3E] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
              Join waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/download" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              Download
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
