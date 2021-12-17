import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../Utils/Modal'
import './ModalTaskDetails.css';
import { Task } from '../../../models';
import { State } from '../../../store/reducers/rootReducer';
import { categories, priorities } from '../../../constraints/dummyData';
import { toggleArchivedTask } from '../../../store/action-creators/taskActionCreator';
import ModalTaskEdit from '../ModalTask/ModalTaskEdit';
import TodoComponent from './components/TodoComponent';

interface ModalTaskDetailsProps{
    isOpen: boolean,
    selectedTaskId?: string | null,
    onClose: () => void
}

const ModalTaskDetails = ({isOpen, onClose, selectedTaskId}: ModalTaskDetailsProps) => {
    const dispatch = useDispatch();
    const [isModalTaskEditOpen, setIsModalTaskEditOpen] = useState(false)

    useEffect(()=>{
        setIsModalTaskEditOpen(false)
    },[selectedTaskId])

    const task: Task | undefined = useSelector((state: State) => {
        return state.tasks.tasks.find((task) =>{
                return task.id === selectedTaskId;
        })
    });

    const priorityColor = priorities.find((priority) => priority.id === task?.priorityId)
    const categoryTask = categories.find((category) => category.id === task?.categoryId)

    const handleArchiveTask = (taskId: string) =>{
        dispatch(toggleArchivedTask(taskId))
    }

    const handleModalEditTaskOpen = () =>{
        setIsModalTaskEditOpen(true)
    }

    const handleModalEditTaskClose = () =>{
        setIsModalTaskEditOpen(false)
    }

    return(
        <>
        {selectedTaskId && <ModalTaskEdit isOpen = {isModalTaskEditOpen} onClose = {handleModalEditTaskClose} task = {task!}/>}
        <Modal open = {isOpen}>
            <div id = "div_moveble" className = "modal_details">
                <div id = "div_moveble" className = "header" style = {{background: priorityColor?.color}}>
                    <div>
                        <span className="iconify" data-inline="false" data-icon={categoryTask?.icon}></span>
                    </div>
                    <h2>{task?.title}</h2>
                    <div className = "actions">
                        <button onClick = {handleModalEditTaskOpen}>
                            <span className="iconify" data-inline="false" data-icon="bx:bx-edit"></span>
                        </button>
                        <button onClick = {() => handleArchiveTask(task!.id)}>
                            <span className="iconify" data-inline="false" data-icon="bx:bx-archive-out"></span>
                        </button>
                        <button onClick = {onClose}>
                            <span className="iconify" data-inline="false" data-icon="ant-design:close-outlined"></span>
                        </button>
                    </div>
                </div>
                <div className = "content">
                    <p>{task?.description}</p>
                    {selectedTaskId && <TodoComponent
                        priorityColor = {priorityColor?.color}
                        selectedTaskId = {selectedTaskId}
                    />}
                </div>
            </div>
        </Modal>
        </>
    )
}

export default ModalTaskDetails;