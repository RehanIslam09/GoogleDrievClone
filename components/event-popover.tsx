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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-lg rounded-lg bg-white shadow-2xl"
        onClick={handlePopoverClick}
      >
        <div className="flex items-center justify-between border-b border-google-gray-200 px-6 py-4">
          {popoverMode === "event" ? (
            <div className="flex items-center gap-2">
              <HiOutlineMenuAlt4 className="h-5 w-5 text-google-gray-600" />
              <span className="text-sm font-medium text-google-gray-700">Create Event</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Checkbox disabled />
              <span className="text-sm font-medium text-google-gray-700">Create Task</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
            className="hover:bg-google-gray-100"
          >
            <IoCloseSharp className="h-5 w-5 text-google-gray-600" />
          </Button>
        </div>
        <form className="space-y-4 p-6" action={onSubmit}>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Add title"
              className="rounded-none border-0 border-b border-google-gray-300 px-0 text-2xl font-normal text-google-gray-800 placeholder:text-google-gray-400 focus-visible:border-b-2 focus-visible:border-google-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-google-gray-200 pb-4">
            <Button
              type="button"
              size="sm"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                popoverMode === "event"
                  ? "bg-google-blue-100 text-google-blue-700 hover:bg-google-blue-100"
                  : "bg-transparent text-google-gray-700 hover:bg-google-gray-100",
              )}
              onClick={() => setPopoverMode("event")}
            >
              Event
            </Button>
            <Button
              type="button"
              size="sm"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                popoverMode === "task"
                  ? "bg-google-blue-100 text-google-blue-700 hover:bg-google-blue-100"
                  : "bg-transparent text-google-gray-700 hover:bg-google-gray-100",
              )}
              onClick={() => setPopoverMode("task")}
            >
              Task
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <FiClock className="h-5 w-5 text-google-gray-600" />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-google-gray-700">{dayjs(date).format("dddd, MMMM D")}</p>
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
            <div className="flex items-center gap-3">
              <HiOutlineUsers className="h-5 w-5 text-google-gray-600" />
              <Input
                type="text"
                name="guests"
                placeholder="Add guests"
                className="rounded-md border-0 bg-google-gray-50 text-sm text-google-gray-800 placeholder:text-google-gray-400 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-google-blue-500"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <HiOutlineMenuAlt2 className="h-5 w-5 text-google-gray-600" />
            <Input
              type="text"
              name="description"
              placeholder={
                popoverMode === "event"
                  ? "Add description"
                  : "Add description or details"
              }
              className="rounded-md border-0 bg-google-gray-50 text-sm text-google-gray-800 placeholder:text-google-gray-400 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-google-blue-500"
            />
          </div>

          {popoverMode === "event" && (
            <div className="flex items-center gap-3">
              <IoMdCalendar className="h-5 w-5 text-google-gray-600" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-google-gray-700">User</p>
                  <div className="h-4 w-4 rounded-full bg-google-blue-500"></div>
                </div>
                <div className="flex items-center gap-1 text-xs text-google-gray-500">
                  <span>Busy</span>
                  <div className="h-1 w-1 rounded-full bg-google-gray-400"></div>
                  <span>Default visibility</span>
                  <div className="h-1 w-1 rounded-full bg-google-gray-400"></div>
                  <span>Notify 30 minutes before</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-google-blue-500 text-white hover:bg-google-blue-600"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm text-google-green-600">
              {popoverMode === "event" ? "Event created!" : "Task created!"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
