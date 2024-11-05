import { relations } from "drizzle-orm"
import {
	integer,
	text,
	boolean,
	pgTable,
	serial,
	timestamp,
	bigint,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	clerkId: text("clerk_id").notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	profileImg: text("profile_img").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const todos = pgTable("todos", {
	id: bigint("id", { mode: "number" }).primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	text: text("text").notNull(),
	done: boolean("done").default(false).notNull(),
})

export const todosRelations = relations(todos, ({ one }) => ({
	user: one(users, { fields: [todos.userId], references: [users.id] }),
}))

export const usersRelations = relations(users, ({ many }) => ({
	todos: many(todos),
}))
