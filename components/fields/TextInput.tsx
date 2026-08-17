"use client";

import React from "react";
import { FormField } from "@/types/form";
import { AlertCircleIcon } from "@/components/icons";

interface TextInputProps {
  field: FormField;
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function TextInput({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: TextInputProps) {
  const { id, fieldName, label, placeholder, type, required, helpText, validation } = field;

  // Determine HTML input type
  const inputType =
    type === "email"
      ? "email"
      : type === "tel"
      ? "tel"
      : type === "number"
      ? "number"
      : type === "date"
      ? "date"
      : type === "url"
      ? "url"
      : "text";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const numVal = e.target.value === "" ? "" : Number(e.target.value);
      onChange(numVal);
    } else {
      onChange(e.target.value);
    }
  };

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

      {/* Input element */}
      <div className="relative">
        <input
          id={id || fieldName}
          name={fieldName}
          type={inputType}
          value={value ?? ""}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder || (type === "date" ? "Select a date" : `Enter ${label.toLowerCase()}`)}
          min={validation?.min}
          max={validation?.max}
          minLength={validation?.minLength}
          maxLength={validation?.maxLength}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id || fieldName}-error` : helpText ? `${id || fieldName}-help` : undefined}
          className={`
            w-full h-12 px-3.5 py-2.5 text-[15px] text-[#121C2A] bg-white
            rounded-lg border transition-all duration-150 outline-none
            placeholder:text-[#94A3B8] placeholder:text-[14px]
            ${
              hasError
                ? "border-[#BA1A1A] focus:border-[#BA1A1A] focus:ring-4 focus:ring-[#BA1A1A]/10"
                : "border-[#DCE1EE] hover:border-[#B7C2DA] focus:border-[#3525CD] focus:ring-4 focus:ring-[#3525CD]/10"
            }
            ${disabled ? "bg-slate-50 text-slate-400 cursor-not-allowed opacity-75" : ""}
          `}
        />
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
