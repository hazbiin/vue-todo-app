<script setup lang="ts">
    import Modal from '@/components/Modal.vue';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    // getting task id from url params
    const route = useRoute();
    const taskId = Number(route.params.id);

    // typing task
    type TaskType = {
        taskId: number;
        taskName: string;
        isEditMode: boolean;
    }

    // getting task to update from localstorage.
    const taskToUpdate = ref<TaskType>({} as TaskType);
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
        taskToUpdate.value = JSON.parse(savedTasks).filter((t: TaskType) => t.taskId === taskId)[0];
    }

    // note: need to implement this ///////
    const saveChanges = (updatedTaskName: string) => {
        console.log(updatedTaskName);
    }

</script>

<template>
    <Modal 
        :taskToUpdate="taskToUpdate"
        @save-changes="saveChanges"
    />
</template>