<script setup>
  import { ref } from 'vue';

  const tasks = ref([]);
  const newTask = ref();

  const addTask = () => {
    if(newTask.value !== "") {
      tasks.value.push(newTask.value);
      newTask.value = '';
    }
  }
</script>


<template>
  <div class="container">
    <div class="head-section">
      <h1>Todo List!</h1>
    </div>
    <div class="task-input-section">
      <input placeholder="add task..." type="text" v-model="newTask"/>
      <button @click="addTask"> + Add Task</button>
    </div>
    <div class="task-list-section">
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          <span>{{ task }}</span>
          <button>Edit</button>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>
