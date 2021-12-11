import "./TooltipTaskDescription.css"

interface TooltipTaskDescriptionProps{
    priorityId: number,
    description: string

}

const TooltipTaskDescription = ({priorityId, description}: TooltipTaskDescriptionProps) =>{

    const getClassPosition = (priorityId: number) =>{
        if(priorityId === 2 || priorityId === 4){
          return 'right'
        } 
        return 'left'
    }

    return(
        <div className={`tooltip ${getClassPosition(priorityId)}`}>
            <span>{description}</span>
            {/* {todoLength <= 0 &&
                <span className = "todo_count">
                    Tasks: {countCompletedTodos(item.todos)} / {item.todos.length} completed
                </span>
            } */}
        </div>
    )
}

export default TooltipTaskDescription;