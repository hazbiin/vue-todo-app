<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    import { RouterLink } from 'vue-router';
    import type { TaskType } from '@/types';

    // component props
    const props = defineProps<{
        todoItem: TaskType
        isChecked: boolean
    }>();

    // component emits
    const emits = defineEmits<{
        (e: 'delete-task'):void;
        (e: 'toggle-completed', id: string, value: boolean):void;
    }>();

    // checkbox change handler
    const handleChange = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        emits('toggle-completed', props.todoItem.id, target.checked);
    }

</script>

<template>
    <li class="todo-item">
        <div class="todo-item-group">
            <input :id="todoItem.id" type="checkbox" @change="handleChange" :checked="isChecked"/>
            <label :for="todoItem.id" class="todo-item-text" :class="{'strike-through': todoItem.completed}">{{ todoItem.todo }}</label>
        </div>
        <div class="todo-item-group">
            <RouterLink :to="'/tasks/'+todoItem.id" class="action-button">edit</RouterLink>
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
    .strike-through{
        text-decoration: line-through;
        text-decoration-color:#552275c0;
        text-decoration-thickness: 3px;
    }
    .todo-item-group{
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