import { CalendarTaskType, useTaskStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";

type TaskRendererProps = {
  date: dayjs.Dayjs;
  view: "month" | "week" | "day";
  tasks: CalendarTaskType[];
};

export function TaskRenderer({ date, view, tasks }: TaskRendererProps) {
  const { openTaskSummary } = useTaskStore();

  const filteredTasks = tasks.filter((task: CalendarTaskType) => {
    if (view === "month") {
      return task.date.format("DD-MM-YY") === date.format("DD-MM-YY");
    } else if (view === "week" || view === "day") {
      return task.date.format("DD-MM-YY HH") === date.format("DD-MM-YY HH");
    }
  });

  return (
    <>
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          onClick={(e) => {
            e.stopPropagation();
            openTaskSummary(task);
          }}
          className={cn(
            "flex w-[90%] cursor-pointer items-center gap-1.5 rounded-sm border border-blue-400 bg-blue-50 p-1 text-sm text-blue-900 hover:bg-blue-100",
            task.completed && "opacity-60",
          )}
        >
          <div
            className={cn(
              "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border-2 border-blue-500",
              task.completed && "bg-blue-500",
            )}
          >
            {task.completed && (
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
          <span className={cn("line-clamp-1", task.completed && "line-through")}>
            {task.title}
          </span>
        </div>
      ))}
    </>
  );
}
