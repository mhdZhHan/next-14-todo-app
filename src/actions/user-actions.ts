"user server"

import { db } from "@/lib/db/drizzle"
import { users } from "@/lib/db/schema"
import { userType } from "@/types/user-type"

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

export const addUser = async (user: userType) => {
	await db.insert(users).values({
		username: user?.username,
		firstName: user?.firstName,
		lastName: user?.lastName,
		email: user?.email,
		profileImg: user?.profileImg,
		clerkId: user?.clerkId,
	})
}
