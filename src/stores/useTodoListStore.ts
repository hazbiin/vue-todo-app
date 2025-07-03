import { defineStore } from "pinia";
import { ref } from "vue";
import * as util from '@/utils';
import type { TodoItemType } from "@/types";

export const useTodoListStore = defineStore('todoList',() => {

    // states
    const tasks = ref<TodoItemType[]>([]);

    // actions 
    const readTodo = async () => {
        const response =  await util.fetchData();
        if(response) {
            tasks.value = response;
        }
    }

    const addTodo = async (newTask: string): Promise<TodoItemType | undefined> => {
        const response = await util.addData(newTask);
        if(response) {
            return response;
        }
    }

    const updateTodo = async (updatedTaskName: string | undefined, id: string | string []): Promise<TodoItemType | undefined> => {
        const requestData = {
            id,
            data: {
                todo: updatedTaskName
            }
        }
        const response = await util.updateData(requestData);
        if(response) {
            return response;
        }
    }

    const toggleCompletedStatus = async (id: string, completed: boolean):Promise<TodoItemType | undefined> => {
        const requestData = {
            id, 
            data: {
                completed: !completed
            }
        };
        const response = await util.updateData(requestData);
        if(response) {
            return response;
        }
    }
    
    const deleteTodo = async (id: string): Promise<TodoItemType| undefined>  => {
        const response = await util.deleteData(id);
        if(response) {
            return response;
        }
    }

    return { tasks ,readTodo, addTodo, deleteTodo, updateTodo, toggleCompletedStatus };
});
