import MainView from "@/components/MainView";
import { db } from "@/db/drizzle";
import { CalendarEventType, CalendarTaskType, HolidayType } from "@/lib/store";
import dayjs from "dayjs";
import holidaysData from "@/data/indian-holidays-2025-2035.json";

const getEventsData = async () => {
  try {
    const data = await db.query.eventsTable.findMany();

    // Convert the Dayjs object to a simple ISO string
    return data.map((event) => ({
      ...event,
      date: dayjs(event.date).toISOString(), // Convert Dayjs to string
    }));
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return [];
  }
};

const getTasksData = async () => {
  try {
    const data = await db.query.tasksTable.findMany();

    // Convert the Dayjs object to a simple ISO string
    return data.map((task) => ({
      ...task,
      date: dayjs(task.date).toISOString(), // Convert Dayjs to string
    }));
  } catch (error) {
    console.error("Error fetching tasks from the database:", error);
    return [];
  }
};

const getHolidaysData = () => {
  return holidaysData.map((holiday) => ({
    ...holiday,
    date: holiday.date,
  }));
};

export default async function Home() {
  const dbEvents = await getEventsData();
  const dbTasks = await getTasksData();
  const holidays = getHolidaysData();

  return (
    <MainView
      eventsData={dbEvents as unknown as CalendarEventType[]}
      tasksData={dbTasks as unknown as CalendarTaskType[]}
      holidaysData={holidays as unknown as HolidayType[]}
    />
  );
}
