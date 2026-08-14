"use client";

import React from "react";
import { FormField } from "@/types/form";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/icons";

interface SelectInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function SelectInput({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: SelectInputProps) {
  const { id, fieldName, label, placeholder, required, options = [], helpText } = field;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <label
        htmlFor={id || fieldName}
        className="text-[12px] font-semibold tracking-wider text-[#464555] uppercase flex items-center gap-1 select-none"
      >
        <span>{label}</span>
        {required && <span className="text-[#BA1A1A] font-bold" aria-hidden="true">*</span>}
      </label>

      {/* Select Box with Custom Chevron */}
      <div className="relative">
        <select
          id={id || fieldName}
          name={fieldName}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id || fieldName}-error` : helpText ? `${id || fieldName}-help` : undefined}
          className={`
            w-full h-12 pl-3.5 pr-10 py-2.5 text-[15px] bg-white appearance-none
            rounded-lg border transition-all duration-150 outline-none cursor-pointer
            ${value ? "text-[#121C2A]" : "text-[#94A3B8]"}
            ${
              hasError
                ? "border-[#BA1A1A] focus:border-[#BA1A1A] focus:ring-4 focus:ring-[#BA1A1A]/10"
                : "border-[#DCE1EE] hover:border-[#B7C2DA] focus:border-[#3525CD] focus:ring-4 focus:ring-[#3525CD]/10"
            }
            ${disabled ? "bg-slate-50 text-slate-400 cursor-not-allowed opacity-75" : ""}
          `}
        >
          <option value="" disabled className="text-slate-400">
            {placeholder || "Select an option..."}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-[#121C2A] py-1">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron Icon */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#777587]">
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>

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
