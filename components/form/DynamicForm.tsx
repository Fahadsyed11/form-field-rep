"use client";

import React, { useEffect, useState } from "react";
import { FormField, FormSchema } from "@/types/form";
import { FormBanner } from "./FormBanner";
import { FormSection } from "./FormSection";
import { SubmitButton } from "./SubmitButton";

interface DynamicFormProps {
  schema: FormSchema;
  onSubmit: (responses: Record<string, any>) => Promise<void>;
  isSubmitting?: boolean;
}

/**
 * Validates an individual field against schema rules
 */
export function validateFormField(field: FormField, value: any): string | null {
  const { type, required, label, validation } = field;

  // 1. Required Check
  if (required) {
    if (value === undefined || value === null || value === "") {
      return validation?.customErrorMessage || `${label} is required.`;
    }
    if (Array.isArray(value) && value.length === 0) {
      return validation?.customErrorMessage || `Please select at least one option.`;
    }
    if (type === "file" && !value) {
      return validation?.customErrorMessage || `Please upload the required file.`;
    }
  }

  // If empty and not required, skip remaining type/format checks
  if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  const strValue = typeof value === "string" ? value.trim() : "";

  // 2. Email Validation
  if (type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(strValue)) {
      return "Please enter a valid email address (e.g. name@university.edu).";
    }
  }

  // 3. URL Validation
  if (type === "url") {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(strValue)) {
      return "Please enter a valid website or profile URL (e.g. https://...).";
    }
  }

  // 4. Phone Validation
  if (type === "tel") {
    const phoneDigits = strValue.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return "Please enter a valid contact phone number.";
    }
  }

  // 5. Number Validation
  if (type === "number") {
    const num = Number(value);
    if (isNaN(num)) {
      return "Please enter a valid numeric value.";
    }
    if (validation?.min !== undefined && num < validation.min) {
      return `Minimum allowed value is ${validation.min}.`;
    }
    if (validation?.max !== undefined && num > validation.max) {
      return `Maximum allowed value is ${validation.max}.`;
    }
  }

  // 6. String Length Validations (Text / Textarea)
  if (type === "text" || type === "textarea") {
    if (validation?.minLength && strValue.length < validation.minLength) {
      return `Must be at least ${validation.minLength} characters (currently ${strValue.length}).`;
    }
    if (validation?.maxLength && strValue.length > validation.maxLength) {
      return `Cannot exceed ${validation.maxLength} characters.`;
    }
  }

  // 7. Custom Regex Pattern
  if (validation?.pattern) {
    try {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(strValue)) {
        return validation.customErrorMessage || `Please match the requested format.`;
      }
    } catch {
      // Ignore invalid regex in schema
    }
  }

  return null;
}

export function DynamicForm({ schema, onSubmit, isSubmitting = false }: DynamicFormProps) {
  // Initialize dynamic form values from schema fields
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Reset or initialize state when schema changes
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    schema.sections.forEach((sec) => {
      sec.fields.forEach((f) => {
        if (f.defaultValue !== undefined) {
          initialValues[f.fieldName] = f.defaultValue;
        } else if (f.type === "checkbox") {
          initialValues[f.fieldName] = [];
        } else if (f.type === "file") {
          initialValues[f.fieldName] = null;
        } else {
          initialValues[f.fieldName] = "";
        }
      });
    });
    setFormValues(initialValues);
    setFormErrors({});
    setTouchedFields({});
  }, [schema]);

  // Find field definition by name
  const findFieldByName = (fieldName: string): FormField | undefined => {
    for (const sec of schema.sections) {
      const match = sec.fields.find((f) => f.fieldName === fieldName);
      if (match) return match;
    }
    return undefined;
  };

  // Handle individual field value update
  const handleFieldValueChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // If field was touched or currently has an error, revalidate immediately
    if (touchedFields[fieldName] || formErrors[fieldName]) {
      const fieldDef = findFieldByName(fieldName);
      if (fieldDef) {
        const error = validateFormField(fieldDef, value);
        setFormErrors((prev) => {
          const updated = { ...prev };
          if (error) {
            updated[fieldName] = error;
          } else {
            delete updated[fieldName];
          }
          return updated;
        });
      }
    }
  };

  // Handle field blur
  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    const fieldDef = findFieldByName(fieldName);
    if (fieldDef) {
      const error = validateFormField(fieldDef, formValues[fieldName]);
      setFormErrors((prev) => {
        const updated = { ...prev };
        if (error) {
          updated[fieldName] = error;
        } else {
          delete updated[fieldName];
        }
        return updated;
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Comprehensive validation across all sections and fields
    const errors: Record<string, string> = {};
    const allTouched: Record<string, boolean> = {};

    schema.sections.forEach((sec) => {
      sec.fields.forEach((f) => {
        allTouched[f.fieldName] = true;
        const err = validateFormField(f, formValues[f.fieldName]);
        if (err) {
          errors[f.fieldName] = err;
        }
      });
    });

    setTouchedFields(allTouched);
    setFormErrors(errors);

    // If there are validation errors, scroll to first error field
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElem = document.getElementById(firstErrorField);
      if (errorElem) {
        errorElem.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElem.focus();
      }
      return;
    }

    // Call submit handler with dynamic responses
    await onSubmit(formValues);
  };

  // Sort sections by position
  const sortedSections = [...schema.sections].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-[800px] bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col transition-all duration-200"
    >
      {/* Event Banner */}
      <FormBanner bannerUrl={schema.banner} title={schema.title} />

      {/* Main Form Body */}
      <div className="p-6 sm:p-10 flex flex-col gap-10">
        {/* Dynamic Sections Loop */}
        {sortedSections.map((section) => (
          <FormSection
            key={section.id || section.title}
            section={section}
            values={formValues}
            errors={formErrors}
            onChange={handleFieldValueChange}
            onBlur={handleFieldBlur}
            disabled={isSubmitting}
          />
        ))}

        {/* Dynamic Submit Button */}
        <SubmitButton
          label={schema.submitButtonText || "Submit Registration"}
          isSubmitting={isSubmitting}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
