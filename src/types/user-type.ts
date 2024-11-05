import { todoType } from "./todo-type"

export type userType = {
	id?: number
	email: string
	clerkId: string
	username: string
	firstName: string
	lastName?: string | null
	profileImg: string
	createdAt?: Date
	updatedAt?: Date
	todos?: todoType[]
}
