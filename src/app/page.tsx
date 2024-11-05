import { authUser } from "@/actions/user-actions"
import Todos from "@/components/todos"
import { currentUser } from "@clerk/nextjs/server"

export default async function Home() {
	const user = await currentUser()

	if (!user) return
	const fetchData = await authUser(user?.id)

	return (
		<main className="flex items-center justify-between">
			<Todos todos={fetchData[0].todos} user={fetchData[0]} />
		</main>
	)
}
