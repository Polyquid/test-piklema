<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { TodoItem, useTodosStore } from '../store/todos'

  const props = defineProps<{ todo: TodoItem }>()
  const isEdit = ref(false)
  const { deleteTodo, renameTodo, toggleDoneTodo } = useTodosStore()
  const inputText = computed({
    get() {
      return props.todo.text
    },
    set(newText) {
      if (newText.length > 0) {
        renameTodo(props.todo.id, newText)
      }
    }
  })
  const isDone = computed({
    get() {
      return props.todo.isDone
    },
    set() {
      toggleDoneTodo(props.todo.id)
    }
  })
</script>

<template>
  <div class="todo">
    <input
      v-model="isDone"
      type="checkbox"
      true-value="true"
      false-value="false"
    >
    <input
      v-if="isEdit"
      v-model="inputText"
      class="field"
      type="text"
      @blur="isEdit = false"
    >
    <p
      v-else
      class="todo-text"
      :class="{ 'is-done': isDone }"
      @dblclick="isEdit = !isEdit"
    >
      {{ inputText }}
    </p>
    <button
      v-if="isEdit"
      @click="isEdit = false"
    >
      Готово
    </button>
    <button
      v-if="!isEdit"
      @click="() => deleteTodo(todo.id)"
    >
      Удалить
    </button>
  </div>
</template>

<style scoped>
  button {
    display: block;
    height: 20px;
  }
  .todo {
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
  }
  .field {
    margin: 16px auto;
    line-height: inherit;
  }
  .is-done {
    text-decoration: line-through;
    color: rgb(132, 132, 132)
  }
  .todo-text {
    width: 80%;
    cursor: pointer;
    word-wrap: break-word;
  }
</style>
