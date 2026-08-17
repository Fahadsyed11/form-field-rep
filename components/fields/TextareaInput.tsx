"use client";

import React from "react";
import { FormField } from "@/types/form";
import { AlertCircleIcon } from "@/components/icons";

interface TextareaInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function TextareaInput({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: TextareaInputProps) {
  const { id, fieldName, label, placeholder, required, helpText, validation } = field;
  const currentLength = (value || "").length;
  const maxLength = validation?.maxLength;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Top Label with Character Counter */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={id || fieldName}
          className="text-[12px] font-semibold tracking-wider text-[#464555] uppercase flex items-center gap-1 select-none"
        >
          <span>{label}</span>
          {required && <span className="text-[#BA1A1A] font-bold" aria-hidden="true">*</span>}
        </label>
        {maxLength && (
          <span className="text-[11px] font-medium text-[#777587]">
            {currentLength} / {maxLength}
          </span>
        )}
      </div>

      {/* Textarea */}
      <textarea
        id={id || fieldName}
        name={fieldName}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        rows={4}
        maxLength={maxLength}
        minLength={validation?.minLength}
        required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id || fieldName}-error` : helpText ? `${id || fieldName}-help` : undefined}
        className={`
          w-full min-h-[110px] px-3.5 py-3 text-[15px] text-[#121C2A] bg-white
          rounded-lg border transition-all duration-150 outline-none resize-y
          placeholder:text-[#94A3B8] placeholder:text-[14px] leading-relaxed
          ${
            hasError
              ? "border-[#BA1A1A] focus:border-[#BA1A1A] focus:ring-4 focus:ring-[#BA1A1A]/10"
              : "border-[#DCE1EE] hover:border-[#B7C2DA] focus:border-[#3525CD] focus:ring-4 focus:ring-[#3525CD]/10"
          }
          ${disabled ? "bg-slate-50 text-slate-400 cursor-not-allowed opacity-75" : ""}
        `}
      />

      {/* Help text */}
      {helpText && !hasError && (
        <p id={`${id || fieldName}-help`} className="text-[13px] text-[#64748B] leading-snug">
          {helpText}
        </p>
      )}

      {/* Error message */}
      {hasError && (
        <p
          id={`${id || fieldName}-error`}
          role="alert"
          className="text-[13px] font-medium text-[#BA1A1A] flex items-center gap-1.5 mt-0.5"
        >
          <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
