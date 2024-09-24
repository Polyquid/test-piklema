<script setup lang="ts">
  import { ref } from 'vue'
  import { useTodosStore } from '../store/todos'

  const taskText = ref('')
  const { addTodo, createNewTodo } = useTodosStore()
  const handleSubmit = (e: Event) => {
    const formElem = e.currentTarget

    if (!(formElem instanceof HTMLFormElement)) {
      throw new Error('Element is not form')
    }

    const form = new FormData(formElem)
    const todoText = form.get('todo')

    if (typeof todoText !== 'string') {
      throw new Error('Input value must be string')
    }

    const newTodo = createNewTodo(todoText)
    addTodo(newTodo)
    taskText.value = ''
  }
</script>

<template>
  <div class="header">
    <h1>Todo app</h1>
    <p class="info">
      Double click: rename todo
    </p>
    <form
      class="todo-form"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="taskText"
        type="text"
        name="todo"
        placeholder="What need to be done?"
      >
      <button
        type="submit"
        :disabled="taskText.length === 0"
      >
        +
      </button>
    </form>
  </div>
</template>

<style scoped>
  h1 {
    margin: 10px auto;
  }
  .info {
    font-size: 10px;
  }
  .header {
    margin: 0 auto;
  }
</style>