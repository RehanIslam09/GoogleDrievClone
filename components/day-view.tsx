"use client";

import { useDateStore, useEventStore, useTaskStore, useHolidayStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { getHours } from "@/lib/getTime";
import EventChip from "./event-chip";

export default function DayView() {
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

  const isToday = userSelectedDate.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");

  return (
    <div className="day-view-container">
      {/* Day Header */}
      <div className="day-view-header">
        {/* Timezone cell */}
        <div className="day-view-timezone-cell">
          <span className="day-view-timezone-text">GMT+5:30</span>
        </div>

        {/* Day header */}
        <div className="day-view-day-header">
          <div className={cn(isToday ? "day-view-day-name-today" : "day-view-day-name")}>
            {userSelectedDate.format("dddd")}
          </div>
          <div
            className={cn(
              isToday
                ? "day-view-day-number-today"
                : "day-view-day-number"
            )}
          >
            {userSelectedDate.format("D")}
          </div>
        </div>
      </div>

      {/* Time Grid */}
      <ScrollArea className="flex-1">
        <div className="day-view-time-grid">
          {/* Time Column */}
          <div className="day-view-time-column">
            {getHours.map((hour, index) => (
              <div key={index} className="day-view-time-slot">
                {hour.hour() !== 0 && (
                  <div className="day-view-time-label">
                    {hour.format("h A")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Day Column */}
          <div className="day-view-day-column">
            {getHours.map((hour, hourIndex) => {
              const cellDate = userSelectedDate.hour(hour.hour()).minute(0);

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
                  className="day-view-hour-cell"
                  onClick={() => {
                    setDate(cellDate);
                    openPopover();
                  }}
                >
                  {/* Events, Tasks, and Holidays */}
                  <div className="day-view-events-container">
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
                className="day-view-time-indicator"
                style={{
                  top: `${((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100}%`,
                }}
              >
                <div className="day-view-time-indicator-dot" />
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
