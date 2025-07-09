<script setup lang="ts">
  import { onMounted } from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import * as util from '@/utils';
  import { useTodoListStore } from '@/stores/useTodoListStore';

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

  // delete todo by calling api endpoint
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await util.deleteData(id);
    if(response) {
      todosStore.tasks = todosStore.tasks?.filter(task => task.id !== response.id);
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