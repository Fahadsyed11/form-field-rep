"use client";

import React from "react";
import { FormSchema } from "@/types/form";
import {
  BuildingIcon,
  CalendarIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/components/icons";

interface FormHeaderProps {
  schema: FormSchema;
}

export function FormHeader({ schema }: FormHeaderProps) {
  const { title, description, organization, metadata } = schema;

  return (
    <header className="flex flex-col gap-4 w-full text-left">
      {/* Organization Badge / Official Indicator */}
      {organization && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] text-[#3525CD] text-[12px] font-semibold tracking-wide">
            <BuildingIcon className="w-3.5 h-3.5" />
            <span>{organization.name}</span>
          </div>

          {organization.badge && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-[#464555] text-[11px] font-medium">
              <ShieldCheckIcon className="w-3 h-3 text-[#3525CD]" />
              <span>{organization.badge}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Title (32px Desktop / 24px Mobile) */}
      <h1 className="text-[24px] sm:text-[32px] font-bold leading-[32px] sm:leading-[40px] text-[#121C2A] tracking-tight">
        {title}
      </h1>

      {/* Description (16px / 24px) */}
      {description && (
        <p className="text-[15px] sm:text-[16px] font-normal leading-[24px] text-[#464555]">
          {description}
        </p>
      )}

      {/* Event Metadata Ribbon (Date, Location, Format) */}
      {metadata && (
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-[13px] font-medium text-[#64748B]">
          {metadata.date && (
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#3525CD]" />
              <span>{metadata.date}</span>
            </div>
          )}
          {metadata.location && (
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4 text-[#3525CD]" />
              <span>{metadata.location}</span>
            </div>
          )}
          {metadata.format && (
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5 text-[#3525CD]" />
              <span>{metadata.format}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
