import Image from "next/image";
import * as Icons from "lucide-react";
import { seedImage } from "@/lib/sectors";
import type { LucideIcon } from "lucide-react";

type SectorCardProps = {
  id: string;
  icon: string;
  seed: string;
  name: string;
  description: string;
};

export function SectorCard({ id, icon, seed, name, description }: SectorCardProps) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[icon] ?? Icons.Building2;

  return (
    <div
      id={id}
      className="group relative overflow-hidden rounded-sm border border-hairline bg-white scroll-mt-28"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={seedImage(seed)}
          alt=""
          fill
          className="object-cover grayscale-[15%] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/70 via-ink-deep/0 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink-deep">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="font-display text-paper text-lg">{name}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
