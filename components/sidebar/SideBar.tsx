import { cn } from "@/lib/utils";
import React from "react";
import Create from "./create";
import SideBarCalendar from "./side-bar-calendar";
import SearchUsers from "./search-users";
import BookingPages from "./booking-pages";
import TimeInsights from "./time-insights";
import MyCalendars from "./my-calendars";
import { useToggleSideBarStore } from "@/lib/store";

export default function SideBar() {
  const { isSideBarOpen } = useToggleSideBarStore();
  return (
    <aside
      className={cn(
        "hidden w-[280px] overflow-y-auto border-r border-[#e8eaed] bg-white py-2 transition-all duration-300 ease-in-out lg:block",
        !isSideBarOpen && "lg:hidden",
      )}
    >
      <Create />
      <SideBarCalendar />
      <SearchUsers />
      <BookingPages />
      <TimeInsights />
      <MyCalendars />
    </aside>
  );
}
