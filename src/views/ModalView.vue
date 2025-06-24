<script setup lang="ts">
    import Modal from '@/components/Modal.vue';

    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    import useNotification from '@/composables/useNotification.ts';
    import setLocalStorage from '@/utilities';

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
    
    // save-changes emit handler
    const saveChanges = (updatedTaskName: string) => {
        if(updatedTaskName !== taskToUpdate.value.taskName) {
            taskToUpdate.value.taskName = updatedTaskName;
            setLocalStorage('tasks', tasks.value);
            showNotification('Task Updated Successfully');
        }
    }

</script>

<template>
    <Modal 
        :taskToUpdate="taskToUpdate"
        @save-changes="saveChanges"
    />
</template>