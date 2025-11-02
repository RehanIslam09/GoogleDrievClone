"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const myCalendars = [
  { id: "cal1", title: "Rehan Islam", color: "#039be5", checked: true },
  { id: "cal2", title: "Birthdays", color: "#0b8043", checked: true },
  { id: "cal3", title: "Tasks", color: "#039be5", checked: true },
];

const otherCalendars = [
  { id: "other1", title: "Holidays in India", color: "#0b8043", checked: true },
  { id: "other2", title: "Holidays in India", color: "#0b8043", checked: true },
];

export default function MyCalendars() {
  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [otherCalendarsOpen, setOtherCalendarsOpen] = useState(true);

  return (
    <div className="px-2">
      {/* My Calendars Section */}
      <div className="mb-3">
        <button
          onClick={() => setMyCalendarsOpen(!myCalendarsOpen)}
          className="mb-1 flex w-full items-center gap-2 rounded px-3 py-2 text-[14px] font-medium text-[#3c4043] transition-colors hover:bg-[#f1f3f4]"
        >
          {myCalendarsOpen ? (
            <ChevronDown className="h-5 w-5 text-[#5f6368]" />
          ) : (
            <ChevronRight className="h-5 w-5 text-[#5f6368]" />
          )}
          <span>My calendars</span>
        </button>
        {myCalendarsOpen && (
          <div className="space-y-0.5 pl-1">
            {myCalendars.map((cal) => (
              <label
                key={cal.id}
                htmlFor={cal.id}
                className="flex h-8 cursor-pointer items-center gap-3 rounded px-3 transition-colors hover:bg-[#f1f3f4]"
              >
                <input
                  type="checkbox"
                  id={cal.id}
                  defaultChecked={cal.checked}
                  className="h-4 w-4 flex-shrink-0 cursor-pointer rounded border-[#dadce0]"
                  style={{ accentColor: cal.color }}
                />
                <span className="flex-1 truncate text-[14px] text-[#3c4043]">
                  {cal.title}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Other Calendars Section */}
      <div className="mb-3">
        <button
          onClick={() => setOtherCalendarsOpen(!otherCalendarsOpen)}
          className="mb-1 flex w-full items-center gap-2 rounded px-3 py-2 text-[14px] font-medium text-[#3c4043] transition-colors hover:bg-[#f1f3f4]"
        >
          {otherCalendarsOpen ? (
            <ChevronDown className="h-5 w-5 text-[#5f6368]" />
          ) : (
            <ChevronRight className="h-5 w-5 text-[#5f6368]" />
          )}
          <span className="flex-1 text-left">Other calendars</span>
          <button
            className="rounded p-1 transition-colors hover:bg-[#e8eaed]"
            onClick={(e) => {
              e.stopPropagation();
              // Add calendar logic here
            }}
          >
            <Plus className="h-4 w-4 text-[#5f6368]" />
          </button>
        </button>
        {otherCalendarsOpen && (
          <div className="space-y-0.5 pl-1">
            {otherCalendars.map((cal) => (
              <label
                key={cal.id}
                htmlFor={cal.id}
                className="flex h-8 cursor-pointer items-center gap-3 rounded px-3 transition-colors hover:bg-[#f1f3f4]"
              >
                <input
                  type="checkbox"
                  id={cal.id}
                  defaultChecked={cal.checked}
                  className="h-4 w-4 flex-shrink-0 cursor-pointer rounded border-[#dadce0]"
                  style={{ accentColor: cal.color }}
                />
                <span className="flex-1 truncate text-[14px] text-[#3c4043]">
                  {cal.title}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
