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
} from "@/lib/store";
import MonthView from "./month-view";
import SideBar from "./sidebar/SideBar";
import WeekView from "./week-view";
import DayView from "./day-view";
import EventPopover from "./event-popover";
import { EventSummaryPopover } from "./event-summary-popover";
import TaskPopupCard from "./task-popup-card";
import HolidayEventCard from "./holiday-event-card";
import { useEffect, useTransition } from "react";
import dayjs from "dayjs";
import {
  deleteTask,
  updateTaskCompletion,
} from "@/app/actions/task-actions";

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

  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
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
    <div className="flex">
      {/* SideBar */}
      <SideBar />

      <div className="w-full flex-1">
        {selectedView === "month" && <MonthView />}
        {selectedView === "week" && <WeekView />}
        {selectedView === "day" && <DayView />}
      </div>
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
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
    </div>
  );
}
