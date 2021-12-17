import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";
import { Task } from "../../../models";
import { removeSelectedTaskId, setSelectedTaskId, toggleCompleteTask } from '../../../store/action-creators/taskActionCreator';
import { State } from "../../../store/reducers/rootReducer"
import TooltipTaskDescription from './TooltipTaskDescription';
import ModalTaskDetails from "../ModalTaskDetails/ModalTaskDetails";
import { categories } from '../../../constraints/dummyData';

type TypeProps = {
    weekId: number,
    priorityId: number,
    dragging: boolean,
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>, item: {weekId: number, priorityId: number, taskId: string | number}) => void,
    handletDragStart: (e: React.DragEvent<HTMLDivElement>, item: {weekId: number, priorityId: number, taskId: string}) => void
}

const TaskItem = ({ weekId, priorityId, dragging, handleDragEnter, handletDragStart }: TypeProps) =>{
    const [ isModalTaskDetailsOpen, setIsModalTaskDetailsOpen ] = useState(false)
    const dispatch = useDispatch();
    
    /** Variables time to define if it's a single or double click **/
    let timer: ReturnType<typeof setTimeout>;
    let delay = 300;
    let prevent = false;

    const selectedTaskId: string | null = useSelector((state: State) => state.tasks.selectedTaskId);

    const filteredTasks: Task[] = useSelector((state: State) => {
        return state.tasks.tasks.filter(task =>{
                return task.weekId === weekId && task.priorityId === priorityId && task.isArchived !== true;
            })
    });

    


    const handleToggledCompleteTask = (id: string): void =>{
        clearTimeout(timer);
        prevent = true;
        dispatch(toggleCompleteTask(id));
        setTimeout(() => {
            prevent = false;
        }, delay);
    }

    const handleOpenModalTaskDetails = (id: string): void => {
        timer = setTimeout(() => {
            if (!prevent) {
                dispatch(setSelectedTaskId(id));
                setIsModalTaskDetailsOpen(true);
            }
        }, delay);      
    }

    const handleCloseModalTaskDetails = (): void => {
        dispatch(removeSelectedTaskId())
        setIsModalTaskDetailsOpen(false)
    }

    const getCategoryItem = (categoryId: number) =>{
        const category = categories.find((category) => category.id === categoryId)
        return category?.icon
    }

    return(
        <>
        {selectedTaskId !== null &&
            <ModalTaskDetails isOpen = {isModalTaskDetailsOpen} onClose = {handleCloseModalTaskDetails} selectedTaskId = {selectedTaskId}/>
        }

        {filteredTasks.length > 0 && 
            filteredTasks.map((task, indexTask) =>
                <div className="card-item" 
                    id = {task.id}
                     draggable 
                     onClick = {() => handleOpenModalTaskDetails(task.id)}
                     onDoubleClick = {() => handleToggledCompleteTask(task.id)}
                     onDragStart = {(e) => handletDragStart(e, {weekId, priorityId, taskId: task.id})}
                     onDragEnter={dragging ? (e) => handleDragEnter(e, {weekId, priorityId, taskId: task.id}) : undefined}
                    >
                        <div className = "info">
                            <div style = {{display: "flex", alignItems: 'center'}}>
                                <span className="iconify" data-inline="false" data-icon = {getCategoryItem(task.categoryId)}></span>
                                <p style = {{textDecoration: task.isCompleted ? "line-through": "inherit"}}>{task.title}</p>
                            </div>
                            {task.due && <div className = "due_date"><span>{moment(task.due).utcOffset('+0100').format("DD/MM")}</span></div>}
                        </div>
                    {task.description &&
                        <TooltipTaskDescription taskId={task.id} description = {task.description} priorityId = {priorityId}/>
                    }
                </div>
            )
        }
        </>
    )
}

export default TaskItem;