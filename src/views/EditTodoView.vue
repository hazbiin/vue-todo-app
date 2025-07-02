<script setup lang="ts">
    import EditTodo from '@/components/EditTodo.vue';

    import { onMounted, ref } from 'vue';
    import { useRoute , useRouter } from 'vue-router';

    import useNotification from '@/composables/useNotification.ts';
    import * as util from '@/utils';
    import type { TodoItemType } from '@/types';
    import { useTodoListStore } from '@/stores/useTodoListStore';

    // store variables 
    const store = useTodoListStore();

    // router instance
    const router = useRouter();

    // getting task id from url params
    const route = useRoute();
    const taskId = route.params.id;

    // composable imports
    const { showNotification } = useNotification();

    // reactive variable
    const taskToUpdate = ref<TodoItemType | undefined>();
    
    onMounted(async() => {
        const response = await getTodoToUpdate();
        if(response) {
            taskToUpdate.value = response;
        }
    });

    // get todo to update
    const getTodoToUpdate = async(): Promise<TodoItemType| undefined> => {
        const response = await util.fetchDataById(taskId);
        if(response){
            return response;
        }
    }

    // update todo
    const saveChanges = async (updatedTaskName: string | undefined): Promise<void> => {
        if(updatedTaskName !== taskToUpdate.value?.todo) {
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
