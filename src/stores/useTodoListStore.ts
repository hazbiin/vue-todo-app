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

    return { 

        // state
        tasks,

        // actions 
        addTodo
    }
});