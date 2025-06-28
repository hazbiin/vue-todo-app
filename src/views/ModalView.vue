<script setup lang="ts">
    import Modal from '@/components/Modal.vue';

    import { ref } from 'vue';
    import { useRoute , useRouter } from 'vue-router';

    import useNotification from '@/composables/useNotification.ts';
    import * as util from '@/utils';

    // router instance
    const router = useRouter();

    // getting task id from url params
    const route = useRoute();
    const taskId = Number(route.params.id);

    // typing task
    type TaskType = {
        id: number;
        todo: string;
        completed: boolean;
        userId: number;
    }

    // composable imports
    const { showNotification } = useNotification();

    // reactive variables 
    const tasks = ref<TaskType[]>([]);
    const taskToUpdate = ref<TaskType>({} as TaskType);

    // getting task to update from localstorage.
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
        tasks.value = JSON.parse(savedTasks);
        taskToUpdate.value = tasks.value.filter((t: TaskType) => t.id === taskId)[0];
    }

    // update task by calling api endpoint
    const saveChanges = async (updatedTaskName: string): Promise<void> => {
        if(updatedTaskName !== taskToUpdate.value.todo) {
            const response = await util.fetchDataFromApi(`https://dummyjson.com/todos/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    todo: updatedTaskName,
                })
            });
            if(response) {
                taskToUpdate.value.todo = response.todo;
                util.setLocalStorage('tasks', tasks.value);
                router.push('/');
                showNotification('Task Updated Successfully');
            }
        }
    }
</script>

<template>
    <Modal 
        :taskToUpdate="taskToUpdate"
        @save-changes="saveChanges"
    />
</template>