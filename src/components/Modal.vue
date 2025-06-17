<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        taskToUpdate: {
            type: Object
        }
    });

    // console.log(props.taskToUpdate);

</script>

<template>
    <div class="modal-overlay">
        <div class="modal-container">
            <h1 class="modal-title">Edit your task!</h1>
            <input class="task-input" type="text" value="TodoItem" />
            <div class="todo-actions">
                <button class="action-button">Save Changes</button>
                <button class="action-button">Close</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
.modal-container{
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
    border-radius: 15px;
    padding: 30px 20px;
    min-width: 600px;
    position: absolute;
    top: 170px;
}
.modal-title{
    margin-bottom: 10px;
    letter-spacing: 2px;
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