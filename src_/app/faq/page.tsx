import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronDown, MessageSquare, Shield, Smartphone, Users, Lock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ / Help Center",
  description: "Answers to the most common questions about Portal — how portal numbers work, privacy, billing and more.",
};

const CATEGORIES = [
  {
    icon: Shield,
    label: "Privacy & Security",
    items: [
      {
        q: "Does Portal know my real phone number?",
        a: "Only during the initial SMS verification step — and only to confirm you own the number. After verification is complete, your real number is permanently discarded from our systems. It does not appear anywhere in your portal identity, your messages, or our database.",
      },
      {
        q: "What happens if someone leaks my portal number?",
        a: "Nothing useful to them. A portal number (e.g. PRT-8821-AXQZ) is a channel identifier — it points to an encrypted communication channel, not to a person. It contains no information about your real identity, your phone number, or your location. Whoever receives it cannot use it to reach you unless you've established an active portal with them.",
      },
      {
        q: "Can Portal read my messages?",
        a: "No. Messages are end-to-end encrypted on your device before they leave it. Portal's servers relay encrypted blobs — we have no ability to decrypt or read message content. Not even if legally compelled.",
      },
      {
        q: "What do you store on your servers?",
        a: "We store encrypted portal identities, encrypted message blobs (temporarily, until delivered), and portal channel metadata — all encrypted. We do not store real phone numbers, message content in plaintext, contact lists, call logs, or location data.",
      },
      {
        q: "Is Portal open source?",
        a: "Our cryptographic core is open to independent audit. We publish audit reports publicly, including any vulnerabilities found. Full open source of the client app is on our roadmap.",
      },
      {
        q: "What happens if Portal gets a government subpoena?",
        a: "We cannot provide what we do not have. Because we store no real phone numbers and no message content, any legal demand for that data would return nothing. We cannot be compelled to hand over data we never collected.",
      },
    ],
  },
  {
    icon: MessageSquare,
    label: "How Portal Numbers Work",
    items: [
      {
        q: "What exactly is a portal number?",
        a: "A portal number is a unique generated identifier (format: PRT-XXXX-YYYY) that acts as your alias in a specific conversation. Instead of sharing your real phone number with a contact, you share a portal number. Messages sent to that portal reach you, but your real number is never involved.",
      },
      {
        q: "Does each person I talk to get a different portal number?",
        a: "Yes. Each conversation pair gets its own unique portal. Your contact with Ekene uses PRT-3821-KQMX. Your contact with Adaeze uses PRT-5590-WBLR. These are completely separate channels with no link between them.",
      },
      {
        q: "How do I start a conversation with someone?",
        a: "Tap 'New Portal' to generate a fresh portal number, then share it with the person you want to chat with — via any channel (email, in person, another messenger). Once they enter it in Portal, your encrypted channel opens.",
      },
      {
        q: "Can the same portal number be used by multiple people?",
        a: "No. Each portal number is paired between exactly two people. It cannot be reused by a third party. For groups, each message auto-generates a fresh GRP portal number specific to that message delivery.",
      },
      {
        q: "What happens to a portal number if I delete a conversation?",
        a: "The portal number is revoked and the channel is permanently closed. Neither party can use that portal number to reach the other again. You would need to generate a new portal to re-establish contact.",
      },
    ],
  },
  {
    icon: Smartphone,
    label: "App & Account",
    items: [
      {
        q: "Is Portal free?",
        a: "Portal is free to download and use for individual messaging. We plan to introduce optional premium features for power users and institutional accounts in the future. Core privacy features will always remain free.",
      },
      {
        q: "Which devices does Portal support?",
        a: "Portal is available on iOS (iPhone and iPad) and Android. A desktop companion app is on our roadmap.",
      },
      {
        q: "Can I use Portal on multiple devices?",
        a: "Multi-device support is on our roadmap. Currently Portal is tied to one device per account. Your portal identity can be migrated to a new device securely.",
      },
      {
        q: "What happens if I lose my phone?",
        a: "You can remotely revoke all active portals from any trusted device or via our web portal. This immediately invalidates all your portal channels, protecting your conversations even if the device falls into the wrong hands.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings → Account actions → Delete account. This permanently removes your portal identity, revokes all active portals, and deletes all data we hold associated with your account. This action is irreversible.",
      },
    ],
  },
  {
    icon: Users,
    label: "Groups",
    items: [
      {
        q: "How do group portals work differently from DM portals?",
        a: "In a group, every single message you send automatically generates a fresh GRP portal number for that message's delivery. This means no single portal number can be used to track your group communication flow — each message has a different routing identity.",
      },
      {
        q: "Can group admins see members' real numbers?",
        a: "No. Group admins see only portal identities, never real phone numbers. The allowMembersSaveNumber setting controls whether members can save each other's portal contact info — but real numbers are never accessible.",
      },
      {
        q: "How do I invite someone to a group?",
        a: "Groups support invite links (portal.app/join/SLUG) that you can share via any channel. Admins can reset the invite link at any time to invalidate old links. You can also add members directly by searching their portal identity.",
      },
    ],
  },
  {
    icon: Lock,
    label: "Privacy Settings",
    items: [
      {
        q: "What does 'read receipts' control?",
        a: "When read receipts are on, the sender sees blue double ticks when you've read their message. When off, they only see grey ticks (delivered). You can set this globally for all chats or override it per individual conversation.",
      },
      {
        q: "What is 'last seen' and who can see it?",
        a: "'Last seen' shows the timestamp of when you were last active in the app. You can set visibility to: Everyone (all your contacts), My portals (only people with an active portal to you), or Nobody (completely hidden).",
      },
      {
        q: "Can I control who sees my status updates?",
        a: "Yes — per post. For each status update you can choose: Everyone, Selected phone numbers only, Selected portals only, Everyone except specific numbers, or Everyone except specific portals. You can also set a global default and override it per post.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-3 h-3" /> Help Center
          </span>
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Frequently asked questions
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Everything you need to know about Portal. Can't find your answer?{" "}
            <Link href="/contact" className="text-[#4A5C3E] font-semibold hover:underline">Contact us</Link>.
          </p>
          {/* Category jump links */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.label}
                href={`#${c.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 px-3 py-2 rounded-full hover:border-[#4A5C3E] hover:text-[#4A5C3E] transition-colors"
              >
                <c.icon className="w-3 h-3" />
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const slug = cat.label.toLowerCase().replace(/[^a-z]+/g, "-");
            return (
              <div key={cat.label} id={slug}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F4F0] flex items-center justify-center">
                    <CatIcon className="w-5 h-5 text-[#4A5C3E]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">{cat.label}</h2>
                </div>

                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <details
                      key={item.q}
                      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#4A5C3E]/30 transition-colors"
                    >
                      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                        <span className="font-semibold text-[#1A1A1A] text-sm leading-snug">{item.q}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-5">
                        <div className="h-px bg-gray-100 mb-4" />
                        <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Still need help */}
      <section className="py-16 px-6 bg-[#F0F4F0] text-center">
        <div className="max-w-xl mx-auto">
          <MessageSquare className="w-10 h-10 text-[#4A5C3E] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Still have questions?
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Our team typically responds within a few hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#2E3D26] transition-colors"
          >
            Contact support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
