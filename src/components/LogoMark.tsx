import { Landmark } from "lucide-react";
import { SITE_SHORT_NAME } from "@/lib/site-config";

/**
 * Placeholder logo mark. This is intentionally a plain lucide icon in a
 * badge, not a designed wordmark — swap this component out for a real
 * SVG logo when this template is adapted for an actual business.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-gold text-ink-deep ${className ?? "h-9 w-9"}`}
      aria-label={`${SITE_SHORT_NAME} logo placeholder`}
    >
      <Landmark className="h-[55%] w-[55%]" strokeWidth={2} />
    </span>
  );
}
