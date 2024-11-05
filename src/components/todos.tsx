"use client"
import { FC, useState } from "react"
import { todoType } from "@/types/todo-type"
import { userType } from "@/types/user-type"
import Todo from "./todo"
import AddTodo from "./add-todo"
import {
	addTodo,
	deleteTodo,
	editTodo,
	toggleTodo,
} from "@/actions/todo-actions"

interface Props {
	todos: todoType[]
	user: userType
}

const Todos: FC<Props> = ({ todos, user }) => {
	const [todoItems, setTodoItems] = useState<todoType[]>(todos)

	const createTodo = (text: string) => {
		const id = (todoItems.at(-1)?.id || 0) + 1
		addTodo(id, text, user?.id)
		setTodoItems((prev) => [
			...prev,
			{ id: id, text, done: false, userId: user?.id },
		])
	}

	const changeTodoText = (id: number, text: string) => {
		setTodoItems((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
		)
		editTodo(id, text)
	}

	const toggleIsTodoDone = (id: number) => {
		setTodoItems((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, done: !todo.done } : todo
			)
		)
		toggleTodo(id)
	}

	const deleteTodoItem = (id: number) => {
		setTodoItems((prev) => prev.filter((todo) => todo.id !== id))
		deleteTodo(id)
	}

	return (
		<main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
			<div className="text-5xl font-medium">To-do app</div>
			<div className="w-full flex flex-col mt-8 gap-2">
				{todoItems.map((todo) => (
					<Todo
						key={todo.id}
						todo={todo}
						changeTodoText={changeTodoText}
						toggleIsTodoDone={toggleIsTodoDone}
						deleteTodoItem={deleteTodoItem}
					/>
				))}
			</div>

			<AddTodo createTodo={createTodo} />
		</main>
	)
}

export default Todos
