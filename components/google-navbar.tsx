"use client";

import React from "react";
import {
  Menu,
  Search,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Grid3x3,
  Check,
} from "lucide-react";
import { useDateStore, useViewStore, useToggleSideBarStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function GoogleNavbar() {
  const { userSelectedDate, setDate, selectedMonthIndex, setMonth } = useDateStore();
  const { selectedView, setView } = useViewStore();
  const { isSideBarOpen, setSideBarOpen } = useToggleSideBarStore();

  const handleToday = () => {
    setDate(dayjs());
    setMonth(dayjs().month());
  };

  const handlePrev = () => {
    setMonth(selectedMonthIndex - 1);
  };

  const handleNext = () => {
    setMonth(selectedMonthIndex + 1);
  };

  const currentMonthYear = dayjs().month(selectedMonthIndex).format("MMMM YYYY");

  return (
    <nav className="flex h-16 items-center justify-between border-b border-[#DADCE0] bg-white px-4 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu */}
        <button
          onClick={setSideBarOpen}
          className="rounded-full p-3 text-[#5F6368] hover:bg-[#F1F3F4]"
          aria-label="Main menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo and Text */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center">
            <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#1A73E8"/>
              <path d="M28 14h-2v-2c0-.55-.45-1-1-1s-1 .45-1 1v2h-8v-2c0-.55-.45-1-1-1s-1 .45-1 1v2h-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V16c0-1.1-.9-2-2-2zm0 14h-16V19h16v9z" fill="white"/>
            </svg>
          </div>
          <span className="text-[22px] font-normal text-[#3C4043]">Calendar</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-3">
        {/* Today Button */}
        <button
          onClick={handleToday}
          className="rounded border border-[#DADCE0] bg-white px-6 py-2 text-sm font-medium text-[#3C4043] hover:bg-[#F8F9FA] hover:shadow-sm"
        >
          Today
        </button>

        {/* Navigation Arrows */}
        <div className="flex items-center">
          <button
            onClick={handlePrev}
            className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Current Month/Year */}
        <h2 className="min-w-[150px] text-[22px] font-normal text-[#3C4043]">
          {currentMonthYear}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search Icon */}
        <button
          className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Help Icon */}
        <button
          className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Settings Icon */}
        <button
          className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>

        {/* View Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedView}
            onChange={(e) => setView(e.target.value)}
            className={cn(
              "cursor-pointer appearance-none rounded border bg-white px-4 py-2 pr-8 text-sm font-medium text-[#3C4043] hover:bg-[#F8F9FA] focus:outline-none",
              selectedView === "month" ? "border-[#1A73E8]" : "border-[#DADCE0]"
            )}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <ChevronRight className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-[#5F6368]" />
        </div>

        {/* Check Icon */}
        <button
          className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
          aria-label="Tasks"
        >
          <Check className="h-5 w-5" />
        </button>

        {/* Grid Icon */}
        <button
          className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"
          aria-label="Apps"
        >
          <Grid3x3 className="h-5 w-5" />
        </button>

        {/* Profile Avatar */}
        <button
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A73E8] text-sm font-medium text-white hover:opacity-90"
          aria-label="Account"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
