"use client";

import React from "react";
import CreateButton from "./create-button";

/**
 * Example usage of the CreateButton component
 * This shows how to integrate it into a sidebar layout
 */
export default function CreateButtonExample() {
  const handleEventClick = () => {
    console.log("Event clicked - Open event creation dialog");
    // Add your event creation logic here
  };

  const handleTaskClick = () => {
    console.log("Task clicked - Open task creation dialog");
    // Add your task creation logic here
  };

  const handleAppointmentClick = () => {
    console.log("Appointment schedule clicked - Open appointment dialog");
    // Add your appointment scheduling logic here
  };

  return (
    <div className="flex min-h-screen flex-col items-start bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Google Calendar Create Button Example
      </h1>

      {/* Example 1: Standalone */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Standalone Button
        </h2>
        <CreateButton
          onEventClick={handleEventClick}
          onTaskClick={handleTaskClick}
          onAppointmentClick={handleAppointmentClick}
        />
      </div>

      {/* Example 2: In a Sidebar Layout */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          In Sidebar Layout
        </h2>
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <CreateButton
              onEventClick={handleEventClick}
              onTaskClick={handleTaskClick}
              onAppointmentClick={handleAppointmentClick}
            />
            <div className="mt-6 space-y-2">
              <div className="text-sm text-gray-600">Mini Calendar</div>
              <div className="text-sm text-gray-600">My Calendars</div>
              <div className="text-sm text-gray-600">Other Calendars</div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-gray-600">Calendar Grid Goes Here</div>
          </main>
        </div>
      </div>

      {/* Example 3: Centered in Container */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Centered in Container
        </h2>
        <div className="flex w-full max-w-md items-center justify-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <CreateButton
            onEventClick={handleEventClick}
            onTaskClick={handleTaskClick}
            onAppointmentClick={handleAppointmentClick}
          />
        </div>
      </div>
    </div>
  );
}
