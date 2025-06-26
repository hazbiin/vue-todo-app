import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoListStore = defineStore('todoList',() => {

    // types
    type TodoItemType = {
        id: number;
        todo: string;
        completed: boolean;
        userId: number;
    }

    // states
    const tasks = ref<TodoItemType[]>([]);
    
    return { tasks };
});