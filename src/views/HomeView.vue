<script setup lang="ts">
  import { ref, onMounted, watch} from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import * as util from '@/utils';

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
  const tasks = ref<TaskObj[]>([]);

  // fetching data if not present in localStorage
  onMounted(async () => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }else {
      const fetchedData =  await util.fetchDataFromApi('https://dummyjson.com/todos');
      const todos = fetchedData.todos;
      tasks.value = todos;
    }
  });

  // add new todo by calling api endpoint
  const addTaskToArray = async (newTask: string) => {
    const response = await util.fetchDataFromApi('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: newTask,
        completed: false,
        userId: 5
      })
    });
    tasks.value.push(response);
    showNotification("Task Added Successfully");
  }

  // delete-task emit handler
  const getTaskToDelete = (index: number): void => {
    tasks.value.splice(index, 1);
    showNotification('Task Deleted Successfully');
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