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
    const fetchInitialData = async () => {
        const response =  await util.fetchDataFromApi('https://dummyjson.com/todos');
        if(response) {
            const todos = response.todos;
            tasks.value = todos;
        }
    }
    fetchInitialData();

    const addTodo = async (newTask: string): Promise<TodoItemType | undefined> => {
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
            return response;
        }
    }

    const updateTodo = async (updatedTaskName: string, taskId: number): Promise<TodoItemType | undefined> => {
        const response = await util.fetchDataFromApi(`https://dummyjson.com/todos/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: updatedTaskName,
            })
        });
        if(response) {
            const indexOfUpdatedItem = tasks.value.findIndex(item => item.id === taskId);
            tasks.value.splice(indexOfUpdatedItem, 1, response);
            return response;
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

    return { tasks , addTodo, deleteTodo, updateTodo };
});