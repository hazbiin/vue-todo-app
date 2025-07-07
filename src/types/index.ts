export type TaskType = {
    id: string;
    todo: string;
}
export type NotificationMessageType = {
    id:number;
    text: string;
}
export type DeletedTodoType = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isDeleted: boolean;
  deletedOn: string;
}