"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FormSchema, FormSubmissionResult } from "@/types/form";
import { getFormById, submitForm } from "@/services/formService";
import { FormHeader } from "./FormHeader";
import { DynamicForm } from "./DynamicForm";
import { FormFooter } from "./FormFooter";
import { FormSkeleton } from "./FormSkeleton";
import { SubmissionSuccess } from "@/components/ui/SubmissionSuccess";
import { ErrorState } from "@/components/ui/ErrorState";
import { SchemaSwitcher } from "@/components/ui/SchemaSwitcher";

interface FormPageProps {
  formId: string;
}

export function FormPage({ formId }: FormPageProps) {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState<"missing_id" | "not_found" | "network_error" | "empty" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult | null>(null);

  // Load form schema based on extracted formId
  const loadForm = useCallback(async () => {
    if (!formId || formId.trim() === "") {
      setIsLoading(false);
      setErrorType("missing_id");
      setErrorMessage("No registration identifier found in the URL.");
      return;
    }

    setIsLoading(true);
    setErrorType(null);
    setErrorMessage(null);
    setSubmissionResult(null);

    try {
      const data = await getFormById(formId);
      if (!data || !data.sections || data.sections.length === 0) {
        setErrorType("empty");
        setErrorMessage("This registration form currently has no active fields.");
      } else {
        setSchema(data);
      }
    } catch (err: any) {
      console.error("Error loading form:", err);
      setErrorType("not_found");
      setErrorMessage(err.message || "Unable to load the registration form.");
    } finally {
      setIsLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    loadForm();
  }, [loadForm]);

  // Submit dynamic responses
  const handleSubmit = async (responses: Record<string, any>) => {
    setIsSubmitting(true);
    try {
      const result = await submitForm(formId, responses);
      setSubmissionResult(result);
    } catch (err: any) {
      console.error("Submission failed:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    loadForm();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#121C2A] flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12">
      {/* Dev Switcher Toolbar */}
      <SchemaSwitcher currentId={formId} schema={schema} />

      {/* Main Content Area (Max width 800px) */}
      <main className="w-full max-w-[800px] flex flex-col items-center gap-8">
        {isLoading ? (
          <FormSkeleton />
        ) : errorType ? (
          <ErrorState
            type={errorType}
            message={errorMessage || undefined}
            onRetry={loadForm}
            onSelectSample={(sampleId) => {
              window.location.href = `/${sampleId}`;
            }}
          />
        ) : submissionResult && schema ? (
          <SubmissionSuccess
            schema={schema}
            result={submissionResult}
            onReset={handleReset}
          />
        ) : schema ? (
          <>
            {/* Header */}
            <FormHeader schema={schema} />

            {/* Dynamic Schema-Driven Form */}
            <DynamicForm
              schema={schema}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />

            {/* Institutional Footer */}
            <FormFooter
              footerText={schema.footerText}
              termsUrl={schema.termsUrl}
              privacyUrl={schema.privacyUrl}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}
