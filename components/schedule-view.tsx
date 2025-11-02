"use client";

import React from "react";
import { useDateStore, useEventStore, useTaskStore, useHolidayStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function ScheduleView() {
  const { selectedMonthIndex } = useDateStore();
  const { events, openEventSummary } = useEventStore();
  const { tasks, openTaskSummary } = useTaskStore();
  const { holidays, openHolidayCard } = useHolidayStore();

  // Get date range for next 4 months from selected month
  const startDate = dayjs().month(selectedMonthIndex).startOf("month");
  const endDate = startDate.add(4, "month").endOf("month");

  // Group all items by date
  const groupedItems: { [key: string]: Array<{ type: "event" | "task" | "holiday"; data: any }> } = {};

  // Add events
  events.forEach((event) => {
    const dateKey = event.date.format("YYYY-MM-DD");
    if (event.date.isAfter(startDate.subtract(1, "day")) && event.date.isBefore(endDate.add(1, "day"))) {
      if (!groupedItems[dateKey]) {
        groupedItems[dateKey] = [];
      }
      groupedItems[dateKey].push({ type: "event", data: event });
    }
  });

  // Add tasks
  tasks.forEach((task) => {
    const dateKey = task.date.format("YYYY-MM-DD");
    if (task.date.isAfter(startDate.subtract(1, "day")) && task.date.isBefore(endDate.add(1, "day"))) {
      if (!groupedItems[dateKey]) {
        groupedItems[dateKey] = [];
      }
      groupedItems[dateKey].push({ type: "task", data: task });
    }
  });

  // Add holidays
  holidays.forEach((holiday) => {
    const dateKey = holiday.date.format("YYYY-MM-DD");
    if (holiday.date.isAfter(startDate.subtract(1, "day")) && holiday.date.isBefore(endDate.add(1, "day"))) {
      if (!groupedItems[dateKey]) {
        groupedItems[dateKey] = [];
      }
      groupedItems[dateKey].push({ type: "holiday", data: holiday });
    }
  });

  // Sort dates
  const sortedDates = Object.keys(groupedItems).sort();

  const getMonthLabel = (date: string) => {
    return dayjs(date).format("MMM");
  };

  const getDayLabel = (date: string) => {
    return dayjs(date).format("D");
  };

  const getWeekdayLabel = (date: string) => {
    return dayjs(date).format("ddd").toUpperCase();
  };

  let currentMonth = "";

  return (
    <div className="schedule-view-container">
      {sortedDates.length === 0 ? (
        <div className="schedule-view-empty">
          <p className="schedule-view-empty-text">No events or tasks scheduled</p>
        </div>
      ) : (
        sortedDates.map((dateKey) => {
          const monthLabel = getMonthLabel(dateKey);
          const showMonthHeader = monthLabel !== currentMonth;
          if (showMonthHeader) {
            currentMonth = monthLabel;
          }

          const items = groupedItems[dateKey];
          const isToday = dayjs(dateKey).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");

          return (
            <div key={dateKey}>
              {/* Month Header */}
              {showMonthHeader && (
                <div className="schedule-view-month-header">
                  <h2 className="schedule-view-month-title">{dayjs(dateKey).format("MMMM YYYY")}</h2>
                </div>
              )}

              {/* Date Row */}
              <div className="schedule-view-date-row">
                {/* Date Column */}
                <div className="schedule-view-date-column">
                  <div className={cn(
                    "schedule-view-date-box",
                    isToday && "schedule-view-date-box-today"
                  )}>
                    <div className="schedule-view-day-number">
                      {getDayLabel(dateKey)}
                    </div>
                    <div className="schedule-view-weekday">
                      {getWeekdayLabel(dateKey)}
                    </div>
                  </div>
                </div>

                {/* Items Column */}
                <div className="schedule-view-items-column">
                  {items.map((item, index) => {
                    if (item.type === "event") {
                      return (
                        <button
                          key={`event-${item.data.id}-${index}`}
                          onClick={() => openEventSummary(item.data)}
                          className="schedule-view-event-item"
                        >
                          <div className="schedule-view-event-indicator"></div>
                          <div className="schedule-view-event-content">
                            <div className="schedule-view-event-time">All day</div>
                            <div className="schedule-view-event-title">{item.data.title}</div>
                          </div>
                        </button>
                      );
                    } else if (item.type === "task") {
                      return (
                        <button
                          key={`task-${item.data.id}-${index}`}
                          onClick={() => openTaskSummary(item.data)}
                          className="schedule-view-task-item"
                        >
                          <div className="schedule-view-task-indicator"></div>
                          <div className="schedule-view-task-content">
                            <div className="schedule-view-task-time">All day</div>
                            <div className="schedule-view-task-title">{item.data.title}</div>
                          </div>
                        </button>
                      );
                    } else if (item.type === "holiday") {
                      return (
                        <button
                          key={`holiday-${item.data.id}-${index}`}
                          onClick={() => openHolidayCard(item.data)}
                          className="schedule-view-holiday-item"
                        >
                          <div className="schedule-view-holiday-indicator"></div>
                          <div className="schedule-view-holiday-content">
                            <div className="schedule-view-holiday-time">All day</div>
                            <div className="schedule-view-holiday-title">{item.data.name}</div>
                          </div>
                          {item.data.category && (
                            <div className="schedule-view-holiday-duplicate">
                              <div className="schedule-view-holiday-indicator"></div>
                              <div className="schedule-view-holiday-content">
                                <div className="schedule-view-holiday-time">All day</div>
                                <div className="schedule-view-holiday-title">{item.data.name}</div>
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
