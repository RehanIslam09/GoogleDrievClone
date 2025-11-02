import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getMonth } from "./getTime";

interface ViewStoreType {
  selectedView: string;
  setView: (value: string) => void;
}

interface DateStoreType {
  userSelectedDate: Dayjs;
  setDate: (value: Dayjs) => void;
  twoDMonthArray: dayjs.Dayjs[][];
  selectedMonthIndex: number;
  setMonth: (index: number) => void;
}

export type CalendarEventType = {
  id: string;
  title: string;
  date: dayjs.Dayjs;
  description: string;
};

export type CalendarTaskType = {
  id: string;
  title: string;
  date: dayjs.Dayjs;
  description?: string;
  completed: boolean;
};

export type HolidayType = {
  id: string;
  name: string;
  date: dayjs.Dayjs;
  description: string;
  category: "Public" | "Observance" | "Regional";
};

type EventStore = {
  events: CalendarEventType[];
  isPopoverOpen: boolean;
  isEventSummaryOpen: boolean;
  selectedEvent: CalendarEventType | null;
  popoverMode: "event" | "task" | "outofoffice" | "focustime" | "workinglocation" | "appointment";
  setEvents: (events: CalendarEventType[]) => void;
  openPopover: (mode?: "event" | "task" | "outofoffice" | "focustime" | "workinglocation" | "appointment") => void;
  closePopover: () => void;
  openEventSummary: (event: CalendarEventType) => void;
  closeEventSummary: () => void;
};

type TaskStore = {
  tasks: CalendarTaskType[];
  isTaskPopoverOpen: boolean;
  isTaskSummaryOpen: boolean;
  selectedTask: CalendarTaskType | null;
  setTasks: (tasks: CalendarTaskType[]) => void;
  openTaskPopover: () => void;
  closeTaskPopover: () => void;
  openTaskSummary: (task: CalendarTaskType) => void;
  closeTaskSummary: () => void;
};

type HolidayStore = {
  holidays: HolidayType[];
  isHolidayCardOpen: boolean;
  selectedHoliday: HolidayType | null;
  setHolidays: (holidays: HolidayType[]) => void;
  openHolidayCard: (holiday: HolidayType) => void;
  closeHolidayCard: () => void;
};

interface ToggleSideBarType {
  isSideBarOpen: boolean;
  setSideBarOpen: () => void;
}

interface TasksViewStoreType {
  isTasksViewOpen: boolean;
  setTasksViewOpen: (value: boolean) => void;
}

export const useViewStore = create<ViewStoreType>()(
  devtools(
    persist(
      (set) => ({
        selectedView: "month",
        setView: (value: string) => {
          set({ selectedView: value });
        },
      }),
      { name: "calendar_view", skipHydration: true },
    ),
  ),
);

export const useDateStore = create<DateStoreType>()(
  devtools(
    persist(
      (set) => ({
        userSelectedDate: dayjs(),
        twoDMonthArray: getMonth(),
        selectedMonthIndex: dayjs().month(),
        setDate: (value: Dayjs) => {
          set({ userSelectedDate: value });
        },
        setMonth: (index) => {
          set({ twoDMonthArray: getMonth(index), selectedMonthIndex: index });
        },
      }),
      { name: "date_data", skipHydration: true },
    ),
  ),
);

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  isPopoverOpen: false,
  isEventSummaryOpen: false,
  selectedEvent: null,
  popoverMode: "event",
  setEvents: (events) => set({ events }),
  openPopover: (mode = "event") => set({ isPopoverOpen: true, popoverMode: mode }),
  closePopover: () => set({ isPopoverOpen: false }),
  openEventSummary: (event) =>
    set({ isEventSummaryOpen: true, selectedEvent: event }),
  closeEventSummary: () =>
    set({ isEventSummaryOpen: false, selectedEvent: null }),
}));

export const useToggleSideBarStore = create<ToggleSideBarType>()(
  (set, get) => ({
    isSideBarOpen: true,
    setSideBarOpen: () => {
      set({ isSideBarOpen: !get().isSideBarOpen });
    },
  }),
);

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isTaskPopoverOpen: false,
  isTaskSummaryOpen: false,
  selectedTask: null,
  setTasks: (tasks) => set({ tasks }),
  openTaskPopover: () => set({ isTaskPopoverOpen: true }),
  closeTaskPopover: () => set({ isTaskPopoverOpen: false }),
  openTaskSummary: (task) =>
    set({ isTaskSummaryOpen: true, selectedTask: task }),
  closeTaskSummary: () =>
    set({ isTaskSummaryOpen: false, selectedTask: null }),
}));

export const useHolidayStore = create<HolidayStore>((set) => ({
  holidays: [],
  isHolidayCardOpen: false,
  selectedHoliday: null,
  setHolidays: (holidays) => set({ holidays }),
  openHolidayCard: (holiday) =>
    set({ isHolidayCardOpen: true, selectedHoliday: holiday }),
  closeHolidayCard: () =>
    set({ isHolidayCardOpen: false, selectedHoliday: null }),
}));

export const useTasksViewStore = create<TasksViewStoreType>()((set) => ({
  isTasksViewOpen: false,
  setTasksViewOpen: (value: boolean) => set({ isTasksViewOpen: value }),
}));
