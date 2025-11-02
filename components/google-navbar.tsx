"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Menu,
  Search,
  Settings as SettingsCog,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Grid3x3,
  Check,
  Calendar,
  Trash2,
  Palette,
  Printer,
  Download,
} from "lucide-react";
import { useDateStore, useViewStore, useToggleSideBarStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function GoogleNavbar() {
  const { userSelectedDate, setDate, selectedMonthIndex, setMonth } = useDateStore();
  const { selectedView, setView } = useViewStore();
  const { isSideBarOpen, setSideBarOpen } = useToggleSideBarStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchActive &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
        setSearchQuery("");
      }
    };

    if (isSearchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  // Close help dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setIsHelpOpen(false);
      }
    };

    if (isHelpOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHelpOpen]);

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

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      // Focus input when search becomes active
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    } else {
      // Clear search when closing
      setSearchQuery("");
    }
  };

  const currentMonthYear = dayjs().month(selectedMonthIndex).format("MMMM YYYY");

  // Settings dropdown menu items
  return (
    <nav className="google-navbar">
      {/* Left Section */}
      <div className="navbar-left-section">
        {isSearchActive ? (
          <>
            {/* Back Arrow when search is active */}
            <button
              onClick={handleSearchToggle}
              className="navbar-hamburger-button"
              aria-label="Close search"
            >
              <ChevronLeft className="navbar-hamburger-icon" />
            </button>

            {/* Search Title */}
            <span className="navbar-title-text">Search</span>
          </>
        ) : (
          <>
            {/* Hamburger Menu */}
            <button
              onClick={setSideBarOpen}
              className="navbar-hamburger-button"
              aria-label="Main menu"
            >
              <Menu className="navbar-hamburger-icon" />
            </button>

            {/* Logo and Text */}
            <div className="navbar-logo-container">
              <div className="navbar-logo-wrapper">
                <Image
                  src="/img/google-calendar.png"
                  width={40}
                  height={40}
                  alt="Google Calendar"
                  className="navbar-logo-svg"
                />
              </div>
              <span className="navbar-title-text">Calendar</span>
            </div>
          </>
        )}
      </div>

      {/* Center Section */}
      {isSearchActive ? (
        <div ref={searchContainerRef} className="navbar-search-container">
          {/* Search Input */}
          <div className="navbar-search-input-wrapper">
            <Search className="navbar-search-input-icon" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="navbar-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="navbar-search-clear-button"
              >
                <svg className="navbar-search-clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar-center-section">
        {/* Today Button */}
        <button
          onClick={handleToday}
          className="navbar-today-button"
        >
          Today
        </button>

        {/* Navigation Arrows */}
        <div className="navbar-nav-arrows">
          <button
            onClick={handlePrev}
            className="navbar-nav-button"
            aria-label="Previous month"
          >
            <ChevronLeft className="navbar-nav-icon" />
          </button>
          <button
            onClick={handleNext}
            className="navbar-nav-button"
            aria-label="Next month"
          >
            <ChevronRight className="navbar-nav-icon" />
          </button>
        </div>

        {/* Current Month/Year */}
        <h2 className="navbar-month-year">
          {currentMonthYear}
        </h2>
        </div>
      )}

      {/* Right Section */}
      <div className="navbar-right-section">
        {!isSearchActive && (
          <>
            {/* Search Icon */}
            <button
              onClick={handleSearchToggle}
              className="navbar-icon-button"
              aria-label="Search"
            >
              <Search className="navbar-icon" />
            </button>

            {/* Help Icon with Dropdown */}
            <div className="navbar-help-dropdown-wrapper" ref={helpRef}>
              <button
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="navbar-icon-button"
                aria-label="Help"
              >
                <HelpCircle className="navbar-icon" />
              </button>

              {/* Help Dropdown Menu */}
              {isHelpOpen && (
                <div className="navbar-help-dropdown">
                  <button
                    onClick={() => setIsHelpOpen(false)}
                    className="navbar-help-dropdown-item"
                  >
                    <span>Help</span>
                  </button>
                  <button
                    onClick={() => setIsHelpOpen(false)}
                    className="navbar-help-dropdown-item"
                  >
                    <span>Training</span>
                  </button>
                  <button
                    onClick={() => setIsHelpOpen(false)}
                    className="navbar-help-dropdown-item"
                  >
                    <span>Send feedback to Google</span>
                  </button>
                </div>
              )}
            </div>

            {/* Settings Icon with Dropdown */}
            <div className="navbar-settings-dropdown-wrapper" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="navbar-icon-button"
                aria-label="Settings"
              >
                <SettingsCog className="navbar-icon" />
              </button>

              {/* Settings Dropdown Menu */}
              {isSettingsOpen && (
                <div className="navbar-settings-dropdown">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="navbar-settings-dropdown-item"
                  >
                    <SettingsCog className="navbar-settings-dropdown-icon" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="navbar-settings-dropdown-item"
                  >
                    <Trash2 className="navbar-settings-dropdown-icon" />
                    <span>Trash</span>
                  </button>

                  <div className="navbar-settings-dropdown-separator"></div>

                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="navbar-settings-dropdown-item"
                  >
                    <Palette className="navbar-settings-dropdown-icon" />
                    <span>Appearance</span>
                  </button>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="navbar-settings-dropdown-item"
                  >
                    <Printer className="navbar-settings-dropdown-icon" />
                    <span>Print</span>
                  </button>

                  <div className="navbar-settings-dropdown-separator"></div>

                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="navbar-settings-dropdown-item"
                  >
                    <Download className="navbar-settings-dropdown-icon" />
                    <span>Get add-ons</span>
                  </button>
                </div>
              )}
            </div>

            {/* View Selector Dropdown - Pill-shaped Button Group */}
            <div className="navbar-view-selector-wrapper" ref={dropdownRef}>
          {/* Calendar Icon Button (Left) */}
          <button className="navbar-view-calendar-button" aria-label="Calendar">
            <Calendar className="navbar-view-calendar-icon" />
          </button>

          {/* Checkmark Button (Middle) */}
          <button className="navbar-view-check-button" aria-label="Tasks">
            <Check className="navbar-view-check-icon" />
          </button>

          {/* Dropdown Selector (Right) */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="navbar-view-selector"
          >
            {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
          </button>
          <ChevronRight className="navbar-view-selector-chevron" />

          {/* Custom Dropdown Menu */}
          {isDropdownOpen && (
            <div className="navbar-view-dropdown-menu">
              {/* View Options */}
              <button
                onClick={() => {
                  setView("day");
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Day</span>
                <span className="navbar-dropdown-item-shortcut">D</span>
              </button>
              <button
                onClick={() => {
                  setView("week");
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Week</span>
                <span className="navbar-dropdown-item-shortcut">W</span>
              </button>
              <button
                onClick={() => {
                  setView("month");
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Month</span>
                <span className="navbar-dropdown-item-shortcut">M</span>
              </button>
              <button
                onClick={() => {
                  // Year view not implemented yet
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Year</span>
                <span className="navbar-dropdown-item-shortcut">Y</span>
              </button>
              <button
                onClick={() => {
                  // Schedule view not implemented yet
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Schedule</span>
                <span className="navbar-dropdown-item-shortcut">A</span>
              </button>
              <button
                onClick={() => {
                  // 4 days view not implemented yet
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>4 days</span>
                <span className="navbar-dropdown-item-shortcut">X</span>
              </button>

              {/* Separator */}
              <div className="navbar-dropdown-separator"></div>

              {/* Checkbox Items */}
              <button className="navbar-dropdown-checkbox-item">
                <Check className="navbar-dropdown-checkmark" />
                <span>Show weekends</span>
              </button>
              <button className="navbar-dropdown-checkbox-item">
                <span className="navbar-dropdown-checkmark"></span>
                <span>Show declined events</span>
              </button>
              <button className="navbar-dropdown-checkbox-item">
                <Check className="navbar-dropdown-checkmark" />
                <span>Show completed tasks</span>
              </button>
            </div>
          )}
            </div>

            {/* Grid Icon */}
            <button
              className="navbar-icon-button"
              aria-label="Apps"
            >
              <Grid3x3 className="navbar-icon" />
            </button>
          </>
        )}

        {/* Profile Avatar */}
        <button
          className="navbar-profile-avatar"
          aria-label="Account"
        >
          <User className="navbar-profile-icon" />
        </button>
      </div>
    </nav>
  );
}
