import { Landmark } from "lucide-react";
import { SITE_SHORT_NAME } from "@/lib/site-config";
import Image from "next/image";

/**
 * Placeholder logo mark. This is intentionally a plain lucide icon in a
 * badge, not a designed wordmark — swap this component out for a real
 * SVG logo when this template is adapted for an actual business.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
        // bg-gold 

      className={`flex items-center justify-center rounded-full 
        text-ink-deep ${className ?? "h-9 w-9"}`}
      aria-label={`${SITE_SHORT_NAME} logo placeholder`}
    >
{/* WhatsApp_Image_2026-08-20_at_16.31.19-removebg-preview.png */}
        <Image
              src={"/logo.png"}
              alt=""
              // width={}
              // fill 
              width={30}
              height={30}
              // className="object-cover grayscale-[15%] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
              // sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              sizes="55vw, 55vh"
            />
      {/* <Landmark className="h-[55%] w-[55%]" strokeWidth={2} /> */}
    </span>
  );
}
