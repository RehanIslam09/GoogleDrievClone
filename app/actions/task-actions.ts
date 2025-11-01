'use server'

import { db } from "@/db/drizzle";
import { tasksTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";


export async function createTask(formData: FormData): Promise<{ error: string } | { success: boolean }> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const date = formData.get('date') as string;

  if (!title || !date) {
    return { error: 'Title and date are required' };
  }

  const dateTime = new Date(date);

  try {
    await db.insert(tasksTable).values({
      title,
      description: description || '',
      date: dateTime,
      completed: false,
    });

    // Revalidate the path and return a success response
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error('Error creating task:', error);
    return { error: 'Failed to create task' };
  }
}

export async function deleteTask(taskId: string): Promise<{ error: string } | { success: boolean }> {
  try {
    await db.delete(tasksTable).where(eq(tasksTable.id, parseInt(taskId)));

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { error: 'Failed to delete task' };
  }
}

export async function updateTaskCompletion(
  taskId: string,
  completed: boolean
): Promise<{ error: string } | { success: boolean }> {
  try {
    await db
      .update(tasksTable)
      .set({ completed })
      .where(eq(tasksTable.id, parseInt(taskId)));

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error('Error updating task:', error);
    return { error: 'Failed to update task' };
  }
}
