export type TodoItemType = {
    id: string;
    todo: string;
    completed: boolean;
}
export type NotificationMessageType = {
    id: string; 
    messagetext: string;
}
export type CompletedTodoRequestType  = {
    id: string;
    data : {
        completed: boolean
    }   
}