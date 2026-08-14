"use client";

import React from "react";
import { FormField } from "@/types/form";
import { AlertCircleIcon, CheckIcon } from "@/components/icons";

interface CheckboxGroupInputProps {
  field: FormField;
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function CheckboxGroupInput({
  field,
  value = [],
  onChange,
  onBlur,
  error,
  disabled = false,
}: CheckboxGroupInputProps) {
  const { id, fieldName, label, required, options = [], helpText } = field;
  const currentValues = Array.isArray(value) ? value : [];
  const hasError = Boolean(error);

  const toggleOption = (optValue: string) => {
    if (disabled) return;
    if (currentValues.includes(optValue)) {
      onChange(currentValues.filter((v) => v !== optValue));
    } else {
      onChange([...currentValues, optValue]);
    }
  };

  return (
    <fieldset className="flex flex-col gap-2 w-full border-none p-0 m-0">
      {/* Legend / Label */}
      <div className="flex items-center justify-between mb-1">
        <legend className="text-[12px] font-semibold tracking-wider text-[#464555] uppercase flex items-center gap-1 select-none">
          <span>{label}</span>
          {required && <span className="text-[#BA1A1A] font-bold" aria-hidden="true">*</span>}
        </legend>
        {currentValues.length > 0 && (
          <span className="text-[11px] font-semibold text-[#3525CD] bg-[#F1F3FD] px-2 py-0.5 rounded-full">
            {currentValues.length} selected
          </span>
        )}
      </div>

      {/* Grid of Checkbox Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = currentValues.includes(opt.value);
          const optionId = `${id || fieldName}-${opt.value}`;

          return (
            <label
              key={opt.value}
              htmlFor={optionId}
              className={`
                group relative flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 select-none
                ${
                  isSelected
                    ? "border-[#3525CD] bg-[#F8F9FF] ring-1 ring-[#3525CD]/20 shadow-xs"
                    : "border-[#E2E8F0] hover:border-[#B7C2DA] bg-white hover:bg-slate-50/50"
                }
                ${disabled ? "cursor-not-allowed opacity-60" : ""}
              `}
            >
              {/* Checkbox box */}
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  id={optionId}
                  name={fieldName}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => toggleOption(opt.value)}
                  onBlur={onBlur}
                  disabled={disabled}
                  className="sr-only"
                />
                <div
                  className={`
                    w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-150
                    ${
                      isSelected
                        ? "bg-[#3525CD] border-[#3525CD] text-white shadow-xs"
                        : "border-[#777587] bg-white group-hover:border-[#3525CD]"
                    }
                  `}
                >
                  {isSelected && <CheckIcon className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col pr-1">
                <span
                  className={`text-[14px] leading-snug font-medium transition-colors ${
                    isSelected ? "text-[#121C2A] font-semibold" : "text-[#1E293B]"
                  }`}
                >
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-[12px] text-[#64748B] mt-1 leading-relaxed">
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
