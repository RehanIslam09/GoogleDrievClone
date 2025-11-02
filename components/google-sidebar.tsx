"use client";

import React, { useState } from "react";
import { Plus, Search, ChevronDown, ChevronRight, ChevronLeft, Users } from "lucide-react";
import { useDateStore, useEventStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { getMonth } from "@/lib/getTime";
import CreateButton from "./create-button";

export default function GoogleSidebar() {
  const { userSelectedDate, setDate, setMonth } = useDateStore();
  const { openPopover } = useEventStore();
  const [bookingPagesOpen, setBookingPagesOpen] = useState(false);
  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [otherCalendarsOpen, setOtherCalendarsOpen] = useState(true);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());

  const miniMonth = getMonth(currentMonthIndex);

  const handleDateClick = (day: dayjs.Dayjs) => {
    setDate(day);
    setMonth(day.month());
  };

  const handleEventClick = () => {
    setDate(dayjs());
    openPopover("event");
  };

  const handleTaskClick = () => {
    setDate(dayjs());
    openPopover("task");
  };

  const handleOutOfOfficeClick = () => {
    setDate(dayjs());
    openPopover("outofoffice");
  };

  const handleFocusTimeClick = () => {
    setDate(dayjs());
    openPopover("focustime");
  };

  const handleWorkingLocationClick = () => {
    setDate(dayjs());
    openPopover("workinglocation");
  };

  const handleAppointmentClick = () => {
    setDate(dayjs());
    openPopover("appointment");
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  return (
    <aside className="google-sidebar">
      {/* Create Button */}
      <div className="sidebar-create-container">
        <CreateButton
          onEventClick={handleEventClick}
          onTaskClick={handleTaskClick}
          onOutOfOfficeClick={handleOutOfOfficeClick}
          onFocusTimeClick={handleFocusTimeClick}
          onWorkingLocationClick={handleWorkingLocationClick}
          onAppointmentClick={handleAppointmentClick}
        />
      </div>

      {/* Mini Calendar */}
      <div className="sidebar-mini-calendar-container">
        <div className="sidebar-mini-calendar">
          {/* Month/Year Header with Arrows */}
          <div className="sidebar-mini-calendar-header">
            <button
              className="sidebar-mini-calendar-nav-button"
              onClick={handlePrevMonth}
            >
              <ChevronLeft className="sidebar-mini-calendar-nav-icon" />
            </button>
            <span className="sidebar-mini-calendar-month-text">
              {dayjs().month(currentMonthIndex).format("MMMM YYYY")}
            </span>
            <button
              className="sidebar-mini-calendar-nav-button"
              onClick={handleNextMonth}
            >
              <ChevronRight className="sidebar-mini-calendar-nav-icon" />
            </button>
          </div>

          {/* Day Abbreviations */}
          <div className="sidebar-mini-calendar-days-header">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="sidebar-mini-calendar-day-abbr">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="sidebar-mini-calendar-grid">
            {miniMonth.flat().map((day, index) => {
              if (!day) return <div key={index} className="h-9" />;

              const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
              const isSelected = day.format("DD-MM-YY") === userSelectedDate.format("DD-MM-YY");
              const isPrevNextMonth = day.month() !== currentMonthIndex;

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className="sidebar-mini-calendar-cell"
                >
                  {isToday ? (
                    <div className="sidebar-mini-calendar-today">
                      <span className="sidebar-mini-calendar-today-text">{day.date()}</span>
                    </div>
                  ) : (
                    <div className={cn(
                      "sidebar-mini-calendar-date",
                      isSelected && !isToday && "sidebar-mini-calendar-selected"
                    )}>
                      <span className={cn(
                        isPrevNextMonth ? "sidebar-mini-calendar-other-month" : "sidebar-mini-calendar-current-month"
                      )}>
                        {day.date()}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search for People */}
      <div className="sidebar-search-container">
        <h3 className="mb-2 px-1 text-[14px] font-medium text-[#3c4043]">Meet with...</h3>
        <div className="sidebar-search-input-wrapper">
          <Users className="sidebar-search-icon" />
          <input
            type="text"
            placeholder="Search for people"
            className="sidebar-search-input"
          />
        </div>
      </div>

      {/* Scrollable Calendar Lists */}
      <div className="sidebar-calendars-container">
        {/* Booking Pages */}
        <div className="sidebar-calendar-section">
          <button
            onClick={() => setBookingPagesOpen(!bookingPagesOpen)}
            className="sidebar-calendar-section-toggle"
          >
            <span className="sidebar-section-title">Booking pages</span>
            <Plus className="sidebar-section-plus-icon" />
          </button>
        </div>

        {/* Time Insights */}
        <div className="sidebar-calendar-section">
          <button className="sidebar-calendar-section-toggle">
            <span className="sidebar-section-title">Time Insights</span>
            <ChevronRight className="sidebar-calendar-section-icon" />
          </button>
        </div>
        {/* My Calendars */}
        <div className="sidebar-calendar-section">
          <button
            onClick={() => setMyCalendarsOpen(!myCalendarsOpen)}
            className="sidebar-calendar-section-toggle"
          >
            {myCalendarsOpen ? (
              <ChevronDown className="sidebar-calendar-section-icon" />
            ) : (
              <ChevronRight className="sidebar-calendar-section-icon" />
            )}
            <span className="sidebar-section-title">My calendars</span>
          </button>

          {myCalendarsOpen && (
            <div className="sidebar-calendar-list">
              <CalendarItem name="Rehan Islam" color="#1A73E8" checked />
              <CalendarItem name="Birthdays" color="#0B8043" checked />
              <CalendarItem name="Tasks" color="#1A73E8" checked />
            </div>
          )}
        </div>

        {/* Other Calendars */}
        <div className="sidebar-calendar-section">
          <button
            onClick={() => setOtherCalendarsOpen(!otherCalendarsOpen)}
            className="sidebar-calendar-section-toggle"
          >
            {otherCalendarsOpen ? (
              <ChevronDown className="sidebar-calendar-section-icon" />
            ) : (
              <ChevronRight className="sidebar-calendar-section-icon" />
            )}
            <span className="sidebar-section-title">Other calendars</span>
            <Plus className="sidebar-section-plus-icon" />
          </button>

          {otherCalendarsOpen && (
            <div className="sidebar-calendar-list">
              <CalendarItem name="Holidays in India" color="#0B8043" checked />
            </div>
          )}
        </div>
      </div>

      {/* Footer - Terms Privacy */}
      <div className="sidebar-footer">
        <span className="sidebar-footer-text">Terms – Privacy</span>
      </div>
    </aside>
  );
}

function CalendarItem({
  name,
  color,
  checked,
}: {
  name: string;
  color: string;
  checked?: boolean;
}) {
  return (
    <div className="sidebar-calendar-item">
      <input
        type="checkbox"
        checked={checked}
        className="sidebar-calendar-checkbox"
        readOnly
      />
      <div className="sidebar-calendar-color-dot" style={{ backgroundColor: color }} />
      <span className="sidebar-calendar-name">{name}</span>
    </div>
  );
}
