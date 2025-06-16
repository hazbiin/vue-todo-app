<script setup>

  import { ref, onMounted, watch} from 'vue';

  import Header from './components/Header.vue';
  import TaskInputContainer from './components/TaskInputContainer.vue';
  import TodoListContainer from './components/TodoListContainer.vue';

  // tasks reactive variable
  const tasks = ref([]);


  // get the savedTasks from localStorage at onMounted lifecycle hook.
  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  });

  
  // add task to tasks array
  const addTaskToArray = (newtask) => {
    const newTask = {
      taskId: Date.now(),
      taskName: newtask,
      isEditMode: false
    }
    tasks.value.push(newTask);
  }


  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, { deep: true });

</script>


<template>
  <Header/>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer :tasks="tasks"/>
</template>