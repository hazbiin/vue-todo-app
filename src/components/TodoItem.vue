<script setup>
    import { defineProps, defineEmits } from 'vue';

    // component props
    const props = defineProps({
        todoItem: {
            type: String
        }
    });

    // component emits
    const emits = defineEmits(['delete-task','edit-task']);

</script>


<template>
    <li class="todo-item">
        <span class="todo-item-text">{{ todoItem }}</span>
        <div class="todo-actions">
            <button class="action-button" @click="$emit('edit-task')">edit</button>
            <button class="action-button" @click="$emit('delete-task')">delete</button>
        </div>
    </li>
</template>

<style scoped>
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