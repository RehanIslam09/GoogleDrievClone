"use client";

import { getHours, getWeekDays } from "@/lib/getTime";
import { useDateStore, useEventStore, useTaskStore, useHolidayStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import EventChip from "./event-chip";

export default function WeekView() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { openPopover, events, openEventSummary } = useEventStore();
  const { tasks, openTaskSummary } = useTaskStore();
  const { holidays, openHolidayCard } = useHolidayStore();
  const { userSelectedDate, setDate } = useDateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const weekDays = getWeekDays(userSelectedDate);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Week Header */}
      <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-google-gray-200">
        {/* Timezone cell */}
        <div className="flex items-center justify-center border-r border-google-gray-200 py-4">
          <span className="text-[10px] text-google-gray-500">GMT+5:30</span>
        </div>

        {/* Day headers */}
        {weekDays.map(({ currentDate, today }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 border-r border-google-gray-200 py-2 last:border-r-0"
          >
            <div className={cn("text-[11px] font-medium uppercase", today ? "text-google-blue-500" : "text-google-gray-600")}>
              {currentDate.format("ddd")}
            </div>
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full text-2xl font-normal transition-colors",
                today
                  ? "bg-google-blue-500 text-white"
                  : "text-google-gray-700"
              )}
            >
              {currentDate.format("D")}
            </div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-[64px_repeat(7,1fr)]">
          {/* Time Column */}
          <div className="border-r border-google-gray-200">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-12 border-b border-google-gray-100">
                {hour.hour() !== 0 && (
                  <div className="absolute -top-2 right-2 text-[10px] text-google-gray-500">
                    {hour.format("h A")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {weekDays.map(({ currentDate, today }, dayIndex) => {
            const dayDate = currentDate;
            const isToday = today;

            return (
              <div key={dayIndex} className="relative border-r border-google-gray-200 last:border-r-0">
                {getHours.map((hour, hourIndex) => {
                  const cellDate = dayDate.hour(hour.hour()).minute(0);

                  // Filter events/tasks/holidays for this hour
                  const cellEvents = events.filter(
                    (event) => event.date.format("YYYY-MM-DD HH") === cellDate.format("YYYY-MM-DD HH")
                  );
                  const cellTasks = tasks.filter(
                    (task) => task.date.format("YYYY-MM-DD HH") === cellDate.format("YYYY-MM-DD HH")
                  );
                  const cellHolidays = holidays.filter(
                    (holiday) => holiday.date.format("YYYY-MM-DD") === cellDate.format("YYYY-MM-DD") && hourIndex === 0
                  );

                  return (
                    <div
                      key={hourIndex}
                      className="relative h-12 cursor-pointer border-b border-google-gray-100 transition-colors hover:bg-google-gray-50"
                      onClick={() => {
                        setDate(cellDate);
                        openPopover();
                      }}
                    >
                      {/* Events, Tasks, and Holidays */}
                      <div className="space-y-0.5 p-1">
                        {/* Holidays - show only in first hour */}
                        {cellHolidays.map((holiday) => (
                          <EventChip
                            key={holiday.id}
                            title={holiday.name}
                            color="#188038"
                            type="holiday"
                            onClick={(e) => {
                              e.stopPropagation();
                              openHolidayCard(holiday);
                            }}
                          />
                        ))}

                        {/* Events */}
                        {cellEvents.map((event) => (
                          <EventChip
                            key={event.id}
                            title={event.title}
                            color="#1a73e8"
                            type="event"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEventSummary(event);
                            }}
                          />
                        ))}

                        {/* Tasks */}
                        {cellTasks.map((task) => (
                          <EventChip
                            key={task.id}
                            title={task.title}
                            color="#d93025"
                            type="task"
                            completed={task.completed}
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskSummary(task);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Current time indicator */}
                {isToday && (
                  <div
                    className="absolute z-10 h-0.5 w-full bg-red-500"
                    style={{
                      top: `${((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100}%`,
                    }}
                  >
                    <div className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-red-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
