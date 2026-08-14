"use client";

import React from "react";
import { ArrowRightIcon } from "@/components/icons";

interface SubmitButtonProps {
  label?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function SubmitButton({
  label = "Submit Registration",
  isSubmitting = false,
  disabled = false,
  onClick,
}: SubmitButtonProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end w-full pt-6 border-t border-[#E2E8F0] mt-10">
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled || isSubmitting}
        className={`
          relative w-full sm:w-auto min-w-[220px] h-13 px-8 py-3.5
          rounded-xl font-semibold text-[15px] text-white tracking-wide
          flex items-center justify-center gap-2.5 transition-all duration-150 shadow-sm
          ${
            disabled || isSubmitting
              ? "bg-[#3525CD]/70 cursor-not-allowed opacity-80"
              : "bg-[#3525CD] hover:bg-[#2A1CA8] active:bg-[#201485] hover:shadow-md cursor-pointer"
          }
        `}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
