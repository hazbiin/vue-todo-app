import type { TaskType } from "@/types";
import type { DeletedTodoType } from "@/types";

// fetch data 
export async function getTodos(): Promise<TaskType[] | undefined>{
  try {
    const response = await fetch('http://localhost:3000/todos');

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }catch(error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// add data
export async function addData(newTask: string): Promise<TaskType | undefined>{
  try{
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: newTask,
      })
    });

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data =  await response.json();

    return data;
  }catch(error) {
    console.error(`Error adding data: ${error}`);
  }
}

// delete data
export async function deleteData(id: number): Promise<DeletedTodoType | undefined>{
  try{
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE'
    });

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }catch(error){
    console.error(`Error deleting data: ${error}`);
  }
}

// update data
export async function updateData(id: number, updatedTaskName: string): Promise<TaskType | undefined>{
  try{
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: updatedTaskName,
      })
    });

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }catch(error){
    console.error(`Error updating data: ${error}`);
  }
}