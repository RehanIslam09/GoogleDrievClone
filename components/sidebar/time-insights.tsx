"use client";

import { useState } from "react";
import { TrendingUp, ChevronDown, ChevronRight } from "lucide-react";

export default function TimeInsights() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 px-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded px-3 py-2 text-[14px] font-medium text-[#3c4043] transition-colors hover:bg-[#f1f3f4]"
      >
        <span>Time Insights</span>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-[#5f6368]" />
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-[#5f6368]" />
          ) : (
            <ChevronRight className="h-4 w-4 text-[#5f6368]" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 px-3 py-2 text-[13px] text-[#5f6368]">
          {/* Time insights content would go here */}
        </div>
      )}
    </div>
  );
}
