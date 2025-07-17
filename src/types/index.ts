export type TaskType = {
    id: string;
    todo: string;
    completed: boolean;
}
export type NotificationMessageType = {
    id:number;
    text: string;
}
export type DirtyCheckButtonType = {
    isDisabled: boolean;
}
export type ChangedTodoType = {
    id: string;
    isChecked: boolean
}
export type SelectAllCheckBoxPropType = {
    isAllChecked: boolean;
    isIndeterminate: boolean;
    completedCount: number;
}