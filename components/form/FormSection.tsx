"use client";

import React from "react";
import { FormSection as IFormSection } from "@/types/form";
import { DynamicField } from "./DynamicField";

interface FormSectionProps {
  section: IFormSection;
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (fieldName: string, value: any) => void;
  onBlur?: (fieldName: string) => void;
  disabled?: boolean;
}

export function FormSection({
  section,
  values,
  errors,
  onChange,
  onBlur,
  disabled = false,
}: FormSectionProps) {
  // Sort fields by position if provided
  const sortedFields = [...section.fields].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );

  return (
    <section className="flex flex-col w-full">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#3525CD] tracking-tight">
          {section.title}
        </h2>
        {section.description && (
          <p className="text-[14px] text-[#64748B] mt-1 leading-normal">
            {section.description}
          </p>
        )}
        {/* Academic Modernism Divider Line */}
        <div className="w-full h-px bg-[#E2E8F0] mt-3" />
      </div>

      {/* Dynamic Fields Grid (24px spacing as per spec) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {sortedFields.map((field) => (
          <DynamicField
            key={field.id || field.fieldName}
            field={field}
            value={values[field.fieldName]}
            onChange={onChange}
            onBlur={onBlur}
            error={errors[field.fieldName]}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}
