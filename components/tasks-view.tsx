"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TasksView() {
  const [listsOpen, setListsOpen] = useState(true);

  return (
    <div className="tasks-view-container">
      {/* Left Sidebar */}
      <aside className="tasks-view-sidebar">
        {/* Create Button */}
        <button className="tasks-view-create-button">
          <Plus className="tasks-view-create-icon" />
          Create
        </button>

        {/* All tasks - Selected */}
        <button className="tasks-view-nav-item tasks-view-nav-item-active">
          <svg className="tasks-view-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          All tasks
        </button>

        {/* Starred */}
        <button className="tasks-view-nav-item">
          <svg className="tasks-view-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Starred
        </button>

        {/* Lists Section */}
        <div className="tasks-view-lists-section">
          <button
            onClick={() => setListsOpen(!listsOpen)}
            className="tasks-view-lists-header"
          >
            <svg className={cn("tasks-view-chevron-icon", listsOpen && "tasks-view-chevron-icon-open")} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
            <span className="tasks-view-lists-title">Lists</span>
          </button>

          {listsOpen && (
            <div className="tasks-view-lists-content">
              <div className="tasks-view-list-item">
                <input type="checkbox" checked readOnly className="tasks-view-list-checkbox" />
                <span className="tasks-view-list-name">My Tasks</span>
              </div>
            </div>
          )}
        </div>

        {/* Create new list */}
        <button className="tasks-view-create-list-button">
          <Plus className="tasks-view-create-list-icon" />
          Create new list
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="tasks-view-main">
        {/* Header */}
        <div className="tasks-view-header">
          <h1 className="tasks-view-title">My Tasks</h1>
          <button className="tasks-view-more-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>

        {/* Add task input box */}
        <div className="tasks-view-add-task-container">
          <div className="tasks-view-add-task-box">
            <svg className="tasks-view-add-task-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="tasks-view-add-task-text">Add a task</span>
          </div>
        </div>

        {/* Empty state */}
        <div className="tasks-view-empty">
          <svg className="tasks-view-empty-icon" width="160" height="160" viewBox="0 0 160 160" fill="none">
            {/* Pencil eraser */}
            <rect x="60" y="50" width="12" height="20" rx="2" fill="#F4B9C0" transform="rotate(-20 66 60)"/>
            {/* Pencil body */}
            <rect x="68" y="45" width="8" height="50" fill="#FDD663" transform="rotate(-20 72 70)"/>
            {/* Lines/checklist */}
            <rect x="75" y="75" width="30" height="3" rx="1.5" fill="#AAE9C5"/>
            <rect x="75" y="85" width="35" height="3" rx="1.5" fill="#AECBFA"/>
            <rect x="75" y="95" width="25" height="3" rx="1.5" fill="#D2E3FC"/>
            {/* Checkmark accent */}
            <path d="M95 58 L100 63 L110 48" stroke="#80868B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
            {/* Sun */}
            <circle cx="50" cy="45" r="7" fill="#FBBC04"/>
          </svg>
          <p className="tasks-view-empty-text">No tasks yet</p>
          <p className="tasks-view-empty-subtext">Add your to-dos and keep track of<br />them across Google Workspace</p>
        </div>
      </main>
    </div>
  );
}
