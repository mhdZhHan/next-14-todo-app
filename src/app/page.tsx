import { getData } from "@/actions/todo-actions"
import Todos from "@/components/todos"

export default async function Home() {
	const data = await getData()

	return (
		<main className="flex items-center justify-between">
			<Todos todos={data} />
		</main>
	)
}
