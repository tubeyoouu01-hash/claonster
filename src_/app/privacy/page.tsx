

import type { Metadata } from "next";
import Link from "next/link";
import { Shield, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Portal's privacy policy — what we collect, what we don't, and how we protect you.",
};

const SECTIONS = [
  {
    title: "What we collect",
    content: `When you create a Portal account we collect:

• A cryptographic hash of your phone number — used solely for SMS verification. This hash cannot be reversed to obtain your real number.
• A generated portal identity (your portal alias), which is unlinked from your phone number after verification.
• Account creation timestamp.
• Device push notification token — stored encrypted, used only to deliver message delivery signals, not message content.

We do NOT collect: your real phone number (post-verification), message content, contact lists, call logs, location data, browsing history, or any biometric data.`,
  },
  {
    title: "How messages are handled",
    content: `All messages are end-to-end encrypted on your device using your portal channel's unique key pair. Messages arrive on our servers as encrypted ciphertext blobs. We cannot decrypt them.

Messages are deleted from our servers upon confirmed delivery or after 30 days, whichever comes first. Undelivered messages may be retained for up to 30 days to allow for delivery when a device comes online.

Portal never logs metadata linking portals to real identities. Message routing records (portal-to-portal routing) are retained for 7 days for abuse detection purposes only, then permanently deleted.`,
  },
  {
    title: "Portal numbers and channels",
    content: `Portal numbers are stored as encrypted identifiers in our database. They are not linked to real phone numbers in any accessible form.

Each portal channel's encryption keys are generated on your device and are not known to Portal. We store only the public keys needed to route encrypted messages between portal pairs.

When you delete a portal or revoke a portal number, the channel record and all associated routing information is permanently deleted from our systems within 24 hours.`,
  },
  {
    title: "Third-party services",
    content: `We use the following third-party services:

• SMS verification providers (e.g. Twilio) — receive your phone number for OTP delivery only. Their retention is governed by their own policies. We do not share your number with them beyond the verification request.
• Cloud infrastructure providers — host our encrypted infrastructure. They have no access to decrypted message content.
• Crash reporting (anonymised) — we collect anonymised crash reports to fix bugs. No personally identifiable information is included.

We do not sell your data. We do not share your data with advertisers. Portal is and will remain ad-free.`,
  },
  {
    title: "Data retention",
    content: `• Portal identity: retained while your account exists. Deleted permanently on account deletion.
• Encrypted messages: deleted on confirmed delivery or after 30 days.
• Routing metadata: deleted after 7 days.
• Push tokens: deleted on account deletion or device logout.
• Anonymised crash logs: retained for 90 days.

On account deletion, all data associated with your account is permanently deleted from our systems within 72 hours.`,
  },
  {
    title: "Your rights",
    content: `You have the right to:

• Access: request a copy of the data we hold about you.
• Deletion: delete your account and all associated data at any time from within the app (Settings > Account > Delete account).
• Portability: request your data in a machine-readable format.
• Correction: update your portal identity information at any time.
• Objection: object to any processing we carry out.

To exercise any of these rights, contact us at privacy@portal.app.`,
  },
  {
    title: "Legal requests",
    content: `If we receive a legally valid request for user data from a government or law enforcement authority, we will:

1. Notify the affected user before complying, where legally permitted.
2. Challenge any request we believe to be overbroad or legally invalid.
3. Produce only what we legally must — which, given our architecture, is limited to encrypted portal identities and timestamps. We cannot produce message content, real phone numbers, or contact graphs because we do not have them.

We publish a transparency report annually detailing the number and type of legal requests received.`,
  },
  {
    title: "Changes to this policy",
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you through the app with at least 30 days notice before changes take effect. Continued use of Portal after that date constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  const lastUpdated = "1 August 2026";

  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Shield className="w-3 h-3" /> Legal
          </span>
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-3">Last updated: {lastUpdated}</p>
          <p className="text-gray-600 leading-relaxed">
            Portal is built around a simple principle: we collect as little as possible, store it encrypted, and design our systems so that even if we wanted to betray your privacy, we architecturally couldn't. This policy explains exactly what that means in practice.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Quick summary banner */}
          <div className="bg-[#4A5C3E] text-white rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 flex-shrink-0 mt-1 text-white/60" />
              <div>
                <h2 className="font-bold text-lg mb-3">The short version</h2>
                <ul className="space-y-2 text-sm text-white/80 leading-relaxed">
                  {[
                    "Your real phone number is discarded after verification. We don't have it.",
                    "We cannot read your messages — they're E2E encrypted on your device.",
                    "We don't sell your data. We don't run ads. Ever.",
                    "A government subpoena gets us almost nothing — because we hold almost nothing.",
                    "You can delete everything, permanently, from inside the app at any time.",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#4DB6AC] mt-0.5">•</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full policy */}
          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <div key={s.title} className="border-b border-gray-100 pb-10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-xs font-bold text-[#4A5C3E]/40 font-mono mt-1 w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">{s.title}</h2>
                </div>
                <div className="pl-9">
                  {s.content.split("\n\n").map((para, j) => (
                    <p key={j} className="text-sm text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 bg-[#F0F4F0] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#4A5C3E]" />
              <h3 className="font-bold text-[#1A1A1A]">Privacy questions</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If you have questions about this policy or how we handle your data, contact our Data Protection team:
            </p>
            <a href="mailto:privacy@portal.app" className="text-sm font-semibold text-[#4A5C3E] hover:underline">
              privacy@portal.app
            </a>
            <div className="mt-4 pt-4 border-t border-[#4A5C3E]/10 flex gap-4 text-xs">
              <Link href="/terms" className="text-[#4A5C3E] hover:underline">Terms of Service</Link>
              <Link href="/security" className="text-[#4A5C3E] hover:underline">Security Model</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
