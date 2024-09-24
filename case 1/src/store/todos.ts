import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import generateId from '../lib/generateId';

export type TodoItem = {
  id: number;
  text: string;
  isDone: boolean;
}

export const useTodosStore = defineStore('todos', () => {
  const localStorageData = localStorage.getItem('todos')
  const data: [] = typeof localStorageData === 'string' ? JSON.parse(localStorageData) : []
  const todos = ref<TodoItem[]>(data)

  watch(todos, () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }, { deep: true })

  const addTodo = (todo: TodoItem) => {
    todos.value.unshift(todo)
  }
  const deleteTodo = (id: number) => {
    const indexTodo = todos.value.findIndex(({ id: todoId }) => id === todoId)
    todos.value.splice(indexTodo, 1)
  }
  const createNewTodo = (text: string): TodoItem => ({
    id: generateId(),
    text,
    isDone: false,
  })
  const renameTodo = (id: number, newText: string) => {
    const indexTodo = todos.value.findIndex((todo) => todo.id === id)
    todos.value[indexTodo].text = newText
  }
  const toggleDoneTodo = (id: number) => {
    const indexTodo = todos.value.findIndex((todo) => todo.id === id)
    todos.value[indexTodo].isDone = !todos.value[indexTodo].isDone
  }

  return { todos, addTodo, createNewTodo, deleteTodo, renameTodo, toggleDoneTodo }
})