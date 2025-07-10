<script setup lang="ts">
  import { onMounted } from 'vue';

  import { useTodoListStore } from '@/stores/useTodoListStore';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';

  import useNotification from '@/composables/useNotification';

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  // store variable 
  const tasksStore = useTodoListStore();

  onMounted(async () => {
    await tasksStore.readTodos();
  });

  // add new todo
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await tasksStore.addTodo(newTask);
    if(response) {
      tasksStore.readTodos();
      showNotification("Task Added Successfully");
    }
  }

  // delete todo
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await tasksStore.deleteTodo(id);
    if(response) {
      showNotification('Task Deleted Succesfully');
    }
  }

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="tasksStore.tasks"
    @delete-task="getTaskToDelete"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>