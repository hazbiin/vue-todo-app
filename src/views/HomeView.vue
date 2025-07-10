<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';
  import Button from '@/components/Button.vue';
  import { useTodoListStore } from '@/stores/useTodoListStore';

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  // store variable 
  const store = useTodoListStore();

  // reactive variable
  const isDisabled = ref(true);

  onMounted(async () => {
    await store.readTodos();
  });

  // add new todo
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await store.addTodo(newTask);
    if(response) {
      store.readTodos();
      showNotification("Task Added Successfully");
    }
  }

  // delete todo
  const getTaskToDelete = async (id: string): Promise<void>  => {
    const response = await store.deleteTodo(id);
    if(response) {
      store.readTodos();
      showNotification('Task Deleted Succesfully');
    }
  }

  // handle toggle completed
  const handleToggleCompleted = (id: string, checked: boolean) => {
    // need to implement dirty check here
  }

  //handle confirm checked state button
  const confirmCheckedState = () => {
    // need to implement dirty check here
  }

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="store.tasks"
    @delete-task="getTaskToDelete"
    @toggle-completed="handleToggleCompleted"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
  <Button :disabled="isDisabled" @confirm-checked-state="confirmCheckedState">Confirm check</Button>
</template>