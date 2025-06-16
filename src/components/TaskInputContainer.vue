<script setup>
    import { ref, defineEmits } from 'vue';

    const emit = defineEmits(['add-new-task']);

    const newTask = ref('');

    const addNewTask = () => {
        const trimmedTaskInput = newTask.value.trim();
        if(trimmedTaskInput !== "") {
            emit('add-new-task', trimmedTaskInput);
            newTask.value= "";
        }
    }

</script>

<template>
    <div class="add-task-container">
        <input class="task-input" type="text" placeholder="type here ..." v-model="newTask">
        <button class="add-task-button" @click="addNewTask">Add new task</button>
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
</style>