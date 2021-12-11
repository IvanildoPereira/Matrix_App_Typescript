import { Dispatch } from "redux"
import { Todo } from "../../models"
import { ActionType } from "../action-types"
import { Action } from "../actions/todos"

interface TodoDraggingInterface{
    todoId: string,
    todoIdTarget: string
}

export const createTodo = (todo: Todo) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CREATE_TODO,
            payload: todo
        })
    }
}

export const toggleCompleteTodo = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.TOGGLE_COMPLETE_TODO,
            payload: id
        })
    }
}

export const deleteTodo = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE_TODO,
            payload: id
        })
    }
}

export const draggingTodo = (todoDrag: TodoDraggingInterface) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DRAGGING_TODO,
            payload: todoDrag
        })
    }
}