type PriotityLabelProps = {
    priorityType:  1 | 2
}

const PriorityHorizontalLabel = ({priorityType}: PriotityLabelProps) => {
    return(
        <div className = "text_priority" >{priorityType === 1 ? "Urgent" : "Not Urgent"}</div>
    )
}

export default PriorityHorizontalLabel