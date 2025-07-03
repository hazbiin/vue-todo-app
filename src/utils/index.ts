import type { TodoItemType } from "@/types";
import type { UpdateRequestType } from "@/types";

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

// fetch data with id
export async function fetchDataById(id: string | string []): Promise<TodoItemType | undefined>{
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`)
    const data = await response.json();
    return data;
  }catch(error){
    console.error(`Error fetching data with id: ${error}`);
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
        completed: false,
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

// generic updateData function
export async function updateData<T extends UpdateRequestType>(requestData: T):Promise<TodoItemType | undefined> {
  try{
    const response = await fetch(`http://localhost:3000/todos/${requestData.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(requestData.data),
    });

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.json();
    return data;
  }catch(error){
    console.error(`Error updating data: ${error}`);
  }
}