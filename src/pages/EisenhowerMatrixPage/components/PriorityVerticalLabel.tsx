type PriotityLabelProps = {
    priorityType: 1 | 3
}

const PriorityVerticalLabel = ({priorityType}: PriotityLabelProps) => {
    return(
            <div className="outer">
                {<div className="inner text_priority rotate">{priorityType === 1 ? "Important" : "Not Important"}</div>}
            </div>
    )
}

export default PriorityVerticalLabel