<script setup lang="ts">
    import EditTodo from '@/components/EditTodo.vue';

    import { ref } from 'vue';
    import { useRoute , useRouter } from 'vue-router';

    import useNotification from '@/composables/useNotification.ts';
    import type { TaskType } from '@/types';
    import * as util from '@/utils';

    // router instance
    const router = useRouter();

    // getting task id from url params
    const route = useRoute();
    const taskId = Number(route.params.id);

    // composable imports
    const { showNotification } = useNotification();

    // reactive variables 
    const tasks = ref<TaskType[]>([]);
    const taskToUpdate = ref<TaskType | undefined>();

    // getting task to update from localstorage.
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
        tasks.value = JSON.parse(savedTasks);
        taskToUpdate.value = tasks.value.filter((task: TaskType) => task.id === taskId)[0];
    }

    // update task by calling api endpoint
    const saveChanges = async (updatedTaskName: string | undefined): Promise<void> => {
        if(updatedTaskName !== taskToUpdate.value?.todo) {
            const response = await util.updateData(taskId, updatedTaskName);
            if(response && taskToUpdate.value) {
                taskToUpdate.value.todo = response.todo;
                util.setLocalStorage('tasks', tasks.value);
                router.push('/');
                showNotification('Task Updated Successfully');
            }
        }
    }
</script>

<template>
    <EditTodo
        :taskToUpdate="taskToUpdate"
        @save-changes="saveChanges"
    />
</template>
