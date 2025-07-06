<script setup lang="ts">
  import { ref, onMounted, watch} from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import type { TaskType } from '@/types';
  import * as util from '@/utils';

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  //reactive variables
  const tasks = ref<TaskType[] | undefined>([]);
  onMounted(async () => {
    const response = await getInitialData();
    if(response) {
      tasks.value = response;
    }
  });

  // fetching data if not present in localStorage
  async function getInitialData():Promise<TaskType[] | undefined>{
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      return JSON.parse(savedTasks);
    }else {
      const response = await util.getTodos();
      if(response) {
        return response;
      }
    }
  }

  // add new todo by calling api endpoint
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await util.addData(newTask);
    if(response) {
      tasks.value?.push(response);
      showNotification("Task Added Successfully");
    }
  }

  // delete todo by calling api endpoint
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await util.deleteData(id);
    if(response) {
      tasks.value = tasks.value?.filter(task => task.id !== response.id);
      showNotification('Task Deleted Succesfully');
    }
  }

  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks: TaskType[] | undefined) => {
    if(updatedTasks) {
      util.setLocalStorage('tasks', updatedTasks);
    }
  }, { deep: true });

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="tasks"
    @delete-task="getTaskToDelete"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>