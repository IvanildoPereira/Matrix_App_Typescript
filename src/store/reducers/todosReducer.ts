import { Todo } from "../../models";
import { ActionType } from "../action-types/index"
import { Action } from "../actions/todos"

const initialState: {
    todos: Todo[],
} = {
    todos: [],
}

let foundIndex = -1;

const todosReducer = (state = initialState, action: Action) =>{
    switch(action.type){
        case ActionType.CREATE_TODO:
            let newTodo = [...state.todos];
            newTodo.push(action.payload);
            return {...state, todos: newTodo};
        
        case ActionType.TOGGLE_COMPLETE_TODO:
            let toggleCompleteTodo = [...state.todos];
            foundIndex = toggleCompleteTodo.findIndex(el => el.id === action.payload);
            toggleCompleteTodo[foundIndex].isCompleted = !toggleCompleteTodo[foundIndex].isCompleted; 
            return {...state, todos: toggleCompleteTodo};
        
        case ActionType.DELETE_TODO:
            let deletedTodo = [...state.todos]
            let updatedDeletedTodo = deletedTodo.filter((todo) => {
                return todo.id !== action.payload
            })
            return {...state, todos: updatedDeletedTodo}
        
        case ActionType.DRAGGING_TODO:
            let draggingTodo = [...state.todos];
            foundIndex = draggingTodo.findIndex(el => el.id === action.payload.todoId);
            var foundIndexTarget = draggingTodo.findIndex(el => el.id === action.payload.todoIdTarget);
            if(foundIndex !== -1){
                foundIndexTarget !== -1 && 
                    foundIndexTarget !== foundIndex && 
                        draggingTodo.splice(foundIndex, 0, draggingTodo.splice(foundIndexTarget, 1)[0]) 
            }

            return {...state, todos: draggingTodo}

        default:
            return state
    }
}

export default todosReducer;