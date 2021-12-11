import { Task } from "../../models";
import { ActionType } from "../action-types/index"

interface CreateTaskAction{
    type: ActionType.CREATE_TASK,
    payload: Task
}

interface UpdateTaskAction{
    type: ActionType.UPDATE_TASK,
    payload: Task
}

interface ToggleCompleteTask{
    type: ActionType.TOGGLE_COMPLETE_TASK,
    payload: string
}

interface SelectedTask{
    type: ActionType.SET_SELECTED_TASK_ID,
    payload: string
}

interface RemoveSelectedTask{
    type: ActionType.REMOVE_SELECTED_TASK_ID,
}

interface ToggleArchivedTask{
    type: ActionType.TOGGLE_ARCHIVED_TASK,
    payload: string
}

interface DraggingTaskAction{
    type: ActionType.DRAGGING_TASK,
    payload: {
        targetItem: {
            weekId: number, priorityId: number, taskId: string | number
        },
        indexItem: {
            weekId: number, priorityId: number, taskId: string | number
        }
    }
}

export type Action = CreateTaskAction | ToggleCompleteTask | SelectedTask | RemoveSelectedTask | ToggleArchivedTask | UpdateTaskAction | DraggingTaskAction;
