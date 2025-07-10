<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute , useRouter } from 'vue-router';

    import { useTodoListStore } from '@/stores/useTodoListStore';

    import EditTodo from '@/components/EditTodo.vue';

    import type { TaskType } from '@/types';

    import useNotification from '@/composables/useNotification';
    
    // router instance
    const router = useRouter();

    // getting task id from url params
    const route = useRoute();
    const taskId = Number(route.params.id);

    // composable imports
    const { showNotification } = useNotification();

    // store variable
    const todosStore = useTodoListStore();

    // reactive variable
    const taskToUpdate = ref<TaskType | undefined>();
    taskToUpdate.value = todosStore.tasks.find((task: TaskType) => task.id === taskId);

    // update task by calling api endpoint
    const saveChanges = async (updatedTaskName: string | undefined ): Promise<void> => {
        if(updatedTaskName !== taskToUpdate.value?.todo) {
            const response = await todosStore.updateTodo(taskId, updatedTaskName);
            if(response) {
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
