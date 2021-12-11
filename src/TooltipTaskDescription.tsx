import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from "./models/Todo";
import { State } from './store/reducers/rootReducer';
import "./TooltipTaskDescription.css"

interface TooltipTaskDescriptionProps{
    priorityId: number,
    taskId: string,
    description: string

}

const TooltipTaskDescription = ({priorityId, taskId, description}: TooltipTaskDescriptionProps) =>{
    
    const todos: Todo[] = useSelector((state: State) => {
        return state.todos.todos.filter((todo) =>{
                return todo.taskId === taskId;
        })
    });

    let completedTodos = 0;

    
    todos.forEach((todo)=> {
        if(todo.isCompleted === true){ completedTodos += 1 }
    })
    

    

    const getClassPosition = (priorityId: number) =>{
        if(priorityId === 2 || priorityId === 4){
          return 'right'
        } 
        return 'left'
    }

    return(
        <div className={`tooltip ${getClassPosition(priorityId)}`}>
            <span>{description}</span>
            {todos.length > 0 &&
                <span className = "todo_count">
                    Tasks: {completedTodos} / {todos.length} completed
                </span>
            }
        </div>
    )
}

export default TooltipTaskDescription;