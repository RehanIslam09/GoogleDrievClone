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
    <div className="calendar-grid-container">
      {/* Weekday Header Row */}
      <div className="calendar-grid-weekday-header">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="calendar-grid-weekday-cell"
          >
            <span className="calendar-grid-weekday-text">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* 6-Week Calendar Grid */}
      <div className="calendar-grid-weeks">
        {sixWeeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const cellKey = `${weekIndex}-${dayIndex}`;

            // Empty cell
            if (!day) {
              return (
                <div
                  key={cellKey}
                  className="calendar-grid-cell-empty"
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
                className="group calendar-grid-cell"
              >
                {/* Date Number */}
                <div className="calendar-grid-date-container">
                  {isToday ? (
                    <div className="calendar-grid-date-today">
                      <span className="calendar-grid-date-today-text">
                        {day.date()}
                      </span>
                    </div>
                  ) : (
                    <span
                      className={cn(
                        isPrevNextMonth ? "calendar-grid-date-text-dim" : "calendar-grid-date-text"
                      )}
                    >
                      {day.date()}
                    </span>
                  )}
                </div>

                {/* Events Container */}
                <div className="calendar-grid-events-container">
                  {/* Holidays */}
                  {dayHolidays.slice(0, MAX_VISIBLE_ITEMS - (dayEvents.length + dayTasks.length > 0 ? dayEvents.length + dayTasks.length : 0)).map((holiday) => (
                    <button
                      key={holiday.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openHolidayCard(holiday);
                      }}
                      className="calendar-grid-holiday-button"
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
                      className="calendar-grid-event-button"
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
                        "calendar-grid-task-button",
                        task.completed && "calendar-grid-task-button-completed"
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
                      className="calendar-grid-overflow-button"
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
