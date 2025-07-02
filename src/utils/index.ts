import type { TodoItemType } from "@/types";

// fetch data 
export async function fetchData(): Promise<TodoItemType[] | undefined>{
  try {
    const respone = await fetch('http://localhost:3000/todos');
    const data = await respone.json();
    return data;
  }catch(error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// add data
export async function addData(newTask: string): Promise<TodoItemType | undefined>{

  try{
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: newTask,
      })
    });
    const data =  await response.json();
    return data;
  }catch(error) {
    console.error(`Error adding data: ${error}`);
  }
}

// delete data
export async function deleteData(id: string): Promise<TodoItemType | undefined>{
  try{
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
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
export async function updateData(id: string, updatedTaskName: string): Promise<TodoItemType | undefined>{
  try{
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
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