"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/get-dictionary";
import { Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site-config";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("fullName");
    const email = form.get("email");
    const subjectField = form.get("subject");
    const message = form.get("message");

    const subject = encodeURIComponent(`${subjectField}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-sm border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-light/70 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{dict.contact.labels.fullName}</label>
          <input required name="fullName" type="text" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{dict.contact.labels.email}</label>
          <input required name="email" type="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">{dict.contact.labels.subject}</label>
        <input required name="subject" type="text" className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">{dict.contact.labels.message}</label>
        <textarea required name="message" rows={6} className={inputClass} />
      </div>

      {/* <p className="text-xs text-slate-light italic">{dict.contact.disclaimer}</p> */}

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-navy transition-colors"
      >
        {dict.contact.labels.submit}
        <Send className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {submitted && (
        <p className="text-sm text-navy bg-paper-dim border border-hairline rounded-sm px-4 py-3">
          {dict.apply.successNote}
        </p>
      )}
    </form>
  );
}
