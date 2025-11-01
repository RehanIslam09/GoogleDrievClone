import React from "react";
import { Clock, List, Calendar, Lock, Trash2, MoreVertical, X } from "lucide-react";
import dayjs from "dayjs";

interface HolidayEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  category: "Public" | "Observance" | "Regional";
}

interface HolidayEventCardProps {
  holiday: HolidayEvent;
  onClose: () => void;
  onDelete?: () => void;
  onOptions?: () => void;
}

export default function HolidayEventCard({
  holiday,
  onClose,
  onDelete,
  onOptions,
}: HolidayEventCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Public":
        return "bg-google-green-600";
      case "Observance":
        return "bg-google-blue-500";
      case "Regional":
        return "bg-orange-600";
      default:
        return "bg-google-green-600";
    }
  };

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
        aria-labelledby="holiday-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-google-gray-200 px-6 pb-3 pt-5">
          <div className="flex flex-1 items-start gap-3 pr-4">
            <div
              className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-sm ${getCategoryColor(holiday.category)}`}
            />
            <h2
              id="holiday-title"
              className="flex-1 text-[22px] font-normal leading-7 text-google-gray-800"
            >
              {holiday.name}
            </h2>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={onDelete}
              className="rounded-full p-2 text-google-gray-600 transition-colors hover:bg-google-gray-100"
              aria-label="Delete holiday"
              title="Delete"
            >
              <Trash2 className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={onOptions}
              className="rounded-full p-2 text-google-gray-600 transition-colors hover:bg-google-gray-100"
              aria-label="More options"
              title="More options"
            >
              <MoreVertical className="h-[18px] w-[18px]" />
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
        <div className="space-y-3 px-6 pb-5 pt-4">
          {/* Date section */}
          <div className="flex items-center gap-4 py-1">
            <Clock className="h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <span className="text-[14px] leading-5 text-google-gray-700">
              {dayjs(holiday.date).format("dddd, MMMM D, YYYY")}
            </span>
          </div>

          {/* Description section */}
          <div className="flex items-start gap-4 py-1">
            <List className="mt-0.5 h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <p className="text-[14px] leading-5 text-google-gray-700">
              {holiday.description}
            </p>
          </div>

          {/* Calendar name section */}
          <div className="flex items-center gap-4 py-1">
            <Calendar className="h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <span className="text-[14px] leading-5 text-google-gray-700">
              Holidays in India
            </span>
          </div>

          {/* Visibility section */}
          <div className="flex items-center gap-4 py-1">
            <Lock className="h-5 w-5 flex-shrink-0 text-google-gray-600" />
            <span className="text-[14px] leading-5 text-google-gray-700">
              {holiday.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
