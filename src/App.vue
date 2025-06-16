<script setup>

  import { ref } from 'vue';

  import Header from './components/Header.vue';
  import TaskInputContainer from './components/TaskInputContainer.vue';


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
  <div class="todo-list-container">
    <ul class="todo-list">
      <li class="todo-item">
        <span class="todo-item-text">Todo item</span>
        <div class="todo-actions">
          <button class="action-button">edit</button>
          <button class="action-button">delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .todo-list-container{
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 15px;
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    max-height: 600px;
    overflow-y: scroll;
  }
  .todo-list-container::-webkit-scrollbar{
    display: none;
  }
  .todo-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .todo-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    backdrop-filter: blur(10px);
    border-radius: 15px;
  }
  .todo-item-text{
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .todo-actions{
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
  .action-button{
    padding: 10px 13px;
    background:#552275c0 ;
    opacity: 0.9;
    color: white;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 10px rgba(255, 255, 255, 0.2);
  }
  .action-button:active {
    transform: scale(0.99);
  }
</style>