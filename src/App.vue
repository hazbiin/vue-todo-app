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

  const deleteTask = (index) => {
    tasks.value.splice(index, 1);
  }

</script>


<template>
  <div class="container">
    <div class="header">
      <h1>Todo App</h1>
      <p>stay productive, stay organized!</p>
    </div>
    <div class="add-task-section">
      <div class="input-wrapper">
        <input type="text" placeholder="add task.." class="task-input" v-model="newTask">
      </div>
      <button class="add-btn" @click="addTask"> Add new task</button>
    </div>
    <div class="todo-list-section">
      <!-- <div class="empty-list">
        <h3>No tasks found!</h3>
        <p>Add your first task to get started.</p>
      </div> -->
      <ul>
        <li class="todo-item" v-for="(task, index) in tasks" :key="index">
            <div class="todo-content">
              <div class="todo-checkbox"></div>
              <div class="todo-text">{{ task }}</div>
            </div>
            <div class="todo-actions">
              <button>edit</button>
              <button v-on:click="() => deleteTask(index)">delete</button>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .header{
    text-align: center;
    margin-bottom: 40px;
  }
  .header h1{
    margin-bottom: 10px;
  }
  .add-task-section{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 20px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  .input-wrapper{
    flex: 1;
  }
  .task-input{
    width: 100%;
    padding: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    backdrop-filter: blur(10px);
    font-size: 16px;
  }
  .task-input::placeholder {
    color: #fff;
    font-size: 16px;
  }
  .add-btn{
    width: 100%;
    padding: 14px 32px;
    background: linear-gradient(45deg, #e0cf6fc0, #ff8e53);
    /* background: #ffe96bc7; */
    color: white;
    border: none;
    outline: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
    box-shadow: 0 4px 15px rgba(228, 216, 216, 0.4);
    white-space: nowrap;
  }
  .todo-list-section{
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .empty-list{
    text-align: center;
    padding: 180px 20px;
    color: rgba(255, 255, 255, 0.8);
  }
  .empty-list h3{
    font-size: 30px;
    margin-bottom: 20px;
  }
  .empty-list p{
    font-size: 18px;
    font-weight: bold;
  }

  /* /////////////////todo item/////////////// */
  .todo-item{
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border-bottom:1px solid rgba(255, 255, 255, 0.5);
  }
  .todo-item:last-child{
    border-bottom: unset;
  }
  .todo-content{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .todo-checkbox{
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }


  @media (min-width: 768px) {
    .add-task-section {
      flex-direction: row;
    }
    .add-btn{
      width: unset;
    }
  }

</style>