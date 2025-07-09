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
  const store = useTodoListStore();

  // set state on onMounted
  onMounted(() => {
    setTasksState();
  });

  // set tasks state
  async function setTasksState(){
    await store.readTodos();
  }

  // add new todo by calling api endpoint
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await store.addTodo(newTask);
    if(response) {
      showNotification("Task Added Successfully");
    }
  }

  // delete todo by calling api endpoint
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await util.deleteData(id);
    if(response) {
      store.tasks = store.tasks?.filter(task => task.id !== response.id);
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