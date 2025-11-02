"use client";

import React from "react";
import { useDateStore, useEventStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function FourDaysView() {
  const { setDate } = useDateStore();
  const { openPopover } = useEventStore();

  // Generate the next 4 days starting from today
  const days = Array.from({ length: 4 }, (_, i) => dayjs().add(i, "day"));

  // Time slots from 1 AM to 11 PM
  const timeSlots = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ];

  const isToday = (date: dayjs.Dayjs) => {
    return date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  };

  const handleCellClick = (day: dayjs.Dayjs) => {
    setDate(day);
    openPopover("event");
  };

  return (
    <div className="four-days-view-container">
      {/* Header with dates */}
      <div className="four-days-view-header">
        {/* GMT offset and time column header */}
        <div className="four-days-view-time-header">
          <span className="four-days-view-gmt-text">GMT+05:30</span>
        </div>

        {/* Day headers */}
        {days.map((day, index) => {
          const today = isToday(day);
          return (
            <div key={index} className="four-days-view-day-header">
              <div className="four-days-view-day-info">
                <span className="four-days-view-weekday">{day.format("ddd").toUpperCase()}</span>
                <div className={cn(
                  "four-days-view-date-number",
                  today && "four-days-view-date-number-today"
                )}>
                  {day.format("D")}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrollable time grid */}
      <div className="four-days-view-scroll-container">
        <div className="four-days-view-grid">
          {timeSlots.map((time, timeIndex) => (
            <div key={timeIndex} className="four-days-view-row">
              {/* Time label */}
              <div className="four-days-view-time-cell">
                <span className="four-days-view-time-label">{time}</span>
              </div>

              {/* Day cells */}
              {days.map((day, dayIndex) => (
                <div
                  key={`${timeIndex}-${dayIndex}`}
                  className="four-days-view-day-cell"
                  onClick={() => handleCellClick(day)}
                >
                  {/* Empty cell for now - events will be positioned here */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
