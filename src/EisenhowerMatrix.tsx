import { useState } from "react";
import { weeks } from "./constraints/dummyData"
import ModalTask from "./ModalTask";
import PriorityGrid from "./PriorityGrid";

type itemDragged = {
    weekId: number, priorityId: number, taskId: string | number
}

const EisenhowerMatrix = () =>{
    const [ isModalTaskOpen, setIsModalTaskOpen ] = useState(false)
    const [draggedItem, setDraggedItem] = useState<itemDragged | null>(null)
    const [dragging, setDragging] = useState(false);

    const handleCloseModalTask = () =>{
        setIsModalTaskOpen(false);
    }

    const handleOpenModalTask = () =>{
        setIsModalTaskOpen(true);
    }

    const handleDragged = (item: itemDragged | null) =>{
        setDraggedItem(item)
    }

    const handleSetIsDragging = (isDragging: boolean) =>{
        setDragging(isDragging)
    }

    return(
        <>
        <ModalTask isOpen = {isModalTaskOpen} onClose = {handleCloseModalTask} />
        <div className = "week">
            {
                weeks.map((week, indexWeek)=>
                    <div className="card" key = {week.id}>
                        <h1>{week.day}</h1>  
                        <PriorityGrid weekId = {week.id} dragging = {dragging} onDragging = {handleSetIsDragging} draggedItem = {draggedItem} onDragged = {handleDragged}/> 
                    </div>
                )
            }
        </div>
        {!isModalTaskOpen && <button className = "btn_add" onClick = {handleOpenModalTask}>+</button>}
        </>
    )
}

export default EisenhowerMatrix;