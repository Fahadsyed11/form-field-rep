export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "file"
  | "url";

export interface FieldOption {
  label: string;
  value: string;
  description?: string;
}

export interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customErrorMessage?: string;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[]; // e.g. [".pdf", ".png", ".jpg", ".jpeg", ".docx"]
}

export interface FormField {
  id: string;
  fieldName: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  required?: boolean;
  position?: number;
  options?: FieldOption[];
  defaultValue?: any;
  helpText?: string;
  validation?: FieldValidation;
  gridColumn?: "full" | "half" | "third" | "two-thirds";
  disabled?: boolean;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  position?: number;
  fields: FormField[];
}

export interface FormMetadata {
  date?: string;
  time?: string;
  location?: string;
  format?: string; // e.g. "In-Person", "Hybrid", "Virtual"
  organizer?: string;
  deadline?: string;
  capacity?: string;
  category?: string;
}

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  banner?: string;
  organization?: {
    name: string;
    logo?: string;
    badge?: string;
    verified?: boolean;
  };
  metadata?: FormMetadata;
  sections: FormSection[];
  submitButtonText?: string;
  footerText?: string;
  termsUrl?: string;
  privacyUrl?: string;
}

export interface FormSubmissionPayload {
  formId: string;
  responses: Record<string, any>;
  submittedAt: string;
}

export interface FormSubmissionResult {
  success: boolean;
  submissionId: string;
  timestamp: string;
  message?: string;
  responsesSummary?: Record<string, any>;
}
