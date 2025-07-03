export type TodoItemType = {
    id: string;
    todo: string;
    completed: boolean;
}
export type NotificationMessageType = {
    id: string; 
    messagetext: string;
}
type CompletedTodoRequestType  = {
    id: string;
    data : {
        completed: boolean
    }   
}
type UpdatedTodoNameRequestType = {
    id: string | string[];
    data : {
        todo : string | undefined
    }
}
export type UpdateRequestType = CompletedTodoRequestType | UpdatedTodoNameRequestType;