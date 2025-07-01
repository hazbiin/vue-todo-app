<script setup lang="ts">
  import { ref, onMounted, watch} from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import * as util from '@/utils';
import { convertToObject } from 'typescript';

  // defined types
  type TaskObj = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  //reactive variables
  const tasks = ref<TaskObj[] | undefined>([]);

  onMounted(async () => {
    const response = await getInitialData();
    if(response !== undefined) {
      tasks.value = response;
    }
  });

  // fetching data if not present in localStorage
  async function getInitialData():Promise<TaskObj[] | undefined>{
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      return JSON.parse(savedTasks);
    }else {
      const response = await util.fetchDataFromApi('https://dummyjson.com/todos');
      if(response) {
        const todos = response.todos;
        return todos;
      }
    }
  }

  // add new todo by calling api endpoint
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await util.fetchDataFromApi('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: newTask,
        completed: false,
        userId: 5
      })
    });
    if(response) {
      tasks.value?.push(response);
      showNotification("Task Added Successfully");
    }
  }

  // delete todo by calling api endpoint
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await util.fetchDataFromApi(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    });
    if(response) {
      tasks.value = tasks.value?.filter(t => t.id !== response.id);
      showNotification('Task Deleted Succesfully');
    }
  }

  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks: TaskObj[]) => {
    util.setLocalStorage('tasks', updatedTasks);
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