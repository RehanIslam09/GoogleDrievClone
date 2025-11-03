"use client";

import React, { useState } from "react";
import { X, Info, Edit2, Headphones, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeInsightsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dateRange?: string;
}

export default function TimeInsightsPanel({
  isOpen,
  onClose,
  dateRange = "NOV 1 - 30, 2025",
}: TimeInsightsPanelProps) {
  const [selectedTab, setSelectedTab] = useState<"type" | "color">("type");
  const [showFocusTime, setShowFocusTime] = useState(true);

  // Mock data for the insights
  const meetingData = [
    { label: "Focus time", hours: 0, color: "#1967d2", icon: "headphones" },
    { label: "1:1", hours: 0, color: "#1967d2", icon: "dot" },
    { label: "3+ guests", hours: 0, color: "#8ab4f8", icon: "dot" },
    { label: "Need to respond", hours: 0, color: "#fbbc04", icon: "circle" },
    { label: "Remaining time", value: "N/A", color: "#dadce0", icon: "dot" },
  ];

  const monthlyData = [
    { month: "August", hours: 0.5 },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="time-insights-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "time-insights-panel",
          isOpen && "time-insights-panel-open"
        )}
        role="dialog"
        aria-labelledby="time-insights-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="time-insights-header">
          <div className="time-insights-header-content">
            <div className="time-insights-title-section">
              <div className="time-insights-title-wrapper">
                <p className="time-insights-date-range">{dateRange}</p>
                <h2 id="time-insights-title" className="time-insights-title">
                  Time Insights
                </h2>
              </div>
              <button
                className="time-insights-lock-button"
                aria-label="Time Insights is locked"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="time-insights-close-button"
            aria-label="Close Time Insights"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="time-insights-content">
          {/* Time Breakdown Section */}
          <div className="time-insights-section">
            <div className="time-insights-section-header">
              <h3 className="time-insights-section-title">Time breakdown</h3>
              <button
                className="time-insights-info-button"
                aria-label="Time breakdown information"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                className="time-insights-edit-button"
                aria-label="Edit time breakdown"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Toggle */}
            <div className="time-insights-tabs">
              <button
                onClick={() => setSelectedTab("type")}
                className={cn(
                  "time-insights-tab",
                  selectedTab === "type" && "time-insights-tab-active"
                )}
              >
                <Check className="w-4 h-4" />
                By type
              </button>
              <button
                onClick={() => setSelectedTab("color")}
                className={cn(
                  "time-insights-tab",
                  selectedTab === "color" && "time-insights-tab-inactive"
                )}
              >
                By color
              </button>
            </div>

            {/* Chart */}
            <div className="time-insights-chart-container">
              <svg className="time-insights-chart" viewBox="0 0 200 200">
                {/* Donut chart - gray ring representing empty time */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#dadce0"
                  strokeWidth="24"
                />
              </svg>
            </div>
          </div>

          {/* Focus Time Section */}
          {showFocusTime && (
            <div className="time-insights-focus-section">
              <div className="time-insights-focus-header">
                <Headphones className="time-insights-focus-icon" />
                <div className="time-insights-focus-info">
                  <h3 className="time-insights-focus-title">Focus time</h3>
                  <p className="time-insights-focus-hours">0 hr</p>
                </div>
              </div>

              {/* Suggestion Box */}
              <div className="time-insights-suggestion-box">
                <div className="time-insights-suggestion-content">
                  <svg className="time-insights-suggestion-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                  <p className="time-insights-suggestion-text">
                    Try scheduling weekly focus time on days with fewest meetings: <strong>Fridays</strong>.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="time-insights-actions">
                <button
                  onClick={() => setShowFocusTime(false)}
                  className="time-insights-action-button time-insights-action-dismiss"
                >
                  Dismiss
                </button>
                <button className="time-insights-action-button time-insights-action-primary">
                  Schedule
                </button>
              </div>
            </div>
          )}

          {/* Meeting Categories */}
          <div className="time-insights-categories-section">
            {meetingData.map((item, index) => (
              <div key={index} className="time-insights-category-item">
                <div className="time-insights-category-left">
                  {item.icon === "headphones" ? (
                    <Headphones className="time-insights-category-icon-headphones" />
                  ) : item.icon === "circle" ? (
                    <div className="time-insights-category-circle" style={{ borderColor: item.color }} />
                  ) : (
                    <div className="time-insights-category-dot" style={{ backgroundColor: item.color }} />
                  )}
                  <span className={cn(
                    "time-insights-category-label",
                    item.label === "Remaining time" && "text-[#5f6368]"
                  )}>
                    {item.label}
                  </span>
                </div>
                <span className="time-insights-category-hours">
                  {item.value || `${item.hours} hr`}
                </span>
              </div>
            ))}

            {/* Remaining time note */}
            <div className="time-insights-working-hours-note">
              <p className="time-insights-note-text">Based on your working hours</p>
            </div>

            {/* Adjust Working Hours */}
            <button className="time-insights-link-button">
              Adjust working hours
            </button>
          </div>

          {/* Time in Meetings Section */}
          <div className="time-insights-section">
            <div className="time-insights-section-header">
              <h3 className="time-insights-section-title">Time in meetings</h3>
              <button
                className="time-insights-info-button"
                aria-label="Time in meetings information"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Meeting Stats */}
            <div className="time-insights-meeting-stats">
              <div className="time-insights-stat-column">
                <span className="time-insights-stat-label">Most meetings</span>
                <span className="time-insights-stat-value">Sundays</span>
              </div>
              <div className="time-insights-stat-column">
                <span className="time-insights-stat-label">Daily average</span>
                <span className="time-insights-stat-value">0 hr</span>
              </div>
            </div>

            {/* Monthly Chart */}
            <div className="time-insights-monthly-chart">
              {monthlyData.map((data, index) => (
                <div key={index} className="time-insights-chart-row">
                  <span className="time-insights-chart-month">{data.month}</span>
                  <div className="time-insights-chart-bar-container">
                    <div
                      className="time-insights-chart-bar"
                      style={{ width: `${(data.hours / 10) * 100}%` }}
                    />
                  </div>
                  <span className="time-insights-chart-hours">{data.hours} hr</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
