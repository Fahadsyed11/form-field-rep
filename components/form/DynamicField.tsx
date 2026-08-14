"use client";

import React from "react";
import { FormField } from "@/types/form";
import { TextInput } from "@/components/fields/TextInput";
import { TextareaInput } from "@/components/fields/TextareaInput";
import { SelectInput } from "@/components/fields/SelectInput";
import { RadioGroupInput } from "@/components/fields/RadioGroupInput";
import { CheckboxGroupInput } from "@/components/fields/CheckboxGroupInput";
import { FileUploadInput } from "@/components/fields/FileUploadInput";

interface DynamicFieldProps {
  field: FormField;
  value: any;
  onChange: (fieldName: string, value: any) => void;
  onBlur?: (fieldName: string) => void;
  error?: string;
  disabled?: boolean;
}

export function DynamicField({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: DynamicFieldProps) {
  const handleFieldChange = (val: any) => {
    onChange(field.fieldName, val);
  };

  const handleFieldBlur = () => {
    if (onBlur) {
      onBlur(field.fieldName);
    }
  };

  // Determine container column span
  const getGridColumnClass = () => {
    if (field.gridColumn === "full") return "col-span-1 md:col-span-2";
    if (field.gridColumn === "half") return "col-span-1";
    if (field.gridColumn === "third") return "col-span-1 md:col-span-1";

    // Defaults based on type
    if (field.type === "textarea" || field.type === "checkbox" || field.type === "file") {
      return "col-span-1 md:col-span-2";
    }
    return "col-span-1";
  };

  // Render appropriate field based on JSON type
  const renderFieldInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
      case "date":
      case "url":
        return (
          <TextInput
            field={field}
            value={value ?? ""}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );

      case "textarea":
        return (
          <TextareaInput
            field={field}
            value={value ?? ""}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );

      case "select":
        return (
          <SelectInput
            field={field}
            value={value ?? ""}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );

      case "radio":
        return (
          <RadioGroupInput
            field={field}
            value={value ?? ""}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );

      case "checkbox":
        return (
          <CheckboxGroupInput
            field={field}
            value={value ?? []}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );

      case "file":
        return (
          <FileUploadInput
            field={field}
            value={value ?? null}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );

      default:
        // Fallback for any unexpected future type
        return (
          <TextInput
            field={field}
            value={value ?? ""}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={error}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className={`w-full ${getGridColumnClass()}`}>
      {renderFieldInput()}
    </div>
  );
}
