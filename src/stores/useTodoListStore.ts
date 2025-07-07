import { defineStore } from "pinia";
import { ref } from "vue";
import type { TaskType } from "@/types";
import * as util from '@/utils';

export const useTodoListStore = defineStore('todo-list', () => {

    // state 
    const tasks = ref<TaskType[]>([]);

    // actions 
    const addTodo = async(newTask: string): Promise<TaskType | undefined> => {
        const response = await util.addData(newTask);
        if(response) {
            tasks.value.push(response);
            return response;
        }
    }
    const deleteTodo = async (id: number): Promise<TaskType | undefined> => {
        const response = await util.deleteData(id);
        if(response) {
            tasks.value = tasks.value.filter(task => task.id !== response.id);
            return response;
        }
    }
    const updateTodo = async (id: number, updatedTaskName: string): Promise<TaskType | undefined> => {
        const response = await util.updateData(id, updatedTaskName);
        if(response) {
            const indexOfUpdatedItem = tasks.value.findIndex(item => item.id === response.id);
            tasks.value.splice(indexOfUpdatedItem, 1, response);
            return response;
        }
    }

    return { 

        // state
        tasks,

        // actions 
        addTodo,
        deleteTodo,
        updateTodo
    }
});