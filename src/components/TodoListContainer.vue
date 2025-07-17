<script setup lang="ts">
    import { defineProps, computed, defineEmits } from 'vue';
    import type { TaskType } from '@/types';
    import TodoItem from './TodoItem.vue';

    // component props
    const props = defineProps<{
        tasks: TaskType[] | undefined
    }>();
    // component emits
    const emits = defineEmits<{
        (e: 'delete-task', index:string):void
        (e: 'toggle-completed', id: string, value: boolean): void;
    }>();
    // handle visibility of empty todo-lis
    const isEmptyTodoList = computed<boolean>(():boolean => {
        return props.tasks?.length === 0;
    });
    // delete-task emit handler
    const deleteTask = (index: string): void => {
        emits('delete-task', index);
    }
    // toggle-task emit handler
    const toggleTask = (id: string, checked: boolean): void => {
        emits('toggle-completed', id, checked);
    }
</script>

<template>
    <div class="todo-list-container">
        <div v-if="isEmptyTodoList" class="empty-list">
            <h2 class="empty-list-title">No tasks found!</h2>
            <p class="empty-list-subtitle">Add your first task to get started.</p>
        </div>
        <ul v-else class="todo-list">
            <TodoItem
                v-for="(task) in tasks"
                :key="task.id"
                :todoItem="task"
                @delete-task="() => deleteTask(task.id)"
                @toggle-completed="toggleTask"
            />
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
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        max-height: 600px;
        overflow-y: scroll;
    }
    .todo-list-container::-webkit-scrollbar{
        display: none;
    }
    .empty-list{
        text-align: center;
        padding: 50px 0px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: bold;
        letter-spacing: 1px;
    }
    .empty-list-title{
        font-size: 25px;
        margin-bottom: 10px;
    }
    .empty-list-subtitle{
        font-size: 18px;
    }
    .todo-list{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>