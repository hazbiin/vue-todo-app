<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import { useTodoListStore } from '@/stores/useTodoListStore';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import CustomButton from '@/components/CustomButton.vue';

  import useNotification from '@/composables/useNotification';

  import type { ChangedTodoType } from '@/types';

  // composable imports
  const { notificationMessages, showNotification } = useNotification();

  // store variable 
  const todosStore = useTodoListStore();

  // reactive variables 
  const isDirty = ref<boolean>(false);
  const changedTodos = ref<ChangedTodoType[]>([]);

  // updating state on onMounted
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
    const index = changedTodos.value.findIndex(todo => todo.id === id);
    if(index === -1) {
      changedTodos.value.push({id: id, isChecked : checked});
    }else {
      changedTodos.value.splice(index, 1);
    }

    if(changedTodos.value.length > 0) {
      isDirty.value = true;
    }else {
      isDirty.value = false;
    }
  }

  // handle api call if dirty
  const handleSaveChanges = async(): Promise<void> => {
    for(const todo of changedTodos.value) {
      const response = await todosStore.toggleCompleted(todo.id, todo.isChecked);
      if(response) {
        isDirty.value = false;
      }
    }
    setTasksState();
    changedTodos.value = [];
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