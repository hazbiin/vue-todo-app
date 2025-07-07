<script setup lang="ts">
  import { onMounted } from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import { useTodoListStore } from '@/stores/useTodoListStore';

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  // store variable 
  const store = useTodoListStore();

  onMounted(async () => {
    await store.readTodos();
  });

  // add new todo
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await store.addTodo(newTask);
    if(response) {
      store.readTodos();
      showNotification("Task Added Successfully");
    }
  }

  // delete todo
  const getTaskToDelete = async (id: string): Promise<void>  => {
    const response = await store.deleteTodo(id);
    if(response) {
      store.readTodos();
      showNotification('Task Deleted Succesfully');
    }
  }

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="store.tasks"
    @delete-task="getTaskToDelete"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>