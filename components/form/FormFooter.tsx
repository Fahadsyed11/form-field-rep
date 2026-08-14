"use client";

import React from "react";
import { ShieldCheckIcon } from "@/components/icons";

interface FormFooterProps {
  footerText?: string;
  termsUrl?: string;
  privacyUrl?: string;
}

export function FormFooter({
  footerText = "Official Academic Registry • Verified Secure Submission",
  termsUrl = "#terms",
  privacyUrl = "#privacy",
}: FormFooterProps) {
  return (
    <footer className="w-full max-w-[800px] mt-8 mb-12 flex flex-col items-center justify-center gap-3 text-center text-[#777587] text-[13px]">
      {/* Security & Verification note */}
      <div className="flex items-center gap-1.5 text-[#464555] font-medium">
        <ShieldCheckIcon className="w-4 h-4 text-[#3525CD]" />
        <span>{footerText}</span>
      </div>

      {/* Legal & Terms Links */}
      <div className="flex items-center gap-4 text-[12px] text-[#64748B]">
        <a
          href={termsUrl}
          className="hover:text-[#3525CD] transition-colors underline underline-offset-4 decoration-[#DCE1EE] hover:decoration-[#3525CD]"
        >
          Terms of Registration
        </a>
        <span>•</span>
        <a
          href={privacyUrl}
          className="hover:text-[#3525CD] transition-colors underline underline-offset-4 decoration-[#DCE1EE] hover:decoration-[#3525CD]"
        >
          Data Privacy Policy
        </a>
        <span>•</span>
        <span>ISO 27001 Certified System</span>
      </div>
    </footer>
  );
}
