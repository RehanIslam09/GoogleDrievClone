import { getWeeks } from "@/lib/getTime";
import { useDateStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function SideBarCalendar() {
  const { setMonth, selectedMonthIndex, twoDMonthArray } = useDateStore();

  const weeksOfMonth = getWeeks(selectedMonthIndex);

  return (
    <div className="mb-5 px-2">
      {/* Calendar Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h4 className="text-[14px] font-medium text-[#3c4043]">
          {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
            "MMMM YYYY",
          )}
        </h4>
        <div className="flex items-center">
          <button
            onClick={() => setMonth(selectedMonthIndex - 1)}
            className="rounded-full p-2 transition-colors hover:bg-[#f1f3f4]"
          >
            <MdKeyboardArrowLeft className="h-5 w-5 text-[#5f6368]" />
          </button>
          <button
            onClick={() => setMonth(selectedMonthIndex + 1)}
            className="rounded-full p-2 transition-colors hover:bg-[#f1f3f4]"
          >
            <MdKeyboardArrowRight className="h-5 w-5 text-[#5f6368]" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center px-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <span key={i} className="text-[11px] font-medium uppercase text-[#70757a] py-1">
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 px-1">
        {twoDMonthArray.flat().map((day, index) => {
          const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
          const isCurrentMonth = day.month() === selectedMonthIndex;

          return (
            <button
              key={index}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-[12px] transition-colors hover:bg-[#f1f3f4]",
                isToday && "bg-[#1a73e8] text-white font-semibold hover:bg-[#1557b0]",
                !isToday && isCurrentMonth && "text-[#3c4043]",
                !isToday && !isCurrentMonth && "text-[#70757a] opacity-60",
              )}
            >
              {day.format("D")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
