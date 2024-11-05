import { getData } from "@/actions/todo-actions"
import { getAllUsers } from "@/actions/user-actions"
import Todos from "@/components/todos"

export default async function Home() {
	const users = await getAllUsers()
	const data = await getData(users[0]?.id)

	console.log(users)

	return (
		<main className="flex items-center justify-between">
			<Todos todos={data} user={users[0]} />
			<h1>HELLO</h1>
		</main>
	)
}
