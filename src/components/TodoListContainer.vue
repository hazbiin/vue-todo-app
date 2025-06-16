<script setup>
    import { defineProps } from 'vue';

    import TodoItem from './TodoItem.vue';

    const props = defineProps({
        tasks: {
            type: Array
        }
    });

    const deleteTask = (index) => {
        props.tasks = props.tasks.splice(index, 1);
    }

</script>

<template>
    <div class="todo-list-container">
        <ul class="todo-list">
            <TodoItem
                v-for="(task, index) in tasks"
                :key="task.taskId"
                :taskName="task.taskName"
                @delete-task="deleteTask(index)"
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
</style>