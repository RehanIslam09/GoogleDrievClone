"use client";

import React, { useState } from "react";
import { Plus, Star, ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
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

        {/* Navigation */}
        <nav className="tasks-view-nav">
          {/* All tasks - Selected */}
          <button className="tasks-view-nav-item tasks-view-nav-item-active">
            <svg className="tasks-view-nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            All tasks
          </button>

          {/* Starred */}
          <button className="tasks-view-nav-item">
            <Star className="tasks-view-nav-icon" />
            Starred
          </button>
        </nav>

        {/* Lists Section */}
        <div className="tasks-view-lists-section">
          <div
            onClick={() => setListsOpen(!listsOpen)}
            className="tasks-view-lists-header"
          >
            <div className="tasks-view-lists-title-wrapper">
              {listsOpen ? (
                <ChevronDown className="tasks-view-chevron-icon" />
              ) : (
                <ChevronRight className="tasks-view-chevron-icon" />
              )}
              <span className="tasks-view-lists-title">Lists</span>
            </div>
            <Plus className="tasks-view-add-list-icon" />
          </div>

          {listsOpen && (
            <div className="tasks-view-lists-content">
              <button className="tasks-view-list-item">
                <span>My Tasks</span>
                <MoreVertical className="tasks-view-list-more" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="tasks-view-main">
        {/* Header */}
        <div className="tasks-view-header">
          <h1 className="tasks-view-title">My Tasks</h1>
        </div>

        {/* Add task button */}
        <button className="tasks-view-add-task-button">
          <span>Add a task</span>
        </button>

        {/* Empty state */}
        <div className="tasks-view-empty">
          <div className="tasks-view-empty-illustration">
            <svg className="tasks-view-empty-icon" width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Illustration elements */}
              <circle cx="60" cy="45" r="8" fill="#FDD663"/>
              <rect x="45" y="55" width="30" height="3" rx="1.5" fill="#AECBFA"/>
              <rect x="52" y="62" width="16" height="3" rx="1.5" fill="#D2E3FC"/>
              <path d="M35 70 L50 85 L85 50" stroke="#5F6368" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
            </svg>
            <p className="tasks-view-empty-text">A big list starts with one thing</p>
            <p className="tasks-view-empty-subtext">Add your first task to get started</p>
          </div>
        </div>
      </main>
    </div>
  );
}
