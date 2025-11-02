import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import dayjs from "dayjs";
import {
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
  HiOutlineUsers,
} from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import AddTime from "./add-time";
import { createEvent } from "@/app/actions/event-actions";
import { createTask } from "@/app/actions/task-actions";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface EventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function EventPopover({
  isOpen,
  onClose,
  date,
}: EventPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const [popoverMode, setPopoverMode] = useState<"event" | "task">("event");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
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

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  async function onSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      try {
        const result =
          popoverMode === "event"
            ? await createEvent(formData)
            : await createTask(formData);
        if ("error" in result) {
          setError(result.error);
        } else if (result.success) {
          setSuccess(result.success);
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } catch {
        setError("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <div
      className="event-popover-overlay"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="event-popover-container"
        onClick={handlePopoverClick}
      >
        <div className="event-popover-header">
          {popoverMode === "event" ? (
            <div className="event-popover-header-title">
              <HiOutlineMenuAlt4 className="event-popover-header-icon" />
              <span className="event-popover-header-text">Create Event</span>
            </div>
          ) : (
            <div className="event-popover-header-title">
              <Checkbox disabled />
              <span className="event-popover-header-text">Create Task</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
            className="event-popover-close-button"
          >
            <IoCloseSharp className="event-popover-header-icon" />
          </Button>
        </div>
        <form className="event-popover-form" action={onSubmit}>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Add title"
              className="event-popover-title-input"
            />
          </div>
          <div className="event-popover-mode-selector">
            <Button
              type="button"
              size="sm"
              className={cn(
                popoverMode === "event"
                  ? "event-popover-mode-button-active"
                  : "event-popover-mode-button",
              )}
              onClick={() => setPopoverMode("event")}
            >
              Event
            </Button>
            <Button
              type="button"
              size="sm"
              className={cn(
                popoverMode === "task"
                  ? "event-popover-mode-button-active"
                  : "event-popover-mode-button",
              )}
              onClick={() => setPopoverMode("task")}
            >
              Task
            </Button>
          </div>

          <div className="event-popover-field-row">
            <FiClock className="event-popover-field-icon" />
            <div className="event-popover-datetime-container">
              <p className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</p>
              {popoverMode === "event" && (
                <AddTime onTimeSelect={setSelectedTime} />
              )}
              <input type="hidden" name="date" value={date} />
              {popoverMode === "event" && (
                <input type="hidden" name="time" value={selectedTime} />
              )}
            </div>
          </div>

          {popoverMode === "event" && (
            <div className="event-popover-field-row">
              <HiOutlineUsers className="event-popover-field-icon" />
              <Input
                type="text"
                name="guests"
                placeholder="Add guests"
                className="event-popover-input"
              />
            </div>
          )}

          <div className="event-popover-field-row">
            <HiOutlineMenuAlt2 className="event-popover-field-icon" />
            <Input
              type="text"
              name="description"
              placeholder={
                popoverMode === "event"
                  ? "Add description"
                  : "Add description or details"
              }
              className="event-popover-input"
            />
          </div>

          {popoverMode === "event" && (
            <div className="event-popover-field-row">
              <IoMdCalendar className="event-popover-field-icon" />
              <div className="event-popover-calendar-info">
                <div className="event-popover-calendar-user">
                  <p className="event-popover-calendar-user-name">User</p>
                  <div className="event-popover-calendar-color"></div>
                </div>
                <div className="event-popover-calendar-meta">
                  <span>Busy</span>
                  <div className="event-popover-meta-dot"></div>
                  <span>Default visibility</span>
                  <div className="event-popover-meta-dot"></div>
                  <span>Notify 30 minutes before</span>
                </div>
              </div>
            </div>
          )}

          <div className="event-popover-actions">
            <Button
              type="submit"
              disabled={isPending}
              className="event-popover-save-button"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          {error && <p className="event-popover-error">{error}</p>}
          {success && (
            <p className="event-popover-success">
              {popoverMode === "event" ? "Event created!" : "Task created!"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
