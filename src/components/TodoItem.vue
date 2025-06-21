<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    import { RouterLink } from 'vue-router';

    type TaskType = {
        taskId: number;
        taskName: string;
        isEditMode: boolean;
    }
    // component props
    const props = defineProps<{
        todoItem: TaskType
    }>();

    // component emits
    const emits = defineEmits<{
        (e: 'delete-task'):void
        (e: 'edit-task'):void
    }>();

</script>


<template>
    <li class="todo-item">
        <span class="todo-item-text">{{ todoItem.taskName }}</span>
        <div class="todo-actions">
            <RouterLink :to="'/tasks/'+todoItem.taskId" class="action-button" @click="emits('edit-task')">edit</RouterLink>
            <button class="action-button" @click="emits('delete-task')">delete</button>
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
    a{
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