"use client";

import React, { useState } from "react";
import { Plus, Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useDateStore, useEventStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { getMonth } from "@/lib/getTime";

export default function GoogleSidebar() {
  const { userSelectedDate, setDate, setMonth } = useDateStore();
  const { openPopover } = useEventStore();
  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [otherCalendarsOpen, setOtherCalendarsOpen] = useState(true);

  const miniMonth = getMonth(dayjs().month());

  const handleDateClick = (day: dayjs.Dayjs) => {
    setDate(day);
    setMonth(day.month());
  };

  const handleCreateClick = () => {
    setDate(dayjs());
    openPopover();
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#DADCE0] bg-[#F8F9FA]">
      {/* Create Button */}
      <div className="px-4 py-4">
        <button
          onClick={handleCreateClick}
          className="flex h-12 w-full items-center gap-3 rounded-[24px] bg-white px-6 text-sm font-medium text-[#3C4043] shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5 text-[#5F6368]" />
          <span>Create</span>
        </button>
      </div>

      {/* Mini Calendar */}
      <div className="px-4 pb-4">
        <div className="rounded-lg bg-white p-3">
          {/* Month/Year Header with Arrows */}
          <div className="mb-2 flex items-center justify-between">
            <button className="rounded-full p-1 hover:bg-[#F1F3F4]">
              <ChevronLeft className="h-4 w-4 text-[#5F6368]" />
            </button>
            <span className="text-sm font-medium text-[#3C4043]">
              {dayjs().format("MMMM YYYY")}
            </span>
            <button className="rounded-full p-1 hover:bg-[#F1F3F4]">
              <ChevronRight className="h-4 w-4 text-[#5F6368]" />
            </button>
          </div>

          {/* Day Abbreviations */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-[12px] font-normal text-[#70757A]">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {miniMonth.flat().map((day, index) => {
              if (!day) return <div key={index} className="h-8" />;

              const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
              const isSelected = day.format("DD-MM-YY") === userSelectedDate.format("DD-MM-YY");
              const isPrevNextMonth = day.month() !== dayjs().month();

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={cn(
                    "flex h-8 w-full items-center justify-center text-[12px]",
                    isToday && "relative"
                  )}
                >
                  {isToday ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A73E8]">
                      <span className="font-medium text-white">{day.date()}</span>
                    </div>
                  ) : (
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F1F3F4]",
                      isSelected && !isToday && "bg-[#E8F0FE]"
                    )}>
                      <span className={cn(
                        isPrevNextMonth ? "text-[#70757A]" : "text-[#3C4043]"
                      )}>
                        {day.date()}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search for People */}
      <div className="px-4 pb-4">
        <div className="flex h-10 items-center gap-2 rounded border border-[#DADCE0] bg-white px-3">
          <Search className="h-4 w-4 text-[#5F6368]" />
          <input
            type="text"
            placeholder="Search for people"
            className="flex-1 text-sm text-[#3C4043] placeholder-[#5F6368] outline-none"
          />
        </div>
      </div>

      {/* Scrollable Calendar Lists */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* My Calendars */}
        <div className="mb-4">
          <button
            onClick={() => setMyCalendarsOpen(!myCalendarsOpen)}
            className="mb-2 flex w-full items-center gap-1 py-1 text-sm font-medium text-[#3C4043] hover:bg-[#F1F3F4]"
          >
            {myCalendarsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span>My calendars</span>
          </button>

          {myCalendarsOpen && (
            <div className="space-y-1 pl-2">
              <CalendarItem name="Rehan Islam" color="#1A73E8" checked />
              <CalendarItem name="Birthdays" color="#0B8043" checked />
              <CalendarItem name="Tasks" color="#1A73E8" checked />
            </div>
          )}
        </div>

        {/* Other Calendars */}
        <div className="mb-4">
          <button
            onClick={() => setOtherCalendarsOpen(!otherCalendarsOpen)}
            className="mb-2 flex w-full items-center gap-1 py-1 text-sm font-medium text-[#3C4043] hover:bg-[#F1F3F4]"
          >
            {otherCalendarsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span>Other calendars</span>
            <Plus className="ml-auto h-4 w-4" />
          </button>

          {otherCalendarsOpen && (
            <div className="space-y-1 pl-2">
              <CalendarItem name="Holidays in India" color="#0B8043" checked />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function CalendarItem({
  name,
  color,
  checked,
}: {
  name: string;
  color: string;
  checked?: boolean;
}) {
  return (
    <div className="flex h-10 items-center gap-2 pl-2 hover:bg-[#F1F3F4]">
      <input
        type="checkbox"
        checked={checked}
        className="h-4 w-4 rounded border-[#DADCE0] accent-[#1A73E8]"
        readOnly
      />
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm text-[#3C4043]">{name}</span>
    </div>
  );
}
