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

  // defininig store variables
  const store = useTodoListStore();
  const { tasks } = storeToRefs(store);

  // fetching data
  onMounted(async () => {
    const response =  await util.fetchDataFromApi('https://dummyjson.com/todos');
      if(response) {
        const todos = response.todos;
        tasks.value = todos;
    }
  });

  // add todo
  const addTaskToArray = (newTask: string) => {
    store.addTodo(newTask);
    showNotification("Task Added Successfully");
  }

  // delete todo
  const deleteTaskFromArray = (id: number) => {
    store.deleteTodo(id);
    showNotification('Task Deleted Succesfully');
  }

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="tasks"
    @delete-task="deleteTaskFromArray"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>