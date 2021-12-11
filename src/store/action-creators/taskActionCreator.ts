import { Dispatch } from "redux"
import { Task } from "../../models"
import { ActionType } from "../action-types"
import { Action } from "../actions/tasks"

type DraggItemInterface = {
    targetItem: {
        weekId: number, priorityId: number, taskId: string | number
    },
    indexItem: {
        weekId: number, priorityId: number, taskId: string | number
    }
}

export const createTask = (task: Task) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CREATE_TASK,
            payload: task
        })
    }
}

export const updateTask = (task: Task) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_TASK,
            payload: task
        })
    }
}

export const toggleCompleteTask = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.TOGGLE_COMPLETE_TASK,
            payload: id
        })
    }
}

export const toggleArchivedTask = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.TOGGLE_ARCHIVED_TASK,
            payload: id
        })
    }
}

export const setSelectedTaskId = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_SELECTED_TASK_ID,
            payload: id
        })
    }
}

export const removeSelectedTaskId = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.REMOVE_SELECTED_TASK_ID,
        })
    }
}

export const draggingTask = (item: DraggItemInterface) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DRAGGING_TASK,
            payload: item
        })
    }
}