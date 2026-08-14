"use client";

import React from "react";
import { AlertCircleIcon, RefreshCwIcon } from "@/components/icons";

interface ErrorStateProps {
  type?: "missing_id" | "not_found" | "network_error" | "empty";
  message?: string;
  onRetry?: () => void;
  onSelectSample?: (id: string) => void;
}

export function ErrorState({
  type = "not_found",
  message,
  onRetry,
  onSelectSample,
}: ErrorStateProps) {
  const getTitle = () => {
    switch (type) {
      case "missing_id":
        return "Invalid Registration Link";
      case "empty":
        return "Registration Form Unavailable";
      case "network_error":
        return "Connection Issue";
      case "not_found":
      default:
        return "Form Not Found";
    }
  };

  const getDescription = () => {
    if (message) return message;
    switch (type) {
      case "missing_id":
        return "No registration form identifier was detected in the URL. Please verify your event invitation link.";
      case "empty":
        return "This registration form is currently unavailable or has expired. Please contact the event administrator.";
      case "network_error":
        return "Unable to load the registration form. Please check your connection and try again.";
      case "not_found":
      default:
        return "The requested event registration form could not be found or may have been moved.";
    }
  };

  return (
    <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-12 flex flex-col items-center text-center">
      {/* Error Icon */}
      <div className="w-16 h-16 rounded-full bg-red-50 text-[#BA1A1A] flex items-center justify-center mb-6 ring-8 ring-red-50/50">
        <AlertCircleIcon className="w-8 h-8" />
      </div>

      <h2 className="text-[22px] sm:text-[26px] font-bold text-[#121C2A] tracking-tight">
        {getTitle()}
      </h2>
      <p className="text-[15px] text-[#464555] max-w-md mt-2.5 leading-relaxed">
        {getDescription()}
      </p>

      {/* Primary Action */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3525CD] text-white font-semibold text-[14px] hover:bg-[#2A1CA8] transition-colors cursor-pointer"
          >
            <RefreshCwIcon className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>

      {/* Sample Forms for Testing */}
      {onSelectSample && (
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] w-full flex flex-col items-center">
          <span className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Explore Available Demo Forms
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => onSelectSample("abc123")}
              className="text-[13px] font-medium text-[#3525CD] bg-[#F8F9FF] border border-[#DCE1EE] px-3.5 py-1.5 rounded-lg hover:bg-[#EEF0FF] transition-colors cursor-pointer"
            >
              Annual Tech Symposium (abc123)
            </button>
            <button
              type="button"
              onClick={() => onSelectSample("hackathon-2026")}
              className="text-[13px] font-medium text-[#3525CD] bg-[#F8F9FF] border border-[#DCE1EE] px-3.5 py-1.5 rounded-lg hover:bg-[#EEF0FF] transition-colors cursor-pointer"
            >
              Global AI Hackathon
            </button>
            <button
              type="button"
              onClick={() => onSelectSample("research-symposium")}
              className="text-[13px] font-medium text-[#3525CD] bg-[#F8F9FF] border border-[#DCE1EE] px-3.5 py-1.5 rounded-lg hover:bg-[#EEF0FF] transition-colors cursor-pointer"
            >
              Research Symposium
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
