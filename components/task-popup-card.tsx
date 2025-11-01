import React from "react";
import { cn } from "@/lib/utils";
import { Clock, List, CheckSquare, Edit2, Trash2, X } from "lucide-react";
import dayjs from "dayjs";
import { CalendarTaskType } from "@/lib/store";

interface TaskPopupCardProps {
  task: CalendarTaskType;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkComplete?: () => void;
}

export default function TaskPopupCard({
  task,
  onClose,
  onEdit,
  onDelete,
  onMarkComplete,
}: TaskPopupCardProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-title"
      >
        {/* Header with action icons */}
        <div className="flex items-start justify-between border-b border-google-gray-200 px-6 pb-3 pt-5">
          <div className="flex flex-1 items-start gap-3 pr-4">
            {/* Color indicator */}
            <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-sm bg-red-600" />

            {/* Task title */}
            <h2
              id="task-title"
              className="flex-1 text-[22px] font-normal leading-7 text-google-gray-800"
            >
              {task.title}
            </h2>
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={onEdit}
              className="rounded-full p-2 text-google-gray-600 transition-colors hover:bg-google-gray-100"
              aria-label="Edit task"
              title="Edit task"
            >
              <Edit2 className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={onDelete}
              className="rounded-full p-2 text-google-gray-600 transition-colors hover:bg-google-gray-100"
              aria-label="Delete task"
              title="Delete task"
            >
              <Trash2 className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-google-gray-600 transition-colors hover:bg-google-gray-100"
              aria-label="Close"
              title="Close"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 px-6 pb-4 pt-4">
          {/* Date section */}
          <div className="flex items-center gap-4 py-2">
            <Clock className="h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <span className="text-[14px] leading-5 text-google-gray-700">
              {dayjs(task.date).format("dddd, MMMM D, YYYY")}
            </span>
          </div>

          {/* Project section */}
          <div className="flex items-center gap-4 py-2">
            <List className="h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <span className="text-[14px] leading-5 text-google-gray-700">
              Calendar Tasks
            </span>
          </div>

          {/* Task list section */}
          <div className="flex items-center gap-4 py-2">
            <CheckSquare className="h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <span className="text-[14px] leading-5 text-google-gray-700">
              My Tasks
            </span>
          </div>

          {/* Description section (if exists) */}
          {task.description && (
            <div className="mt-3 rounded-md bg-google-gray-50 px-4 py-3">
              <p className="text-[14px] leading-5 text-google-gray-700">
                {task.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-google-gray-200 px-6 py-3">
          <button
            onClick={onMarkComplete}
            disabled={task.completed}
            className={cn(
              "rounded px-4 py-2 text-[14px] font-medium transition-colors",
              task.completed
                ? "cursor-not-allowed text-google-gray-400"
                : "text-google-blue-600 hover:bg-google-blue-50",
            )}
            aria-label={
              task.completed ? "Task already completed" : "Mark as completed"
            }
          >
            {task.completed ? "Completed" : "Mark completed"}
          </button>
        </div>
      </div>
    </div>
  );
}
