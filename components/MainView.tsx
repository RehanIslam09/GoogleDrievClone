"use client";
import {
  CalendarEventType,
  CalendarTaskType,
  HolidayType,
  useDateStore,
  useEventStore,
  useTaskStore,
  useHolidayStore,
  useViewStore,
  useToggleSideBarStore,
  useTasksViewStore,
} from "@/lib/store";
import GoogleNavbar from "./google-navbar";
import GoogleSidebar from "./google-sidebar";
import GoogleCalendarGrid from "./google-calendar-grid";
import WeekView from "./week-view";
import DayView from "./day-view";
import YearView from "./year-view";
import ScheduleView from "./schedule-view";
import FourDaysView from "./four-days-view";
import TasksView from "./tasks-view";
import EventPopover from "./event-popover";
import { EventSummaryPopover } from "./event-summary-popover";
import TaskPopupCard from "./task-popup-card";
import HolidayEventCard from "./holiday-event-card";
import GoogleSidePanel from "./google-side-panel";
import { useEffect, useTransition } from "react";
import dayjs from "dayjs";
import {
  deleteTask,
  updateTaskCompletion,
} from "@/app/actions/task-actions";
import { cn } from "@/lib/utils";

export default function MainView({
  eventsData,
  tasksData,
  holidaysData,
}: {
  eventsData: CalendarEventType[];
  tasksData: CalendarTaskType[];
  holidaysData: HolidayType[];
}) {
  const { selectedView } = useViewStore();
  const { isSideBarOpen, setSideBarOpen } = useToggleSideBarStore();
  const { isTasksViewOpen } = useTasksViewStore();

  // Handle responsive sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSideBarOpen) {
        setSideBarOpen();
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSideBarOpen, setSideBarOpen]);

  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
    popoverMode,
  } = useEventStore();

  const {
    setTasks,
    isTaskSummaryOpen,
    closeTaskSummary,
    selectedTask,
  } = useTaskStore();

  const {
    setHolidays,
    isHolidayCardOpen,
    closeHolidayCard,
    selectedHoliday,
  } = useHolidayStore();

  const { userSelectedDate } = useDateStore();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const mappedEvents: CalendarEventType[] = eventsData.map((event) => ({
      id: event.id,
      date: dayjs(event.date),
      title: event.title,
      description: event.description,
    }));

    setEvents(mappedEvents);
  }, [eventsData, setEvents]);

  useEffect(() => {
    const mappedTasks: CalendarTaskType[] = tasksData.map((task) => ({
      id: task.id,
      date: dayjs(task.date),
      title: task.title,
      description: task.description,
      completed: task.completed,
    }));

    setTasks(mappedTasks);
  }, [tasksData, setTasks]);

  useEffect(() => {
    const mappedHolidays: HolidayType[] = holidaysData.map((holiday) => ({
      id: holiday.id,
      name: holiday.name,
      date: dayjs(holiday.date),
      description: holiday.description,
      category: holiday.category,
    }));

    setHolidays(mappedHolidays);
  }, [holidaysData, setHolidays]);

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    startTransition(async () => {
      try {
        await deleteTask(selectedTask.id);
        closeTaskSummary();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    });
  };

  const handleMarkComplete = async () => {
    if (!selectedTask || selectedTask.completed) return;

    startTransition(async () => {
      try {
        await updateTaskCompletion(selectedTask.id, true);
        closeTaskSummary();
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    });
  };

  return (
    <div className="main-view-container">
      {/* Top Navbar */}
      <GoogleNavbar />

      {/* Main Content Area */}
      {isTasksViewOpen ? (
        <TasksView />
      ) : (
        <div className="main-view-content">
          {/* Mobile Overlay */}
          {isSideBarOpen && (
            <div
              className="main-view-mobile-overlay"
              onClick={setSideBarOpen}
            />
          )}

          {/* Sidebar - Collapsible */}
          <div
            className={cn(
              "main-view-sidebar-wrapper",
              isSideBarOpen ? "main-view-sidebar-open" : "main-view-sidebar-closed"
            )}
          >
            <GoogleSidebar />
          </div>

          {/* Calendar View */}
          <div className="main-view-calendar">
            {selectedView === "month" && <GoogleCalendarGrid />}
            {selectedView === "week" && <WeekView />}
            {selectedView === "day" && <DayView />}
            {selectedView === "year" && <YearView />}
            {selectedView === "schedule" && <ScheduleView />}
            {selectedView === "4days" && <FourDaysView />}
          </div>
        </div>
      )}

      {/* Modals/Popups */}
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
          initialMode={popoverMode}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummaryPopover
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )}

      {isTaskSummaryOpen && selectedTask && (
        <TaskPopupCard
          task={selectedTask}
          onClose={closeTaskSummary}
          onDelete={handleDeleteTask}
          onMarkComplete={handleMarkComplete}
        />
      )}

      {isHolidayCardOpen && selectedHoliday && (
        <HolidayEventCard
          holiday={{
            id: selectedHoliday.id,
            name: selectedHoliday.name,
            date: selectedHoliday.date.format("YYYY-MM-DD"),
            description: selectedHoliday.description,
            category: selectedHoliday.category,
          }}
          onClose={closeHolidayCard}
        />
      )}

      {/* Google Side Panel */}
      <GoogleSidePanel />
    </div>
  );
}
