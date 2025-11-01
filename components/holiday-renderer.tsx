import { HolidayType, useHolidayStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";

type HolidayRendererProps = {
  date: dayjs.Dayjs;
  view: "month" | "week" | "day";
  holidays: HolidayType[];
};

export function HolidayRenderer({ date, view, holidays }: HolidayRendererProps) {
  const { openHolidayCard } = useHolidayStore();

  const filteredHolidays = holidays.filter((holiday: HolidayType) => {
    if (view === "month") {
      return holiday.date.format("DD-MM-YY") === date.format("DD-MM-YY");
    } else if (view === "week" || view === "day") {
      return holiday.date.format("DD-MM-YY") === date.format("DD-MM-YY");
    }
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Public":
        return "border-green-500 bg-green-50 text-green-900";
      case "Observance":
        return "border-blue-500 bg-blue-50 text-blue-900";
      case "Regional":
        return "border-orange-500 bg-orange-50 text-orange-900";
      default:
        return "border-green-500 bg-green-50 text-green-900";
    }
  };

  return (
    <>
      {filteredHolidays.map((holiday) => (
        <div
          key={holiday.id}
          onClick={(e) => {
            e.stopPropagation();
            openHolidayCard(holiday);
          }}
          className={cn(
            "flex w-[90%] cursor-pointer items-center gap-1.5 rounded-sm border p-1 text-sm hover:opacity-80",
            getCategoryColor(holiday.category),
          )}
        >
          <span className="line-clamp-1 font-medium">{holiday.name}</span>
        </div>
      ))}
    </>
  );
}
