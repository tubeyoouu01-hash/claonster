"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/get-dictionary";
import { Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site-config";

export function ApplyForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("fullName");
    const email = form.get("email");
    const phone = form.get("phone");
    const category = form.get("loanCategory");
    const sector = form.get("sector");
    const amount = form.get("amount");
    const purpose = form.get("purpose");

    const subject = encodeURIComponent(`Loan Application — ${category}`);
    const body = encodeURIComponent(
      `Full Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLoan Category: ${category}\nSector: ${sector}\nApproximate Amount: ${amount}\n\nDetails:\n${purpose}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-sm border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-light/70 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.fullName}</label>
          <input required name="fullName" type="text" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.email}</label>
          <input required name="email" type="email" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.phone}</label>
          <input name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.amount}</label>
          <input name="amount" type="text" className={inputClass} placeholder="A$" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.loanCategory}</label>
        <select required name="loanCategory" className={inputClass}>
          {dict.apply.loanCategoryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.sector}</label>
        <input name="sector" type="text" className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">{dict.apply.labels.purpose}</label>
        <textarea required name="purpose" rows={5} className={inputClass} />
      </div>

      {/* <p className="text-xs text-slate-light italic">{dict.apply.disclaimer}</p> */}

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-navy transition-colors"
      >
        {dict.apply.labels.submit}
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
