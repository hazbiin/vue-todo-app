import { defineStore } from "pinia";
import { ref } from "vue";
import type { TaskType } from "@/types";

export const useTodoListStore = defineStore('todo-list', () => {

    // state 
    const tasks = ref<TaskType[]>([]);

    return { 

        // state
        tasks
    }
});