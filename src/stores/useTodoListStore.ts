import { defineStore } from "pinia";
import { ref } from "vue";
import * as util from '@/utils';

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

    // actions 
    const addTodo = async (newTask: string): Promise<void> => {
        const response = await util.fetchDataFromApi('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: newTask,
                completed: false,
                userId: 5
            })
        });
        if(response) {
            tasks.value.push(response);
        }
    }

    const deleteTodo = async (id: number): Promise<void>  => {
        const response = await util.fetchDataFromApi(`https://dummyjson.com/todos/${id}`, {
            method: 'DELETE',
        });
        if(response) {
            tasks.value = tasks.value.filter(t => t.id !== response.id);
        }
    }

    return { tasks , addTodo, deleteTodo };
});