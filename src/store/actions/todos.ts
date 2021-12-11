import { Todo } from "../../models";
import { ActionType } from "../action-types/index"

interface CreateTodoAction{
    type: ActionType.CREATE_TODO,
    payload: Todo
}

interface ToggleTodoAction{
    type: ActionType.TOGGLE_COMPLETE_TODO,
    payload: string
}

interface DeleteTodoAction{
    type: ActionType.DELETE_TODO,
    payload: string
}

interface DraggingTodoAction{
    type: ActionType.DRAGGING_TODO,
    payload: {
        todoId: string,
        todoIdTarget: string
    }
}

export type Action = CreateTodoAction | ToggleTodoAction | DeleteTodoAction | DraggingTodoAction