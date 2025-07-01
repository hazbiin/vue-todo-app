<script setup lang="ts">
    import EditTodo from '@/components/EditTodo.vue';

    import { ref } from 'vue';
    import { useRoute , useRouter } from 'vue-router';

    import useNotification from '@/composables/useNotification.ts';
    import { useTodoListStore } from '@/stores/useTodoListStore';
    import { storeToRefs } from 'pinia';

    // store variables 
    const store = useTodoListStore();

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
    const { tasks } = storeToRefs(store);
    const taskToUpdate = ref<TaskType>({} as TaskType);
    taskToUpdate.value = tasks.value.filter((t: TaskType) => t.id === taskId)[0];

    const saveChanges = async (updatedTaskName: string): Promise<void> => {
        if(updatedTaskName !== taskToUpdate.value.todo) {
            const response = await store.updateTodo(updatedTaskName, taskId);
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
