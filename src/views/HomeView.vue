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
  const todosStore = useTodoListStore();

  // set state on onMounted
  onMounted(() => {
    setTasksState();
  });

  // set tasks state
  async function setTasksState(){
    await todosStore.readTodos();
  }

  // add new todo by calling api endpoint
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await todosStore.addTodo(newTask);
    if(response) {
      showNotification("Task Added Successfully");
    }
  }

  // delete todo
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await todosStore.deleteTodo(id);
    if(response) {
      showNotification('Task Deleted Succesfully');
    }
  }

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="todosStore.tasks"
    @delete-task="getTaskToDelete"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>