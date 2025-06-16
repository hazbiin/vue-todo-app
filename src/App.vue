<script setup>

  import { ref } from 'vue';

  import Header from './components/Header.vue';
  import TaskInputContainer from './components/TaskInputContainer.vue';
  import TodoListContainer from './components/TodoListContainer.vue';


  // need to continue with the localstorage implemtation here
  const tasks = ref([]);
  const addTaskToArray = (newtask) => {
    const newTask = {
      taskId: Date.now(),
      taskName: newtask,
      isEditMode: false
    }

    tasks.value.push(newTask);
  }

</script>


<template>
  <Header/>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer :tasks="tasks"/>
</template>