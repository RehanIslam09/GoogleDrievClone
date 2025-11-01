"use client";

import React from "react";
import { useDateStore, useEventStore, useTaskStore, useHolidayStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function GoogleCalendarGrid() {
  const { twoDMonthArray, setDate, selectedMonthIndex } = useDateStore();
  const { events, openEventSummary } = useEventStore();
  const { tasks, openTaskSummary } = useTaskStore();
  const { holidays, openHolidayCard } = useHolidayStore();
  const { openPopover } = useEventStore();

  const handleCellClick = (day: dayjs.Dayjs | null) => {
    if (!day) return;
    setDate(day);
    openPopover();
  };

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = dayjs();

  // Ensure we always have 6 weeks (42 days) for consistent grid
  const allWeeks = twoDMonthArray.length >= 6 ? twoDMonthArray : [...twoDMonthArray, ...Array(6 - twoDMonthArray.length).fill(Array(7).fill(null))];
  const sixWeeks = allWeeks.slice(0, 6);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Weekday Header Row */}
      <div className="grid grid-cols-7 border-b border-[#e0e0e0] bg-white">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center border-r border-[#e0e0e0] py-3 last:border-r-0"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.8px] text-[#70757a]">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* 6-Week Calendar Grid */}
      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {sixWeeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const cellKey = `${weekIndex}-${dayIndex}`;

            // Empty cell
            if (!day) {
              return (
                <div
                  key={cellKey}
                  className="flex flex-col border-b border-r border-[#e0e0e0] bg-white last:border-r-0"
                />
              );
            }

            const isToday = day.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
            const isPrevNextMonth = day.month() !== selectedMonthIndex;

            // Get events for this day
            const dayEvents = events.filter(
              (event) => event.date.format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
            );
            const dayTasks = tasks.filter(
              (task) => task.date.format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
            );
            const dayHolidays = holidays.filter(
              (holiday) => holiday.date.format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
            );

            const allItems = [...dayHolidays, ...dayEvents, ...dayTasks];
            const MAX_VISIBLE_ITEMS = 3;
            const visibleItems = allItems.slice(0, MAX_VISIBLE_ITEMS);
            const remainingCount = allItems.length - MAX_VISIBLE_ITEMS;

            return (
              <div
                key={cellKey}
                onClick={() => handleCellClick(day)}
                className="group flex flex-col border-b border-r border-[#e0e0e0] bg-white p-2 transition-colors hover:bg-gray-100 last:border-r-0"
              >
                {/* Date Number */}
                <div className="mb-1 flex items-start justify-start">
                  {isToday ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a73e8]">
                      <span className="text-sm font-medium text-white">
                        {day.date()}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isPrevNextMonth ? "text-[#70757a]" : "text-[#3c4043]"
                      )}
                    >
                      {day.date()}
                    </span>
                  )}
                </div>

                {/* Events Container */}
                <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                  {/* Holidays */}
                  {dayHolidays.slice(0, MAX_VISIBLE_ITEMS - (dayEvents.length + dayTasks.length > 0 ? dayEvents.length + dayTasks.length : 0)).map((holiday) => (
                    <button
                      key={holiday.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openHolidayCard(holiday);
                      }}
                      className="w-full truncate rounded-md bg-green-700 px-2 py-0.5 text-left text-xs text-white hover:bg-green-800"
                    >
                      {holiday.name}
                    </button>
                  ))}

                  {/* Events */}
                  {dayEvents.slice(0, MAX_VISIBLE_ITEMS - dayHolidays.length - dayTasks.length).map((event) => (
                    <button
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEventSummary(event);
                      }}
                      className="w-full truncate rounded-md bg-[#1a73e8] px-2 py-0.5 text-left text-xs text-white hover:bg-[#1557b0]"
                    >
                      {event.title}
                    </button>
                  ))}

                  {/* Tasks */}
                  {dayTasks.slice(0, MAX_VISIBLE_ITEMS - dayHolidays.length - dayEvents.length).map((task) => (
                    <button
                      key={task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openTaskSummary(task);
                      }}
                      className={cn(
                        "w-full truncate rounded-md bg-[#1a73e8] px-2 py-0.5 text-left text-xs text-white hover:bg-[#1557b0]",
                        task.completed && "opacity-60 line-through"
                      )}
                    >
                      {task.title}
                    </button>
                  ))}

                  {/* Overflow Indicator */}
                  {remainingCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCellClick(day);
                      }}
                      className="text-left text-xs font-medium text-[#5f6368] hover:text-[#3c4043]"
                    >
                      +{remainingCount} more
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
