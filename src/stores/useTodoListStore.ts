import { defineStore } from "pinia";
import { ref } from "vue";
import * as util from '@/utils';
import type { TodoItemType } from "@/types";

export const useTodoListStore = defineStore('todoList',() => {

    // states
    const tasks = ref<TodoItemType[]>([]);

    // actions 
    const readTodo = async () => {
        const response =  await util.fetchDataFromApi('http://localhost:3000/todos');
        if(response) {
            tasks.value = response;
        }
    }

    const addTodo = async (newTask: string): Promise<TodoItemType | undefined> => {
        const response = await util.fetchDataFromApi('http://localhost:3000/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: newTask,
            })
        });
        if(response) {
            return response;
        }
    }

    const updateTodo = async (updatedTaskName: string, id: string | string[]): Promise<TodoItemType | undefined> => {
        const response = await util.fetchDataFromApi(`http://localhost:3000/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: updatedTaskName,
            })
        });
        if(response) {
            return response;
        }
    }

    const deleteTodo = async (id: string): Promise<TodoItemType | undefined>  => {
        const response = await util.fetchDataFromApi(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        });
        if(response) {
            return response;
        }
    }

    return { tasks , readTodo, addTodo, deleteTodo, updateTodo };
});