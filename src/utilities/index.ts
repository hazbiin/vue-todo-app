
// types
type TaskType = {
    taskId: number;
    taskName: string;
}

// local storage setting utility function.
export default function setLocalStorage(key: string, value: TaskType[]) {
    localStorage.setItem(key, JSON.stringify(value));
}