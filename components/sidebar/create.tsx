"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";

const menuItems = [
  { id: "event", label: "Event" },
  { id: "task", label: "Task" },
  { id: "out-of-office", label: "Out of office" },
  { id: "focus-time", label: "Focus time" },
  { id: "working-location", label: "Working location" },
  { id: "appointment-schedule", label: "Appointment schedule" },
];

export default function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleMenuItemClick = (itemId: string) => {
    console.log(`Creating: ${itemId}`);
    setIsOpen(false);
    // Add logic for each menu item here
  };

  return (
    <div className="relative mb-5 px-2" ref={dropdownRef}>
      {/* Google Calendar Style Create Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-[14px] font-medium text-[#3c4043] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all duration-150 hover:bg-[#fafafb] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] focus:outline-none"
      >
        <Plus className="h-5 w-5 text-[#3c4043]" />
        <span>Create</span>
        <ChevronDown className="h-4 w-4 text-[#3c4043]" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-2 top-full z-50 mt-2 w-56 rounded-2xl border border-[#dadce0] bg-white py-2 shadow-[0_2px_6px_rgba(60,64,67,0.3),0_1px_2px_rgba(60,64,67,0.15)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="block w-full px-6 py-3 text-left text-[14px] text-[#3c4043] transition-colors hover:bg-[#f1f3f4]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
