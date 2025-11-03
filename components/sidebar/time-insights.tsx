"use client";

import { TrendingUp } from "lucide-react";
import { useTimeInsightsPanelStore } from "@/lib/store";

export default function TimeInsights() {
  const { openTimeInsightsPanel } = useTimeInsightsPanelStore();

  return (
    <div className="mb-4 px-2">
      <button
        onClick={openTimeInsightsPanel}
        className="flex w-full items-center justify-between rounded px-3 py-2 text-[14px] font-medium text-[#3c4043] transition-colors hover:bg-[#f1f3f4]"
      >
        <span>Time Insights</span>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-[#5f6368]" />
        </div>
      </button>
    </div>
  );
}
