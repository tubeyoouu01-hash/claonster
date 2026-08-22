

import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Portal's terms of service — rules for using Portal, what you can and can't do, and our commitments to you.",
};

const SECTIONS = [
  { title: "Acceptance of terms", content: "By downloading, installing, or using Portal, you agree to these Terms of Service. If you do not agree, do not use Portal. These terms constitute a binding agreement between you and Portal Technologies Ltd." },
  { title: "Eligibility", content: "You must be at least 16 years old to use Portal. By using Portal, you represent that you are at least 16 years old. If you are under 18, you confirm that you have parental or guardian consent to use the app." },
  { title: "Permitted use", content: `You may use Portal to:
• Send and receive private messages through portal channels
• Make and receive voice and video calls through portal channels
• Share status updates with your contacts
• Create and participate in group conversations
• Store personal notes in private self-chat rooms

Portal is provided for lawful personal and professional communication only.` },
  { title: "Prohibited use", content: `You may NOT use Portal to:
• Send spam, unsolicited bulk messages, or automated messages
• Harass, threaten, abuse, or harm any other person
• Distribute illegal content, malware, or phishing material
• Violate any applicable law or regulation
• Attempt to reverse-engineer, decompile, or tamper with Portal's systems
• Impersonate another person or entity
• Circumvent Portal's security or privacy mechanisms for malicious purposes
• Use Portal for any purpose that facilitates terrorism, violence, or exploitation of minors

Violation of these terms may result in immediate account termination and, where required by law, reporting to appropriate authorities.` },
  { title: "Portal numbers and channels", content: "Portal numbers are generated identifiers assigned to your conversations. You must not share portal numbers with the intent to deceive or defraud third parties. Portal numbers may be revoked by either party at any time. Revoked portals cannot be restored." },
  { title: "Content you share", content: "You retain ownership of all content you send through Portal. Because messages are end-to-end encrypted, Portal cannot access or moderate content in transit. You are solely responsible for the content you share and must ensure it complies with all applicable laws in your jurisdiction." },
  { title: "Service availability", content: "Portal is provided on an 'as is' and 'as available' basis. We do not guarantee uninterrupted availability. We may update, modify, or discontinue features with notice where reasonably practicable. We will endeavour to provide at least 30 days notice of material changes." },
  { title: "Account termination", content: "You may delete your account at any time from within the app. We may suspend or terminate accounts that violate these terms, with or without notice depending on severity. On termination, your portal identity and all associated data is permanently deleted within 72 hours." },
  { title: "Limitation of liability", content: "To the maximum extent permitted by law, Portal Technologies Ltd is not liable for any indirect, incidental, special, or consequential damages arising from your use of Portal. Our total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding the claim (which for free users is zero)." },
  { title: "Governing law", content: "These terms are governed by the laws of Nigeria. Any disputes shall be resolved in the courts of Lagos State, Nigeria, unless otherwise required by applicable consumer protection law in your jurisdiction." },
  { title: "Changes to these terms", content: "We may update these terms from time to time. Material changes will be communicated via in-app notification at least 30 days before they take effect. Continued use after that date constitutes acceptance." },
];

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#F0F4F0] to-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#4A5C3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <FileText className="w-3 h-3" /> Legal
          </span>
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Terms of Service
          </h1>
          <p className="text-gray-500">Last updated: 1 August 2026</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FAFAF8] mt-5 border border-gray-100 rounded-2xl p-6 mb-12 text-sm text-gray-600 leading-relaxed">
            <strong className="text-[#1A1A1A]">Plain English summary:</strong> Use Portal lawfully and respectfully. Don't spam, harass, or do anything illegal. We provide the service as-is. You can leave anytime and take your data with you.
          </div>

          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <div key={s.title} className="border-b border-gray-100 pb-10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-xs font-bold text-[#4A5C3E]/40 font-mono mt-1 w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-bold text-[#1A1A1A]">{s.title}</h2>
                </div>
                <div className="pl-9">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{s.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#F0F4F0] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#4A5C3E]" />
              <h3 className="font-bold text-[#1A1A1A]">Questions about these terms</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Contact our legal team at:</p>
            <a href="mailto:legal@portal.app" className="text-sm font-semibold text-[#4A5C3E] hover:underline">legal@portal.app</a>
            <div className="mt-4 pt-4 border-t border-[#4A5C3E]/10 flex gap-4 text-xs">
              <Link href="/privacy" className="text-[#4A5C3E] hover:underline">Privacy Policy</Link>
              <Link href="/security" className="text-[#4A5C3E] hover:underline">Security Model</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
