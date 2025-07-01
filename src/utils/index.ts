
// types
type TaskType = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}
type DeletedTodoType = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isDeleted: boolean;
  deletedOn: string;
}

// local storage setting utility function.
export function setLocalStorage(key: string, value: TaskType[]) {
    localStorage.setItem(key, JSON.stringify(value));
}

// fetch data 
export async function fetchData(): Promise<TaskType[] | undefined>{
  try {
    const respone = await fetch('https://dummyjson.com/todos');
    const data = await respone.json();
    const todos = data.todos;
    return todos;
  }catch(error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// add data
export async function addData(newTask: string): Promise<TaskType | undefined>{
  try{
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: newTask,
        completed: false,
        userId: 5
      })
    });
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