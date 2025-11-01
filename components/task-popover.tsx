import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import dayjs from "dayjs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { createTask } from "@/app/actions/task-actions";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface TaskPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function TaskPopover({
  isOpen,
  onClose,
  date,
}: TaskPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();

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
        const result = await createTask(formData);
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
        onClick={handlePopoverClick}
      >
        <div className="mb-2 flex items-center justify-between rounded-md bg-slate-100 p-1">
          <div className="flex items-center gap-2 pl-2">
            <Checkbox disabled />
            <span className="text-sm text-gray-600">Mark as complete</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
          >
            <IoCloseSharp className="h-4 w-4" />
          </Button>
        </div>
        <form className="space-y-4 p-6" action={onSubmit}>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Add title"
              className="my-4 rounded-none border-0 border-b text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex items-center space-x-3">
            <FiClock className="size-5 text-gray-600" />
            <div className="flex items-center space-x-3 text-sm">
              <p>{dayjs(date).format("dddd, MMMM D")}</p>
              <input type="hidden" name="date" value={date} />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <HiOutlineMenuAlt2 className="size-5 text-slate-600" />
            <Input
              type="text"
              name="description"
              placeholder="Add description or details"
              className={cn(
                "w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0",
              )}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          {error && <p className="mt-2 px-6 text-red-500">{error}</p>}
          {success && (
            <p className="mt-2 px-6 text-green-500">Task created!</p>
          )}
        </form>
      </div>
    </div>
  );
}
