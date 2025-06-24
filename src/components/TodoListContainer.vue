<script setup lang="ts">
    import { defineProps, computed, defineEmits } from 'vue';
    import TodoItem from './TodoItem.vue';

    type TaskType = {
        taskId: number;
        taskName: string;
    }
    type Prop = TaskType[];

    // component props
    const props = defineProps<{
        tasks: Prop
    }>();

    // component emits
    const emits = defineEmits<{
        (e: 'edit-task', taskToUpdate: TaskType):void
        (e: 'delete-task', index:number):void
    }>();
    

    // handle visibility of empty todo-lis
    const isEmptyTodoList = computed<boolean>(():boolean => {
        return props.tasks.length === 0;
    });

    // delete-task emit handler
    const deleteTask = (index: number): void => {
        emits('delete-task', index);
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
                v-for="(task, index) in tasks"
                :key="task.taskId"
                :todoItem="task"
                @delete-task="() => deleteTask(index)"
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