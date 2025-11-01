"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Calendar, CheckSquare, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateButtonProps {
  onEventClick?: () => void;
  onTaskClick?: () => void;
  onAppointmentClick?: () => void;
}

export default function CreateButton({
  onEventClick,
  onTaskClick,
  onAppointmentClick,
}: CreateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEventClick = () => {
    console.log("Event clicked");
    onEventClick?.();
    setIsOpen(false);
  };

  const handleTaskClick = () => {
    console.log("Task clicked");
    onTaskClick?.();
    setIsOpen(false);
  };

  const handleAppointmentClick = () => {
    console.log("Appointment schedule clicked");
    onAppointmentClick?.();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Create Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-3 rounded-[28px] border border-gray-200 bg-white px-6 py-3 text-[14px] font-medium text-[#3c4043] shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none"
      >
        <Plus className="h-5 w-5 font-semibold" strokeWidth={2.5} />
        <span>Create</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            {/* Event Option */}
            <button
              onClick={handleEventClick}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-[14px] text-[#3c4043] transition-colors hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
            >
              <Calendar className="h-5 w-5 text-[#5f6368]" />
              <span>Event</span>
            </button>

            {/* Task Option */}
            <button
              onClick={handleTaskClick}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-[14px] text-[#3c4043] transition-colors hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
            >
              <CheckSquare className="h-5 w-5 text-[#5f6368]" />
              <span>Task</span>
            </button>

            {/* Appointment Schedule Option */}
            <button
              onClick={handleAppointmentClick}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-[14px] text-[#3c4043] transition-colors hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
            >
              <Clock className="h-5 w-5 text-[#5f6368]" />
              <span>Appointment schedule</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
