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
    type TodoDeteleType = {
        id: number;
        todo: string;
        completed: boolean;
        userId: number;
        deletedOn: string;
        isDeleted: boolean;
    }

    // states
    const tasks = ref<TodoItemType[]>([]);

    // actions 
    const fetchInitialData = async () => {
        const response =  await util.fetchData();
        if(response) {
            tasks.value = response;
        }
    }
    fetchInitialData();

    const addTodo = async (newTask: string): Promise<TodoItemType | undefined> => {
        const response = await util.addData(newTask);
        if(response) {
            tasks.value.push(response);
            return response;
        }
    }

    const updateTodo = async (updatedTaskName: string, taskId: number): Promise<TodoItemType | undefined> => {
        const response = await util.updateData(taskId, updatedTaskName);
        if(response) {
            const updatedItemIndex = tasks.value.findIndex(item => item.id === response.id);
            tasks.value.splice(updatedItemIndex, 1, response);
            return response;
        }
    }

    const deleteTodo = async (id: number): Promise<TodoDeteleType | undefined>  => {
        const response = await util.deleteData(id);
        if(response) {
            tasks.value = tasks.value.filter(t => t.id !== response.id);
            return response;
        }
    }

    return { tasks ,fetchInitialData, addTodo, deleteTodo, updateTodo };
});