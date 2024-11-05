"use server"
import { eq, not } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db/drizzle"
import { todos } from "./../lib/db/schema"

export const getData = async (userId: number) => {
	const data = await db.select().from(todos).where(eq(todos?.userId, userId))
	return data
}

export const addTodo = async (id: number, text: string, userId: number) => {
	await db.insert(todos).values({
		id: id,
		text: text,
		userId: userId,
	})
}

export const deleteTodo = async (id: number) => {
	await db.delete(todos).where(eq(todos.id, id))

	revalidatePath("/")
}

export const toggleTodo = async (id: number) => {
	await db
		.update(todos)
		.set({
			done: not(todos.done),
		})
		.where(eq(todos.id, id))

	revalidatePath("/")
}

export const editTodo = async (id: number, text: string) => {
	await db
		.update(todos)
		.set({
			text: text,
		})
		.where(eq(todos.id, id))

	revalidatePath("/")
}
