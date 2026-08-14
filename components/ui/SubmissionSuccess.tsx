"use client";

import React, { useState } from "react";
import { FormSchema, FormSubmissionResult } from "@/types/form";
import { CheckCircleIcon, RefreshCwIcon, ShieldCheckIcon } from "@/components/icons";

interface SubmissionSuccessProps {
  schema: FormSchema;
  result: FormSubmissionResult;
  onReset: () => void;
}

export function SubmissionSuccess({ schema, result, onReset }: SubmissionSuccessProps) {
  const [copied, setCopied] = useState(false);

  const copyRefId = () => {
    navigator.clipboard.writeText(result.submissionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(result.timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full max-w-[800px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-12 flex flex-col items-center text-center">
      {/* Success Badge Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
        <CheckCircleIcon className="w-9 h-9" />
      </div>

      {/* Confirmation Heading */}
      <span className="text-[12px] font-bold tracking-widest text-[#3525CD] uppercase mb-1">
        Registration Confirmed
      </span>
      <h2 className="text-[26px] sm:text-[30px] font-bold text-[#121C2A] tracking-tight">
        You're officially registered!
      </h2>
      <p className="text-[15px] text-[#464555] max-w-lg mt-2 leading-relaxed">
        Thank you for completing your registration for{" "}
        <strong className="text-[#121C2A]">{schema.title}</strong>. A confirmation pass and
        symposium packet have been scheduled.
      </p>

      {/* Receipt / Reference Box */}
      <div className="w-full max-w-lg bg-[#F8F9FF] border border-[#DCE1EE] rounded-xl p-5 my-8 text-left flex flex-col gap-3">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-[#777587] uppercase tracking-wider">
              Registration Reference
            </span>
            <span className="text-[17px] font-mono font-bold text-[#3525CD]">
              {result.submissionId}
            </span>
          </div>
          <button
            type="button"
            onClick={copyRefId}
            className="text-[12px] font-medium text-[#3525CD] bg-white px-3 py-1.5 rounded-lg border border-[#DCE1EE] hover:bg-[#EEF0FF] transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy Ref"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[13px] pt-1">
          <div>
            <span className="text-[#64748B] block text-[11px]">Submitted On</span>
            <span className="font-medium text-[#121C2A]">{formattedDate}</span>
          </div>
          <div>
            <span className="text-[#64748B] block text-[11px]">Verification</span>
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
              <ShieldCheckIcon className="w-3.5 h-3.5" />
              Verified Authenticated
            </span>
          </div>
        </div>

        {/* Dynamic Summary Preview */}
        {result.responsesSummary && (
          <div className="mt-2 pt-3 border-t border-[#E2E8F0] flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#777587] uppercase tracking-wider">
              Submitted Profile Overview
            </span>
            <div className="bg-white rounded-lg p-3 border border-[#E2E8F0] text-[13px] text-left max-h-48 overflow-y-auto space-y-1.5">
              {Object.entries(result.responsesSummary).map(([key, val]) => {
                if (val === null || val === undefined || val === "") return null;
                const displayVal =
                  typeof val === "object"
                    ? Array.isArray(val)
                      ? val.join(", ")
                      : val.name || JSON.stringify(val)
                    : String(val);

                return (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-100 last:border-none">
                    <span className="font-medium text-[#64748B] capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="text-[#121C2A] font-semibold sm:text-right max-w-xs truncate">
                      {displayVal}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3525CD] text-white font-semibold text-[14px] hover:bg-[#2A1CA8] transition-colors cursor-pointer"
        >
          <RefreshCwIcon className="w-4 h-4" />
          <span>Submit Another Response</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#121C2A] font-medium text-[14px] border border-[#DCE1EE] hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span>Print Confirmation</span>
        </button>
      </div>
    </div>
  );
}
