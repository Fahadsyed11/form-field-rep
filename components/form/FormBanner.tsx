"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SparklesIcon } from "@/components/icons";

interface FormBannerProps {
  bannerUrl?: string;
  title: string;
}

export function FormBanner({ bannerUrl, title }: FormBannerProps) {
  const [imageError, setImageError] = useState(false);

  if (!bannerUrl || imageError) {
    return (
      <div className="relative w-full h-36 sm:h-44 rounded-t-2xl overflow-hidden bg-gradient-to-r from-[#121C2A] via-[#1E1B4B] to-[#3525CD] flex items-center justify-between px-6 sm:px-10">
        <div className="flex flex-col z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-white/90 text-[11px] font-semibold tracking-wider uppercase mb-1.5 w-fit">
            <SparklesIcon className="w-3 h-3 text-[#A5B4FC]" />
            <span>Academic Portal</span>
          </div>
          <span className="text-white font-bold text-lg sm:text-xl tracking-tight max-w-md line-clamp-1">
            {title}
          </span>
        </div>
        {/* Subtle geometric background accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-indigo-200 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-44 sm:h-52 rounded-t-2xl overflow-hidden bg-slate-100">
      <Image
        src={bannerUrl}
        alt={title}
        fill
        sizes="(max-width: 800px) 100vw, 800px"
        className="object-cover"
        priority
        onError={() => setImageError(true)}
      />
      {/* Subtle overlay gradient to ensure smooth transition to white card content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
    </div>
  );
}
