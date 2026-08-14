"use client";

import React from "react";
import { FormField } from "@/types/form";
import { AlertCircleIcon } from "@/components/icons";

interface RadioGroupInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function RadioGroupInput({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: RadioGroupInputProps) {
  const { id, fieldName, label, required, options = [], helpText } = field;
  const hasError = Boolean(error);

  return (
    <fieldset className="flex flex-col gap-2 w-full border-none p-0 m-0">
      {/* Legend / Label */}
      <legend className="text-[12px] font-semibold tracking-wider text-[#464555] uppercase flex items-center gap-1 mb-1 select-none">
        <span>{label}</span>
        {required && <span className="text-[#BA1A1A] font-bold" aria-hidden="true">*</span>}
      </legend>

      {/* Radio Options List */}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optionId = `${id || fieldName}-${opt.value}`;

          return (
            <label
              key={opt.value}
              htmlFor={optionId}
              className={`
                group flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 select-none
                ${
                  isSelected
                    ? "border-[#3525CD] bg-[#F8F9FF] shadow-xs"
                    : "border-[#E2E8F0] hover:border-[#B7C2DA] bg-white hover:bg-slate-50/60"
                }
                ${disabled ? "cursor-not-allowed opacity-60" : ""}
              `}
            >
              {/* Radio Circle Indicator */}
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                  type="radio"
                  id={optionId}
                  name={fieldName}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange(opt.value)}
                  onBlur={onBlur}
                  disabled={disabled}
                  className="sr-only"
                />
                <div
                  className={`
                    w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                    ${
                      isSelected
                        ? "border-[#3525CD] bg-white"
                        : "border-[#777587] group-hover:border-[#3525CD]"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#3525CD]" />
                  )}
                </div>
              </div>

              {/* Label & Description */}
              <div className="flex flex-col">
                <span
                  className={`text-[14px] leading-snug font-medium transition-colors ${
                    isSelected ? "text-[#121C2A] font-semibold" : "text-[#334155]"
                  }`}
                >
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-[12px] text-[#64748B] mt-0.5 leading-normal">
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Help text */}
      {helpText && !hasError && (
        <p className="text-[13px] text-[#64748B] leading-snug mt-1">
          {helpText}
        </p>
      )}

      {/* Error message */}
      {hasError && (
        <p role="alert" className="text-[13px] font-medium text-[#BA1A1A] flex items-center gap-1.5 mt-1">
          <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </fieldset>
  );
}
