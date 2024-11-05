"user server"

import { db } from "@/lib/db/drizzle"
import { users } from "@/lib/db/schema"

export const getAllUsers = async () => {
	const data = await db.select().from(users)
	return data
}

export const getCurrentUser = async (userId: number) => {
	const user = await db.query.users.findMany({
		where: (users, { eq }) => eq(users.id, userId),
		with: { todos: true },
	})

	return user
}

export const addUser = async () => {
	await db.insert(users).values({
		name: "Test user",
		email: "hello@example.com",
	})
}
