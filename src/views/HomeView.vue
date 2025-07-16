<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import { useTodoListStore } from '@/stores/useTodoListStore';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import CustomButton from '@/components/CustomButton.vue';

  import useNotification from '@/composables/useNotification';

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  // store variable 
  const todosStore = useTodoListStore();

  // reactive variables 
  const isDirty = ref<boolean>(true);

  onMounted(() => {
    setTasksState();
  });
  async function setTasksState() {
    await todosStore.readTodos();
  }

  // add new todo
  const addTaskToArray = async (newTask: string): Promise<void> => {
    const response = await todosStore.addTodo(newTask);
    if(response) {
      setTasksState();
      showNotification("Task Added Successfully");
    }
  }

  // delete todo
  const getTaskToDelete = async (id: string): Promise<void>  => {
    const response = await todosStore.deleteTodo(id);
    if(response) {
      setTasksState();
      showNotification('Task Deleted Succesfully');
    }
  }

  //toggle completed state of todo
  const handleToggleCompleted = (id: string, checked: boolean): void => {
    // need to implement toggle logic here
  }

  // handle api call if dirty
  const handleSaveChanges = () => {
    // neet to make api call here
  }

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="todosStore.tasks"
    @delete-task="getTaskToDelete"
    @toggle-completed="handleToggleCompleted"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
  <CustomButton :isDisabled="isDirty" @button-click="handleSaveChanges">Save Changes</CustomButton>
</template>