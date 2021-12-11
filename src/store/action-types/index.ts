export enum ActionType {
    CREATE_TASK = "create_task",
    UPDATE_TASK = "update_task",
    TOGGLE_COMPLETE_TASK = "toggle_complete_task",
    SET_SELECTED_TASK_ID = "set_selected_task_id",
    REMOVE_SELECTED_TASK_ID = "remove_selected_task_id",
    TOGGLE_ARCHIVED_TASK = "toggle_archived_task",
    DRAGGING_TASK = "dragging_task",

    CREATE_TODO = "create_todo",
    TOGGLE_COMPLETE_TODO = "toggle_complete_todo",
    DELETE_TODO = "delete_todo",
    DRAGGING_TODO = "dragging_todo"
}