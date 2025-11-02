"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { X, Clock, AlignLeft, CalendarDays, ChevronDown } from "lucide-react";
import dayjs from "dayjs";
import { createTask } from "@/app/actions/task-actions";

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  date?: string;
}

export default function TaskCreationModal({
  isOpen,
  onClose,
  date,
}: TaskCreationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs(date || new Date()));
  const [selectedTime, setSelectedTime] = useState("1:00 AM");
  const [allDay, setAllDay] = useState(false);
  const [repeat, setRepeat] = useState("Does not repeat");
  const [taskList, setTaskList] = useState("My Tasks");
  const [isPending, startTransition] = useTransition();

  // Focus title input when modal opens
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", selectedDate.format("YYYY-MM-DD"));

    startTransition(async () => {
      try {
        await createTask(formData);
        setTitle("");
        setDescription("");
        onClose();
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="task-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="task-modal-close-button"
          aria-label="Close"
        >
          <X className="task-modal-close-icon" />
        </button>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="task-modal-title-section">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="task-modal-title-input"
            />
          </div>

          {/* Date and Time Section */}
          <div className="task-modal-section">
            <div className="task-modal-icon-wrapper">
              <Clock className="task-modal-icon" />
            </div>
            <div className="task-modal-datetime-wrapper">
              <button
                type="button"
                className="task-modal-date-button"
              >
                {selectedDate.format("MMMM D")}
              </button>
              <button
                type="button"
                className="task-modal-time-button"
              >
                {selectedTime}
              </button>
            </div>
          </div>

          {/* All day checkbox */}
          <div className="task-modal-section task-modal-checkbox-section">
            <div className="task-modal-icon-wrapper"></div>
            <label className="task-modal-checkbox-label">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="task-modal-checkbox"
              />
              <span className="task-modal-checkbox-text">All day</span>
            </label>
          </div>

          {/* Repeat dropdown */}
          <div className="task-modal-section">
            <div className="task-modal-icon-wrapper"></div>
            <button
              type="button"
              className="task-modal-dropdown-button"
            >
              <span>{repeat}</span>
              <ChevronDown className="task-modal-dropdown-icon" />
            </button>
          </div>

          {/* Description */}
          <div className="task-modal-section">
            <div className="task-modal-icon-wrapper">
              <AlignLeft className="task-modal-icon" />
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              className="task-modal-description-textarea"
              rows={1}
            />
          </div>

          {/* Task List dropdown */}
          <div className="task-modal-section">
            <div className="task-modal-icon-wrapper">
              <CalendarDays className="task-modal-icon" />
            </div>
            <button
              type="button"
              className="task-modal-dropdown-button"
            >
              <span>{taskList}</span>
              <ChevronDown className="task-modal-dropdown-icon" />
            </button>
          </div>

          {/* Save button */}
          <div className="task-modal-footer">
            <button
              type="submit"
              disabled={!title.trim() || isPending}
              className="task-modal-save-button"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
