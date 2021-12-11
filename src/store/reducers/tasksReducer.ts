import { Task } from "../../models";
import { ActionType } from "../action-types/index"
import { Action } from "../actions/tasks"

const initialState: {
    tasks: Task[],
    selectedTaskId: string | null
} = {
    tasks: [],
    selectedTaskId: null
}

let foundIndex = -1;

const tasksReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case ActionType.CREATE_TASK:
            let newTask = [...state.tasks]
            newTask.push(action.payload)
            return {...state, tasks: newTask};
        
        case ActionType.UPDATE_TASK:
            let updateTask = [...state.tasks]
            foundIndex = updateTask.findIndex(el => el.id === action.payload.id);
            updateTask[foundIndex] = action.payload
            return {...state, tasks: updateTask};

        
        case ActionType.TOGGLE_COMPLETE_TASK:
            let toggleCompleteTask = [...state.tasks];
            foundIndex = toggleCompleteTask.findIndex(el => el.id === action.payload);
            toggleCompleteTask[foundIndex].isCompleted = !toggleCompleteTask[foundIndex].isCompleted; 
            return {...state, tasks: toggleCompleteTask}
        
        case ActionType.SET_SELECTED_TASK_ID:
            return {...state, selectedTaskId: action.payload}
        
        case ActionType.REMOVE_SELECTED_TASK_ID:
            return {...state, selectedTaskId: null}
        
        case ActionType.TOGGLE_ARCHIVED_TASK:
            let toggleArchivedTask = [...state.tasks];
            foundIndex = toggleArchivedTask.findIndex(el => el.id === action.payload);
            toggleArchivedTask[foundIndex].isArchived = !toggleArchivedTask[foundIndex].isArchived; 
            return {...state, tasks: toggleArchivedTask, selectedTaskId: null}

        case ActionType.DRAGGING_TASK:
            let draggingTask = [...state.tasks];
            foundIndex = draggingTask.findIndex(el => el.id === action.payload.indexItem.taskId);
            let foundIndexTarget = draggingTask.findIndex(el => el.id === action.payload.targetItem.taskId);
            if(foundIndex !== -1){
                foundIndexTarget !== -1 && 
                    foundIndexTarget !== foundIndex && 
                        draggingTask.splice(foundIndex, 0, draggingTask.splice(foundIndexTarget, 1)[0]) 
                draggingTask[foundIndex].weekId = action.payload.targetItem.weekId; 
                draggingTask[foundIndex].priorityId = action.payload.targetItem.priorityId;                 
            }

            return {...state, tasks: draggingTask}
        default:
            return state;
    }
}

export default tasksReducer;