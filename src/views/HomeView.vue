<script setup lang="ts">
  import { ref, onMounted, watch} from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import setLocalStorage from '@/utilities';

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

  onMounted(async() => {
    try{
      const response = await fetch('https://dummyjson.com/todos');
      const data = await response.json();
      tasks.value = data.todos;
    }catch(error) {
      console.log('Error fetching tasks', error);
    }
  });

  // add task to tasks array
  const addTaskToArray = (newtask:string ): void => {
    const newTask: TaskObj = {
      id: Date.now(),
      todo: newtask,
      completed: false,
      userId: Date.now()
    }
    tasks.value.push(newTask);
    showNotification('Task Added Successfully');
  }

  // delete-task emit handler
  const getTaskToDelete = (index: number): void => {
    tasks.value.splice(index, 1);
    showNotification('Task Deleted Successfully');
  }

  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks: TaskObj[]) => {
    setLocalStorage('tasks', updatedTasks);
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