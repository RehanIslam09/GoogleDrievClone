"use client";

import React from "react";
import {
  Lightbulb,
  CheckCircle,
  User,
  MapPin,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LeftSidebar() {
  return (
    <div className="flex h-screen w-16 flex-col items-center justify-between bg-gray-50 py-4">
      {/* Top Section - Icons */}
      <div className="flex flex-col items-center gap-4">
        {/* Profile Avatar */}
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all duration-150 hover:ring-2 hover:ring-gray-300">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/profile.jpg" alt="Profile" />
            <AvatarFallback className="bg-blue-500 text-sm text-white">
              RI
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Keep/Ideas Icon */}
        <button className="flex cursor-pointer items-center justify-center rounded-full p-2.5 transition-all duration-150 hover:bg-gray-200">
          <Lightbulb className="h-5 w-5 text-gray-700" />
        </button>

        {/* Tasks Icon */}
        <button className="flex cursor-pointer items-center justify-center rounded-full p-2.5 transition-all duration-150 hover:bg-gray-200">
          <CheckCircle className="h-5 w-5 text-gray-700" />
        </button>

        {/* Contacts Icon */}
        <button className="flex cursor-pointer items-center justify-center rounded-full p-2.5 transition-all duration-150 hover:bg-gray-200">
          <User className="h-5 w-5 text-gray-700" />
        </button>

        {/* Maps Icon */}
        <button className="flex cursor-pointer items-center justify-center rounded-full p-2.5 transition-all duration-150 hover:bg-gray-200">
          <MapPin className="h-5 w-5 text-gray-700" />
        </button>

        {/* Divider */}
        <div className="my-2 w-8 border-t border-gray-200" />

        {/* Add/Create Button */}
        <button className="flex cursor-pointer items-center justify-center rounded-full p-2.5 transition-all duration-150 hover:bg-gray-200">
          <Plus className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Bottom Section - Collapse/Expand Chevron */}
      <button className="flex cursor-pointer items-center justify-center rounded-full p-2 shadow-sm transition-all duration-150 hover:bg-gray-100">
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
}
