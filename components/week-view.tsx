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
    <div className="week-view-container">
      {/* Week Header */}
      <div className="week-view-header">
        {/* Timezone cell */}
        <div className="week-view-timezone-cell">
          <span className="week-view-timezone-text">GMT+5:30</span>
        </div>

        {/* Day headers */}
        {weekDays.map(({ currentDate, today }, index) => (
          <div
            key={index}
            className="week-view-day-header"
          >
            <div className={cn(today ? "week-view-day-abbr-today" : "week-view-day-abbr")}>
              {currentDate.format("ddd")}
            </div>
            <div
              className={cn(
                today
                  ? "week-view-day-number-today"
                  : "week-view-day-number"
              )}
            >
              {currentDate.format("D")}
            </div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <ScrollArea className="flex-1">
        <div className="week-view-time-grid">
          {/* Time Column */}
          <div className="week-view-time-column">
            {getHours.map((hour, index) => (
              <div key={index} className="week-view-time-slot">
                {hour.hour() !== 0 && (
                  <div className="week-view-time-label">
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
              <div key={dayIndex} className="week-view-day-column">
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
                      className="week-view-hour-cell"
                      onClick={() => {
                        setDate(cellDate);
                        openPopover();
                      }}
                    >
                      {/* Events, Tasks, and Holidays */}
                      <div className="week-view-events-container">
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
                    className="week-view-time-indicator"
                    style={{
                      top: `${((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100}%`,
                    }}
                  >
                    <div className="week-view-time-indicator-dot" />
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
