"use client";

import React from "react";
import { useDateStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function YearView() {
  const { userSelectedDate, setDate, setMonth, selectedMonthIndex } = useDateStore();
  const currentYear = dayjs().month(selectedMonthIndex).year();

  const handleDateClick = (date: dayjs.Dayjs) => {
    setDate(date);
    setMonth(date.month());
  };

  const generateMonthDays = (monthIndex: number) => {
    const firstDayOfMonth = dayjs().year(currentYear).month(monthIndex).startOf("month");
    const lastDayOfMonth = dayjs().year(currentYear).month(monthIndex).endOf("month");

    const prevMonthDays = firstDayOfMonth.day();
    const daysInMonth = lastDayOfMonth.date();

    const days: (dayjs.Dayjs | null)[] = [];

    // Add previous month's trailing days
    for (let i = 0; i < prevMonthDays; i++) {
      days.push(firstDayOfMonth.subtract(prevMonthDays - i, "day"));
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(dayjs().year(currentYear).month(monthIndex).date(i));
    }

    // Add next month's leading days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push(lastDayOfMonth.add(i, "day"));
    }

    return days;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="year-view-container">
      {months.map((monthName, monthIndex) => {
        const days = generateMonthDays(monthIndex);

        return (
          <div key={monthIndex} className="year-view-month">
            {/* Month Name */}
            <h3 className="year-view-month-name">{monthName}</h3>

            {/* Weekday Headers */}
            <div className="year-view-weekdays">
              {weekDays.map((day, index) => (
                <div key={index} className="year-view-weekday">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="year-view-days">
              {days.map((day, index) => {
                if (!day) return <div key={index} className="year-view-day-empty" />;

                const isToday = day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY");
                const isSelected = day.format("DD-MM-YYYY") === userSelectedDate.format("DD-MM-YYYY");
                const isCurrentMonth = day.month() === monthIndex;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={cn(
                      "year-view-day",
                      !isCurrentMonth && "year-view-day-other-month",
                      isToday && "year-view-day-today",
                      isSelected && !isToday && "year-view-day-selected"
                    )}
                  >
                    {day.date()}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
