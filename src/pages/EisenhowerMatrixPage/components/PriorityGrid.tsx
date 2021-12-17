import React, { useRef } from "react";
import { useDispatch } from 'react-redux'
import { priorities } from "../../../constraints/dummyData"
import PriorityHorizontalLabel from "./PriorityHorizontalLabel";
import PriorityVerticalLabel from "./PriorityVerticalLabel";
import { draggingTask } from "../../../store/action-creators/taskActionCreator";
import TaskItem from "./TaskItem";

type itemDragged = {
    weekId: number, priorityId: number, taskId: string | number
}

type PriotityGridProps = {
    weekId: number,
    dragging: boolean,
    onDragging: (isDragging: boolean) => void,
    draggedItem: itemDragged | null
    onDragged: (item: itemDragged | null) => void
}



const PriorityGrid = ({ weekId, dragging, onDragging, draggedItem, onDragged }: PriotityGridProps) =>{
    const dispatch = useDispatch();
    const dragItemNode = useRef<HTMLDivElement | null>(null);

    const handletDragStart = (e: React.DragEvent<HTMLDivElement>, item: itemDragged) => {
        dragItemNode.current = e.target as HTMLDivElement;
        dragItemNode.current!.classList.add("remove_hover")
        dragItemNode.current!.addEventListener('dragend', handleDragEnd)    

        onDragged(item)
   
        setTimeout(() => {
          onDragging(true);
        }, 0)
    }
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetItem: itemDragged) => {
        if (dragItemNode.current !== e.target) {
            draggedItem && dispatch(draggingTask({
                targetItem, 
                indexItem: draggedItem
            }))          
       }        
    }

    

    const handleDragEnd = () => {
        onDragging(false)
        onDragged(null);
        dragItemNode.current!.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }

    return(
        <div className="priority_grid">
            {
                priorities.map((priority) => 
                <div style = {{display: "flex"}} key = {priority.id}>
                    {(priority.id === 1 || priority.id === 3) && (
                            <PriorityVerticalLabel priorityType = {priority.id}/> 
                        )
                    }

                    <div className = "container_mobile_priority">
                        {(priority.id === 1 || priority.id === 2) && (
                            <PriorityHorizontalLabel priorityType = {priority.id}/>
                        )}

                        <div className="card_priority"
                            style={{ backgroundColor: priority.color }} 
                            onDragEnter={dragging ? (e) => handleDragEnter(e, {weekId, priorityId: priority.id, taskId: 0}) : undefined }
                            onDragOver = {(e) => e.preventDefault()}
                        >

                            <TaskItem
                                weekId = {weekId}
                                priorityId = {priority.id}
                                dragging = {dragging}
                                handleDragEnter = {handleDragEnter}
                                handletDragStart = {handletDragStart}
                            />
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default PriorityGrid;