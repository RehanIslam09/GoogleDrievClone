import { pgTable, text, timestamp, serial, boolean } from 'drizzle-orm/pg-core';


// Events table schema
export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
});

// Tasks table schema
export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  completed: boolean('completed').default(false).notNull(),
});