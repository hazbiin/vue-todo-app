<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useTodoListStore } from '@/stores/useTodoListStore';

    // reactive state
    const isChecked = ref<boolean>(false);

    // computed ref for checkbox label
    const labelText = computed(() => {
        return isChecked.value ? 'Uncheck All' : 'Check All';
    });

    // store variable 
    const store = useTodoListStore();

    // watch function for checking All/None checkbox with isChecked ref as watch source.
    watch((isChecked), () => {

        if(isChecked.value) {
            // check the uncheckedTodos if any when "checking" the checkAll/None checkbox
            const uncheckedTodos = store.tasks.filter(task => task.completed !== true);
            if(uncheckedTodos.length > 0) {
                uncheckedTodos.forEach(todo => {
                    toggleCompleted(todo.id, todo.completed);
                });
            }else {
                store.tasks.forEach(task => {
                    toggleCompleted(task.id, task.completed);
                });
            }
        }else {
            // uncheck the checkedTodos if any when "unchecking" the checkAll/None checkbox
            const checkedTodos = store.tasks.filter(task => task.completed === true);
            if(checkedTodos.length > 0) {
                checkedTodos.forEach(todo => {
                    toggleCompleted(todo.id, todo.completed);
                });
            }else {
                store.tasks.forEach(task => {
                    toggleCompleted(task.id, task.completed);
                });
            }
        }
    });

    // helper function for making the PATCH request via store
    const toggleCompleted = async (id: string, completed: boolean): Promise<void> => {
        const response = await store.toggleCompletedStatus(id, completed);
        if(response) {
            store.readTodo();
        }
    }
</script>

<template>
    <div class="status-container">
        <div class="checkbox-section">
            <input id="all-check-uncheck" type="checkbox" class="checkbox" v-model="isChecked">
            <label for="all-check-uncheck" class="checkbox-label">{{ labelText }}</label>
        </div>
    </div>
</template>

<style scoped>
    .status-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 15px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        padding: 8px 18px;
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    .checkbox-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 10px 18px;
        backdrop-filter: blur(10px);
        border-radius: 15px;
    }
    .checkbox {
        cursor: pointer;
    }
    .checkbox-label{
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 1px;
        cursor: pointer;
    }
</style>