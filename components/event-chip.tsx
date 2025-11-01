import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface EventChipProps {
  title: string;
  color: string;
  type: "event" | "task" | "holiday";
  completed?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function EventChip({ title, color, type, completed, onClick }: EventChipProps) {
  // Determine left border color (darker shade)
  const leftBorderColor = color === "#1A73E8" ? "#1557B0" : "#0D652D";

  // Check if event should have a check icon (for tasks or events with "Create" in title)
  const hasCheckIcon = type === "task" || title.toLowerCase().includes("create");

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden rounded text-left text-[12px] font-medium leading-[18px] text-white",
        completed && "opacity-60"
      )}
      style={{
        backgroundColor: color,
        borderLeft: `4px solid ${leftBorderColor}`,
        padding: "4px 8px",
        borderRadius: "4px",
      }}
    >
      <div className="flex items-center gap-1">
        {hasCheckIcon && (
          <Check className={cn("h-[14px] w-[14px] flex-shrink-0", completed && "opacity-100")} />
        )}
        <span className={cn("line-clamp-1", completed && "line-through")}>
          {title}
        </span>
      </div>
    </button>
  );
}
