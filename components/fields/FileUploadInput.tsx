"use client";

import React, { useRef, useState } from "react";
import { FormField } from "@/types/form";
import { AlertCircleIcon, FileTextIcon, UploadCloudIcon, XIcon } from "@/components/icons";

interface FileUploadInputProps {
  field: FormField;
  value: any;
  onChange: (fileMeta: { name: string; size: number; type: string } | null) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export function FileUploadInput({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: FileUploadInputProps) {
  const { id, fieldName, label, required, helpText, validation } = field;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const acceptedTypes = validation?.acceptedFileTypes || [];
  const maxSizeBytes = (validation?.maxFileSizeMB || 10) * 1024 * 1024;
  const acceptString = acceptedTypes.join(",");

  const handleFile = (file: File | undefined) => {
    setInternalError(null);
    if (!file) return;

    // Validate size
    if (file.size > maxSizeBytes) {
      const err = `File size exceeds the limit of ${validation?.maxFileSizeMB || 10}MB`;
      setInternalError(err);
      return;
    }

    // Validate extension/type if defined
    if (acceptedTypes.length > 0) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      const isAccepted = acceptedTypes.some(
        (t) => t.toLowerCase() === ext || file.type.includes(t.replace(".", ""))
      );
      if (!isAccepted) {
        const err = `Unsupported file type. Accepted formats: ${acceptedTypes.join(", ")}`;
        setInternalError(err);
        return;
      }
    }

    // Store metadata
    onChange({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    if (onBlur) onBlur();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setInternalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const displayError = error || internalError;
  const hasError = Boolean(displayError);

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

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={id || fieldName}
        name={fieldName}
        type="file"
        accept={acceptString}
        disabled={disabled}
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {/* Upload Box / Selected File View */}
      {value ? (
        <div className="flex items-center justify-between p-3.5 bg-[#F8F9FF] border border-[#3525CD]/30 rounded-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#EEF0FF] text-[#3525CD] flex items-center justify-center shrink-0">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-semibold text-[#121C2A] truncate">
                {value.name}
              </span>
              <span className="text-[12px] text-[#64748B]">
                {formatFileSize(value.size)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className="p-1.5 text-[#777587] hover:text-[#BA1A1A] hover:bg-[#FFDAD6]/40 rounded-lg transition-colors"
            title="Remove file"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-150 text-center
            ${
              isDragging
                ? "border-[#3525CD] bg-[#F1F3FD]"
                : hasError
                ? "border-[#BA1A1A] bg-red-50/20"
                : "border-[#DCE1EE] hover:border-[#3525CD] bg-[#F8F9FF]/60 hover:bg-[#F8F9FF]"
            }
            ${disabled ? "cursor-not-allowed opacity-60" : ""}
          `}
        >
          <div className="w-11 h-11 rounded-full bg-[#EEF0FF] text-[#3525CD] flex items-center justify-center mb-2.5">
            <UploadCloudIcon className="w-5 h-5" />
          </div>
          <p className="text-[14px] font-semibold text-[#121C2A]">
            <span className="text-[#3525CD] hover:underline">Click to upload</span> or drag and drop
          </p>
          <p className="text-[12px] text-[#64748B] mt-1">
            {acceptedTypes.length > 0 ? acceptedTypes.join(", ").toUpperCase() : "Any document"}{" "}
            (Max {validation?.maxFileSizeMB || 10}MB)
          </p>
        </div>
      )}

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
          <span>{displayError}</span>
        </p>
      )}
    </div>
  );
}
