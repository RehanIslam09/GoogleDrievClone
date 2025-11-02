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
  X,
} from "lucide-react";
import { useDateStore, useViewStore, useToggleSideBarStore, useTasksViewStore } from "@/lib/store";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import GoogleAppsDropdown from "./google-apps-dropdown";

export default function GoogleNavbar() {
  const { userSelectedDate, setDate, selectedMonthIndex, setMonth } = useDateStore();
  const { selectedView, setView } = useViewStore();
  const { isSideBarOpen, setSideBarOpen } = useToggleSideBarStore();
  const { isTasksViewOpen, setTasksViewOpen } = useTasksViewStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  // Close apps dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
    };

    if (isAppsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAppsOpen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

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
          <button
            onClick={() => setTasksViewOpen(!isTasksViewOpen)}
            className={cn(
              "navbar-view-check-button",
              isTasksViewOpen && "navbar-view-check-button-active"
            )}
            aria-label="Tasks"
          >
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
                  setView("year");
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Year</span>
                <span className="navbar-dropdown-item-shortcut">Y</span>
              </button>
              <button
                onClick={() => {
                  setView("schedule");
                  setIsDropdownOpen(false);
                }}
                className="navbar-dropdown-item"
              >
                <span>Schedule</span>
                <span className="navbar-dropdown-item-shortcut">A</span>
              </button>
              <button
                onClick={() => {
                  setView("4days");
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

            {/* Google Apps Dropdown */}
            <div className="navbar-apps-dropdown-wrapper" ref={appsRef}>
              <button
                onClick={() => setIsAppsOpen(!isAppsOpen)}
                className="navbar-icon-button"
                aria-label="Apps"
              >
                <Grid3x3 className="navbar-icon" />
              </button>

              {/* Apps Dropdown Menu */}
              {isAppsOpen && <GoogleAppsDropdown />}
            </div>
          </>
        )}

        {/* Profile Button */}
        <div className="navbar-profile-wrapper" ref={profileRef}>
          <button
            className="navbar-profile-button"
            aria-label="Account"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <span className="navbar-profile-text">Google</span>
            <div className="navbar-profile-avatar">
              <span className="navbar-profile-letter">R</span>
            </div>
          </button>

          {/* Profile Dropdown Modal */}
          {isProfileOpen && (
            <div className="profile-dropdown-modal">
              {/* Close button */}
              <button
                onClick={() => setIsProfileOpen(false)}
                className="profile-dropdown-close"
                aria-label="Close"
              >
                <X className="profile-dropdown-close-icon" />
              </button>

              {/* Email */}
              <div className="profile-dropdown-email">rehan.25bcs10377@sst.scaler.com</div>
              <div className="profile-dropdown-managed">Managed by sst.scaler.com</div>

              {/* Avatar */}
              <div className="profile-dropdown-avatar-container">
                <div className="profile-dropdown-avatar">
                  <span className="profile-dropdown-avatar-letter">R</span>
                  <div className="profile-dropdown-avatar-badge">
                    <svg className="profile-dropdown-avatar-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Greeting */}
              <div className="profile-dropdown-greeting">Hi, Rehan!</div>

              {/* Manage account button */}
              <button className="profile-dropdown-manage-button">
                Manage your Google Account
              </button>

              {/* Action buttons */}
              <div className="profile-dropdown-actions">
                <button className="profile-dropdown-action-button">
                  <svg className="profile-dropdown-action-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  <span>Add account</span>
                </button>
                <button className="profile-dropdown-action-button">
                  <svg className="profile-dropdown-action-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  <span>Sign out</span>
                </button>
              </div>

              {/* Footer links */}
              <div className="profile-dropdown-footer">
                <a href="#" className="profile-dropdown-footer-link">Privacy Policy</a>
                <span className="profile-dropdown-footer-dot">•</span>
                <a href="#" className="profile-dropdown-footer-link">Terms of Service</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
