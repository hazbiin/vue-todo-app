<script setup lang="ts">
  import { ref, onMounted, watch} from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import * as util from '@/utils';
  import { useTodoListStore } from '@/stores/useTodoListStore';
  import { storeToRefs } from 'pinia';


  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  // defininig store variable
  const store = useTodoListStore();
  const { tasks } = storeToRefs(store);

  // fetching data if not present in localStorage
  onMounted(async () => {
    const response =  await util.fetchDataFromApi('https://dummyjson.com/todos');
      if(response) {
        const todos = response.todos;
        tasks.value = todos;
    }
  });

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
      tasks.value.push(response);
      showNotification("Task Added Successfully");
    }
  }

  // delete todo by calling api endpoint
  const getTaskToDelete = async (id: number): Promise<void>  => {
    const response = await util.fetchDataFromApi(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    });
    if(response) {
      tasks.value = tasks.value.filter(t => t.id !== response.id);
      showNotification('Task Deleted Succesfully');
    }
  }

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