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
import { MdLocationOn, MdDescription, MdVideocam } from "react-icons/md";
import { X, Menu } from "lucide-react";
import AddTime from "./add-time";
import { createEvent } from "@/app/actions/event-actions";
import { createTask } from "@/app/actions/task-actions";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface EventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  initialMode?: "event" | "task" | "outofoffice" | "focustime" | "workinglocation" | "appointment";
}

export default function EventPopover({
  isOpen,
  onClose,
  date,
  initialMode = "event",
}: EventPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const [popoverMode, setPopoverMode] = useState<"event" | "task" | "outofoffice" | "focustime" | "workinglocation" | "appointment">(initialMode);
  const [declineMeetings, setDeclineMeetings] = useState(true);
  const [declineOption, setDeclineOption] = useState<"new" | "all">("all");
  const [doNotDisturb, setDoNotDisturb] = useState(true);
  const [autoDeclineMeetings, setAutoDeclineMeetings] = useState(false);

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
        {/* Header with Menu and Close */}
        <div className="event-popover-header">
          <button type="button" className="event-popover-menu-button">
            <Menu className="event-popover-menu-icon" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="event-popover-close-button"
          >
            <X className="event-popover-close-icon" />
          </button>
        </div>

        <form className="event-popover-form" action={onSubmit}>
          {/* Title Input */}
          <div className="event-popover-title-section">
            <Input
              type="text"
              name="title"
              placeholder="Add title"
              className="event-popover-title-input"
            />
          </div>

          {/* Tab Navigation */}
          <div className="event-popover-tabs">
            <button
              type="button"
              className={cn(
                "event-popover-tab",
                popoverMode === "event" && "event-popover-tab-active"
              )}
              onClick={() => setPopoverMode("event")}
            >
              Event
            </button>
            <button
              type="button"
              className={cn(
                "event-popover-tab",
                popoverMode === "task" && "event-popover-tab-active"
              )}
              onClick={() => setPopoverMode("task")}
            >
              Task
            </button>
            <button
              type="button"
              className={cn(
                "event-popover-tab",
                popoverMode === "outofoffice" && "event-popover-tab-active"
              )}
              onClick={() => setPopoverMode("outofoffice")}
            >
              Out of office
            </button>
            <button
              type="button"
              className={cn(
                "event-popover-tab",
                popoverMode === "focustime" && "event-popover-tab-active"
              )}
              onClick={() => setPopoverMode("focustime")}
            >
              Focus time
            </button>
            <button
              type="button"
              className={cn(
                "event-popover-tab",
                popoverMode === "workinglocation" && "event-popover-tab-active"
              )}
              onClick={() => setPopoverMode("workinglocation")}
            >
              Working location
              <span className="event-popover-tab-badge">NEW</span>
            </button>
            <button
              type="button"
              className={cn(
                "event-popover-tab",
                popoverMode === "appointment" && "event-popover-tab-active"
              )}
              onClick={() => setPopoverMode("appointment")}
            >
              Appointment schedule
            </button>
          </div>

          {/* Out of Office Mode Content */}
          {popoverMode === "outofoffice" ? (
            <>
              {/* Date Section for Out of Office */}
              <div className="event-popover-field-row">
                <FiClock className="event-popover-field-icon" />
                <div className="event-popover-datetime-container">
                  <div className="event-popover-datetime-row">
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                    <span className="event-popover-time-separator">–</span>
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                  </div>
                  <div className="event-popover-timezone-row">
                    <span className="event-popover-timezone-text">Does not repeat</span>
                  </div>
                  <input type="hidden" name="date" value={date} />
                </div>
              </div>

              {/* Automatically decline meetings */}
              <div className="event-popover-ooo-section">
                <label className="event-popover-ooo-checkbox-row">
                  <input
                    type="checkbox"
                    checked={declineMeetings}
                    onChange={(e) => setDeclineMeetings(e.target.checked)}
                    className="event-popover-ooo-checkbox"
                  />
                  <span className="event-popover-ooo-label">Automatically decline meetings</span>
                </label>

                {declineMeetings && (
                  <div className="event-popover-ooo-options">
                    <label className="event-popover-ooo-radio-row">
                      <input
                        type="radio"
                        name="decline-option"
                        value="new"
                        checked={declineOption === "new"}
                        onChange={() => setDeclineOption("new")}
                        className="event-popover-ooo-radio"
                      />
                      <span className="event-popover-ooo-radio-label">Only new meeting invitations</span>
                    </label>
                    <label className="event-popover-ooo-radio-row">
                      <input
                        type="radio"
                        name="decline-option"
                        value="all"
                        checked={declineOption === "all"}
                        onChange={() => setDeclineOption("all")}
                        className="event-popover-ooo-radio"
                      />
                      <span className="event-popover-ooo-radio-label">New and existing meetings</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Message textarea */}
              <div className="event-popover-ooo-message">
                <label className="event-popover-ooo-message-label">Message</label>
                <textarea
                  name="message"
                  placeholder="Declined because I am out of office"
                  className="event-popover-ooo-textarea"
                  rows={3}
                  defaultValue="Declined because I am out of office"
                />
              </div>

              {/* Visibility dropdown */}
              <div className="event-popover-field-row">
                <svg className="event-popover-field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                </svg>
                <select className="event-popover-task-select">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              {/* Availability notice */}
              <div className="event-popover-ooo-notice">
                <span className="event-popover-ooo-notice-text">
                  Availability might be shown in other Google apps
                </span>
                <button type="button" className="event-popover-ooo-help-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </>
          ) : popoverMode === "focustime" ? (
            <>
              {/* Date and Time Section for Focus Time */}
              <div className="event-popover-field-row">
                <FiClock className="event-popover-field-icon" />
                <div className="event-popover-datetime-container">
                  <div className="event-popover-datetime-row">
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                    <span className="event-popover-time-text">12:00am</span>
                    <span className="event-popover-time-separator">–</span>
                    <span className="event-popover-time-text">1:00am</span>
                  </div>
                  <div className="event-popover-timezone-row">
                    <span className="event-popover-timezone-text">Time zone</span>
                    <span className="event-popover-meta-dot"></span>
                    <span className="event-popover-timezone-text">Does not repeat</span>
                  </div>
                  <input type="hidden" name="date" value={date} />
                </div>
              </div>

              {/* Do not disturb section */}
              <div className="event-popover-field-row">
                <svg className="event-popover-field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" fill="currentColor"/>
                </svg>
                <div className="event-popover-focustime-dnd">
                  <div className="event-popover-focustime-dnd-header">
                    <span className="event-popover-focustime-dnd-title">Do not disturb</span>
                  </div>
                  <span className="event-popover-focustime-dnd-subtitle">Mute Chat notifications</span>
                </div>
              </div>

              {/* Automatically decline meetings */}
              <div className="event-popover-ooo-section">
                <label className="event-popover-ooo-checkbox-row">
                  <input
                    type="checkbox"
                    checked={autoDeclineMeetings}
                    onChange={(e) => setAutoDeclineMeetings(e.target.checked)}
                    className="event-popover-ooo-checkbox"
                  />
                  <span className="event-popover-ooo-label">Automatically decline meetings</span>
                </label>
              </div>

              {/* Add Location Section */}
              <div className="event-popover-field-row">
                <MdLocationOn className="event-popover-field-icon" />
                <Input
                  type="text"
                  name="location"
                  placeholder="Add rooms or location"
                  className="event-popover-input"
                />
              </div>

              {/* Add Description Section */}
              <div className="event-popover-field-row">
                <MdDescription className="event-popover-field-icon" />
                <Input
                  type="text"
                  name="description"
                  placeholder="Add description or a Google Drive attachment"
                  className="event-popover-input"
                />
              </div>

              {/* Calendar User Info Section */}
              <div className="event-popover-field-row">
                <IoMdCalendar className="event-popover-field-icon" />
                <div className="event-popover-calendar-info">
                  <div className="event-popover-calendar-user">
                    <span className="event-popover-calendar-user-name">Rehan Islam</span>
                    <div className="event-popover-calendar-color"></div>
                  </div>
                  <div className="event-popover-calendar-meta">
                    <span>Busy</span>
                    <span className="event-popover-meta-dot">•</span>
                    <span>Default visibility</span>
                    <span className="event-popover-meta-dot">•</span>
                    <span>Notify 10 minutes before</span>
                  </div>
                </div>
              </div>

              {/* Availability notice */}
              <div className="event-popover-ooo-notice">
                <span className="event-popover-ooo-notice-text">
                  Availability might be shown in other Google apps
                </span>
                <button type="button" className="event-popover-ooo-help-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </>
          ) : popoverMode === "workinglocation" ? (
            <>
              {/* Date Section for Working Location */}
              <div className="event-popover-field-row">
                <FiClock className="event-popover-field-icon" />
                <div className="event-popover-workinglocation-datetime">
                  <div className="event-popover-datetime-row">
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                    <span className="event-popover-time-separator">–</span>
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                    <button type="button" className="event-popover-workinglocation-add-time">
                      Add time
                    </button>
                  </div>
                  <div className="event-popover-timezone-row">
                    <span className="event-popover-timezone-text">Set repeating locations in </span>
                    <a href="#" className="event-popover-workinglocation-settings-link">settings</a>
                  </div>
                  <input type="hidden" name="date" value={date} />
                </div>
              </div>

              {/* Choose a location Section */}
              <div className="event-popover-field-row">
                <MdLocationOn className="event-popover-field-icon" />
                <div className="event-popover-workinglocation-choices">
                  <span className="event-popover-workinglocation-label">Choose a location</span>
                  <div className="event-popover-workinglocation-buttons">
                    <button type="button" className="event-popover-workinglocation-button">
                      <svg className="event-popover-workinglocation-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
                      </svg>
                      Home
                    </button>
                    <button type="button" className="event-popover-workinglocation-button">
                      <svg className="event-popover-workinglocation-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="currentColor"/>
                      </svg>
                      Office
                    </button>
                  </div>
                  <button type="button" className="event-popover-workinglocation-other">
                    Other locations
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar User Info Section */}
              <div className="event-popover-field-row">
                <IoMdCalendar className="event-popover-field-icon" />
                <div className="event-popover-calendar-info">
                  <div className="event-popover-calendar-user">
                    <span className="event-popover-calendar-user-name">Rehan Islam</span>
                    <div className="event-popover-calendar-color"></div>
                  </div>
                </div>
              </div>
            </>
          ) : popoverMode === "appointment" ? (
            <>
              {/* Date and Time Section for Appointment Schedule */}
              <div className="event-popover-field-row">
                <FiClock className="event-popover-field-icon" />
                <div className="event-popover-datetime-container">
                  <div className="event-popover-datetime-row">
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                    <span className="event-popover-time-text">12:00am</span>
                    <span className="event-popover-time-separator">–</span>
                    <span className="event-popover-time-text">1:00am</span>
                  </div>
                  <input type="hidden" name="date" value={date} />
                </div>
              </div>

              {/* Info Section */}
              <div className="event-popover-appointment-info">
                <svg className="event-popover-appointment-info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
                </svg>
                <div className="event-popover-appointment-info-content">
                  <p className="event-popover-appointment-info-text">
                    Create a booking page you can share with others so they can book time with you themselves
                  </p>
                  <div className="event-popover-appointment-info-links">
                    <a href="#" className="event-popover-appointment-link">See how it works</a>
                    <a href="#" className="event-popover-appointment-link">Learn more</a>
                  </div>
                </div>
              </div>

              {/* Calendar User Info Section */}
              <div className="event-popover-field-row">
                <IoMdCalendar className="event-popover-field-icon" />
                <div className="event-popover-calendar-info">
                  <div className="event-popover-calendar-user">
                    <span className="event-popover-calendar-user-name">Rehan Islam</span>
                  </div>
                </div>
              </div>
            </>
          ) : popoverMode === "task" ? (
            <>
              {/* Date and Time Section for Task */}
              <div className="event-popover-field-row">
                <FiClock className="event-popover-field-icon" />
                <div className="event-popover-datetime-container">
                  <div className="event-popover-datetime-row">
                    <span className="event-popover-date-text">{dayjs(date).format("MMM D, YYYY")}</span>
                    <span className="event-popover-time-text">{dayjs(date).format("h:mma")}</span>
                  </div>
                  <div className="event-popover-timezone-row">
                    <span className="event-popover-timezone-text">Does not repeat</span>
                  </div>
                  <input type="hidden" name="date" value={date} />
                </div>
              </div>

              {/* Add Description Section for Task */}
              <div className="event-popover-task-description">
                <HiOutlineMenuAlt2 className="event-popover-field-icon" />
                <textarea
                  name="description"
                  placeholder="Add description"
                  className="event-popover-task-textarea"
                  rows={6}
                />
              </div>

              {/* Task List Selector */}
              <div className="event-popover-field-row">
                <HiOutlineMenuAlt4 className="event-popover-field-icon" />
                <select className="event-popover-task-select">
                  <option value="my-tasks">My Tasks</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Event Mode Content */}
              <div className="event-popover-field-row">
                <FiClock className="event-popover-field-icon" />
                <div className="event-popover-datetime-container">
                  <div className="event-popover-datetime-row">
                    <span className="event-popover-date-text">{dayjs(date).format("dddd, MMMM D")}</span>
                    <span className="event-popover-time-separator">–</span>
                    <span className="event-popover-date-text">{dayjs(date).add(1, 'day').format("dddd, MMMM D")}</span>
                  </div>
                  <div className="event-popover-timezone-row">
                    <span className="event-popover-timezone-text">Time zone</span>
                    <span className="event-popover-meta-dot"></span>
                    <span className="event-popover-timezone-text">Does not repeat</span>
                  </div>
                  <input type="hidden" name="date" value={date} />
                  <input type="hidden" name="time" value={selectedTime} />
                </div>
              </div>

              {/* Add Guests Section */}
              <div className="event-popover-field-row">
                <HiOutlineUsers className="event-popover-field-icon" />
                <Input
                  type="text"
                  name="guests"
                  placeholder="Add guests"
                  className="event-popover-input"
                />
              </div>

              {/* Add Google Meet Section */}
              <div className="event-popover-field-row">
                <MdVideocam className="event-popover-field-icon" />
                <span className="event-popover-link-text">Add Google Meet video conferencing</span>
              </div>

              {/* Add Location Section */}
              <div className="event-popover-field-row">
                <MdLocationOn className="event-popover-field-icon" />
                <Input
                  type="text"
                  name="location"
                  placeholder="Add rooms or location"
                  className="event-popover-input"
                />
              </div>

              {/* Add Description Section */}
              <div className="event-popover-field-row">
                <MdDescription className="event-popover-field-icon" />
                <Input
                  type="text"
                  name="description"
                  placeholder="Add description or a Google Drive attachment"
                  className="event-popover-input"
                />
              </div>

              {/* Calendar User Info Section */}
              <div className="event-popover-field-row">
                <IoMdCalendar className="event-popover-field-icon" />
                <div className="event-popover-calendar-info">
                  <div className="event-popover-calendar-user">
                    <span className="event-popover-calendar-user-name">Rehan Islam</span>
                    <div className="event-popover-calendar-color"></div>
                  </div>
                  <div className="event-popover-calendar-meta">
                    <span>Busy</span>
                    <span className="event-popover-meta-dot">•</span>
                    <span>Default visibility</span>
                    <span className="event-popover-meta-dot">•</span>
                    <span>Notify 10 minutes before</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Footer Actions */}
          <div className="event-popover-footer">
            {popoverMode === "event" && (
              <button type="button" className="event-popover-more-options">
                More options
              </button>
            )}
            {popoverMode === "task" && <div></div>}
            {popoverMode === "appointment" ? (
              <>
                <div></div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="event-popover-save-button"
                >
                  {isPending ? "Setting up..." : "Set up the schedule"}
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                className="event-popover-save-button"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            )}
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
