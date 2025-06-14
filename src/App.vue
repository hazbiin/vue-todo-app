<script setup>
  import Header from './components/Header.vue';
</script>


<template>
  <Header/>
  <div class="add-task-container">
    <input class="task-input" type="text" placeholder="type here ...">
    <button class="add-task-button" >Add new task</button>
  </div>
  <div class="todo-list-container">
    <ul class="todo-list">
      <li class="todo-item">
        <span class="todo-item-text">Todo item</span>
        <div class="todo-actions">
          <button class="action-btn">edit</button>
          <button class="action-btn">delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .add-task-container{
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 18px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  .task-input{
    flex: 1;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 14px;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    backdrop-filter: blur(10px);
    font-size: 17px;
  }
  .task-input::placeholder {
    color: #fff;
    font-size: 17px;
  }
  .add-task-button{
    padding: 16px 18px;
    background:#552275c0 ;
    color: white;
    border-radius: 14px;
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 10px rgba(255, 255, 255, 0.2);
  }
  .add-task-button:active {
    transform: scale(0.99);
  }
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
  .action-btn{
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
  .action-btn:active {
    transform: scale(0.99);
  }
</style>