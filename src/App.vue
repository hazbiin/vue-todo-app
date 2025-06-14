<script setup>
  import Header from './components/Header.vue';
</script>


<template>
  <Header/>
  <div class="add-task-container">
        <input class="task-input" type="text" placeholder="type here ...">
        <button class="add-task-button" >Add new task</button>
  </div>
    <div class="todo-list-section">
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
</template>

<style scoped>
  .add-task-container{
    display: flex;
    flex-direction: column;
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
    .add-task-container {
      flex-direction: row;
    }
    .add-task-button{
      width: unset;
    }
  }

</style>