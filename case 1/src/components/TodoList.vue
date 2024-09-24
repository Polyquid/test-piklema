<script setup lang="ts">
  import { useTodosStore } from '../store/todos'
  import TodoItem from './TodoItem.vue'

  const { todos } = useTodosStore()
</script>

<template>
  <div class="wrapper">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px auto 0;
    max-width: 50%;
  }

  @media (max-width: 900px) {
    .wrapper {
      max-width: 80%;
    }
  }
</style>