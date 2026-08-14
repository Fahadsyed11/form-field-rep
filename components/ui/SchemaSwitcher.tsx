"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormSchema } from "@/types/form";
import { FileTextIcon, SparklesIcon, XIcon } from "@/components/icons";

interface SchemaSwitcherProps {
  currentId: string;
  schema?: FormSchema | null;
}

export function SchemaSwitcher({ currentId, schema }: SchemaSwitcherProps) {
  const router = useRouter();
  const [customInput, setCustomInput] = useState("");
  const [showJsonModal, setShowJsonModal] = useState(false);

  const mockForms = [
    { id: "abc123", label: "Tech Symposium (Reference)", badge: "Design Spec" },
    { id: "hackathon-2026", label: "Global AI Hackathon", badge: "Multi-track" },
    { id: "research-symposium", label: "Graduate Research", badge: "Academic" },
  ];

  const handleSelect = (id: string) => {
    router.push(`/${id}`);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      router.push(`/${customInput.trim().toLowerCase()}`);
      setCustomInput("");
    }
  };

  return (
    <>
      <aside
        aria-label="Schema Switcher Toolbar"
        className="w-full max-w-[800px] mb-6 bg-white/90 backdrop-blur-md rounded-xl border border-[#DCE1EE] p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]"
      >
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="inline-flex items-center gap-1.5 font-semibold text-[#121C2A] pr-2 border-r border-[#E2E8F0] shrink-0">
            <SparklesIcon className="w-4 h-4 text-[#3525CD]" />
            <span>Active Form:</span>
            <span className="font-mono text-[#3525CD] bg-[#EEF0FF] px-2 py-0.5 rounded text-[12px]">
              {currentId || "None"}
            </span>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {mockForms.map((f) => {
              const isActive = currentId.toLowerCase() === f.id.toLowerCase();
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleSelect(f.id)}
                  className={`
                    px-2.5 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer
                    ${
                      isActive
                        ? "bg-[#3525CD] text-white shadow-xs"
                        : "bg-[#F8F9FF] text-[#464555] hover:bg-[#EEF0FF] hover:text-[#3525CD] border border-[#E2E8F0]"
                    }
                  `}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: View Schema & Custom ID input */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {schema && (
            <button
              type="button"
              onClick={() => setShowJsonModal(true)}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#3525CD] hover:underline px-2 py-1 rounded cursor-pointer"
            >
              <FileTextIcon className="w-3.5 h-3.5" />
              <span>View JSON Schema</span>
            </button>
          )}

          <form onSubmit={handleCustomSubmit} className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Enter ID..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-24 px-2 py-1 text-[12px] border border-[#DCE1EE] rounded-lg bg-white text-[#121C2A] placeholder:text-slate-400 focus:outline-none focus:border-[#3525CD]"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-medium rounded-lg transition-colors cursor-pointer"
            >
              Go
            </button>
          </form>
        </div>
      </aside>

      {/* JSON Schema Viewer Modal */}
      {showJsonModal && schema && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#F8F9FF]">
              <div className="flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-[#3525CD]" />
                <h3 className="font-semibold text-[#121C2A] text-[15px]">
                  Dynamic Schema: {schema.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto font-mono text-[12px] bg-slate-900 text-emerald-400 leading-relaxed max-h-[60vh]">
              <pre>{JSON.stringify(schema, null, 2)}</pre>
            </div>
            <div className="p-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 bg-[#3525CD] text-white font-medium text-[13px] rounded-lg hover:bg-[#2A1CA8]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
