import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from './models';
import { createTodo, deleteTodo, toggleCompleteTodo, draggingTodo } from './store/action-creators/todoActionCreator';
import { State } from './store/reducers/rootReducer';
import './TodoComponent.css'

interface TodoComponentProps{
    selectedTaskId: string;
    priorityColor?: string
}

const TodoComponent = ({selectedTaskId, priorityColor}: TodoComponentProps) =>{
    const dispatch = useDispatch();
    const [inputTodo, setInputTodo] = useState("");
    const [checkShowTodosCompleted, setCheckShowTodosCompleted] = useState(true);
    const [ isDraggingTodo,  setIsDraggingTodo ] = useState(false)
    const dragItemTodo = useRef<string | null>(null);
    const dragItemNodeTodo = useRef<HTMLDivElement | null>(null);

    const todos: Todo[] = useSelector((state: State) => {
        return state.todos.todos.filter((todo) =>{
                return todo.taskId === selectedTaskId;
        })
    });

    const handleInputTodoChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setInputTodo(e.target.value)
    }

    const handleShowCheckboxTodo = () => {
        setCheckShowTodosCompleted(!checkShowTodosCompleted)
    }

    const handleSaveTodo = () =>{
        const newTodo =  new Todo(selectedTaskId, inputTodo) 
        dispatch(createTodo(newTodo))
        setInputTodo("")
    }

    const handleCheckTodo = (todoId: string) =>{
        dispatch(toggleCompleteTodo(todoId))
    }

    const handleDeleteTodo = (todoId: string) =>{
        dispatch(deleteTodo(todoId))
    }

    const handletDragStartTodo = (e: any, todoId: string) =>{
        dragItemNodeTodo.current = e.target;
        dragItemNodeTodo.current!.addEventListener('dragend', handleDragEndTodo)    
        dragItemTodo.current = todoId;
        setTimeout(() => {
          setIsDraggingTodo(true);
        }, 0)
    }

    const handleDragEnterTodo = (e: any, todoIdTarget: string) =>{
        if (dragItemNodeTodo.current !== e.target) {
            dispatch(draggingTodo({todoId: dragItemTodo.current!, todoIdTarget}))
       }
    }

    const handleDragEndTodo = () => {
        setIsDraggingTodo(false);
        dragItemTodo.current = null;
        dragItemNodeTodo.current!.removeEventListener('dragend', handleDragEndTodo)
        dragItemNodeTodo.current = null;
    }



    

    const toogleDisplayTodo = (isCompletedTodo: boolean) =>{
        if(!checkShowTodosCompleted && isCompletedTodo) return "hide_todo";
        return "todo_item";
    }

    return(
        <div>
            <div className = "add_todo">
                <input value = {inputTodo} onChange = {handleInputTodoChange}/>
                <button style = {{backgroundColor: priorityColor}} onClick = {handleSaveTodo}>Add Task</button>
            </div>
            <div className = "check_completed">
                <input type="checkbox" defaultChecked = {checkShowTodosCompleted} onChange = {handleShowCheckboxTodo}/>
                <span>Show Completed tasks</span>
            </div>

            <div className = "todo_container">
                {todos?.length <= 0 && <span style = {{textAlign: "center", fontSize: 15, marginBottom: 8}}>There aren't any Todo to be seen</span>}
                {todos?.map((todo) => (
                    <div
                         key = {todo.id} 
                         className = {toogleDisplayTodo(todo.isCompleted)}
                         style = {{cursor: 'grab'}}
                         draggable 
                         onDoubleClick = {() => handleCheckTodo(todo.id)}
                         onDragStart={(e) => handletDragStartTodo(e, todo.id)} 
                         onDragEnter={isDraggingTodo ? (e) => {handleDragEnterTodo(e, todo.id)}: undefined}
                         >
                        <div>
                            <span className="iconify" data-icon="ic:baseline-drag-indicator" style = {{cursor: 'grab'}}></span>
                            <span style = {{textDecoration: todo.isCompleted === true ? "line-through" : "inherit", marginLeft: 10, cursor: 'pointer'}}>{todo.nameTodo}</span>
                        </div>
                        <button onClick = {() => handleDeleteTodo(todo.id)}>
                            <span className ="iconify" data-inline="false" data-icon="bi:trash"></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoComponent;