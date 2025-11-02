"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
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

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // --- option handlers ---
  const handleEventClick = () => {
    setIsOpen(false);
    onEventClick?.(); // opens Event modal
  };

  const handleTaskClick = () => {
    setIsOpen(false);
    onTaskClick?.(); // opens Task modal
  };

  const handleAppointmentClick = () => {
    setIsOpen(false);
    onAppointmentClick?.(); // opens Appointment modal
  };

  return (
    <div className="create-button-wrapper">
      {/* Create Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="create-button"
      >
        <Plus
          className="create-button-icon"
          strokeWidth={2.5}
        />
        <span>Create</span>
        <svg
          className={`create-button-chevron ${isOpen ? "create-button-chevron-open" : "create-button-chevron-closed"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="create-button-dropdown"
          >
            <button
              onClick={handleEventClick}
              className="create-button-dropdown-item"
            >
              Event
            </button>
            <button
              onClick={handleTaskClick}
              className="create-button-dropdown-item"
            >
              Task
            </button>
            <button
              onClick={handleAppointmentClick}
              className="create-button-dropdown-item"
            >
              Appointment schedule
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
