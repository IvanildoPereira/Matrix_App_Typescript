import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import todosReducer from './todosReducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todos: todosReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>