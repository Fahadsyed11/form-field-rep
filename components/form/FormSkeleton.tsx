"use client";

import React from "react";

export function FormSkeleton() {
  return (
    <div className="w-full max-w-[800px] flex flex-col gap-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-6 w-48 bg-slate-200 rounded-full" />
        <div className="h-9 w-3/4 bg-slate-300 rounded-lg" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 rounded" />
      </div>

      {/* Main Form Card Skeleton */}
      <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Banner Skeleton */}
        <div className="w-full h-44 bg-slate-200" />

        <div className="p-6 sm:p-10 flex flex-col gap-10">
          {/* Section 1 Skeleton */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-52 bg-indigo-100 rounded" />
              <div className="w-full h-px bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-24 bg-slate-200 rounded" />
                <div className="h-12 w-full bg-slate-100 rounded-lg border border-slate-200" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-28 bg-slate-200 rounded" />
                <div className="h-12 w-full bg-slate-100 rounded-lg border border-slate-200" />
              </div>
            </div>
          </div>

          {/* Section 2 Skeleton */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-44 bg-indigo-100 rounded" />
              <div className="w-full h-px bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-24 bg-slate-200 rounded" />
                <div className="h-12 w-full bg-slate-100 rounded-lg border border-slate-200" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-28 bg-slate-200 rounded" />
                <div className="h-24 w-full bg-slate-100 rounded-lg border border-slate-200" />
              </div>
            </div>
          </div>

          {/* Section 3 Skeleton */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-48 bg-indigo-100 rounded" />
              <div className="w-full h-px bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-16 bg-slate-100 rounded-xl border border-slate-200" />
              <div className="h-16 bg-slate-100 rounded-xl border border-slate-200" />
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="flex justify-end pt-6 border-t border-slate-200">
            <div className="h-12 w-48 bg-indigo-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
