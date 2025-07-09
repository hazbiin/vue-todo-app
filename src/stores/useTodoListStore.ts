import { ref } from "vue";
import { defineStore } from "pinia";
import type { TaskType } from "@/types";
import * as util from '@/utils';

export const useTodoListStore = defineStore('todo-list', () => {
    // state 
    const tasks = ref<TaskType[]>([]);

    // actions 
    const readTodos = async(): Promise<void> => {
        const response = await util.getTodos();
        if(response) {
            tasks.value = response;
        }
    }
    const addTodo = async(newTask: string): Promise<TaskType | undefined> => {
        const response = await util.addData(newTask);
        if(response) {
            tasks.value.push(response);
            return response;
        }
    }

    return { 
        // state
        tasks,

        // actions 
        readTodos,
        addTodo
    }
});