import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/action-creators/taskActionCreator';
import moment from "moment";
import Modal from '../../../Utils/Modal';
import './ModalTask.css';
import { Task } from '../../../models';
import { priorities, weeks, categories } from '../../../constraints/dummyData'

interface ModalTaskProps{
    task: Task,
    isOpen: boolean,
    onClose: () => void
}

const ModalTaskEdit = ({task, isOpen, onClose}: ModalTaskProps) =>{
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categorySelected, setCategorySelected] = useState(1);
    const [weekDaySelected, setWeekDaySelected] = useState(1);
    const [prioritySelected, setPrioritySelected] = useState(1);
    const [ dueDate, setDueDate ] = useState<Date | null>(null);

    useEffect(()=>{
      setTitle(task.title);
      setDescription(task.description);
      setCategorySelected(task.categoryId)
      setWeekDaySelected(task.weekId);
      setPrioritySelected(task.priorityId);
      setDueDate(task.due)     
    }, [task])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        const updatedTask: Task = {
          id: task.id,
          weekId: weekDaySelected,
          priorityId: prioritySelected,
          categoryId: categorySelected,
          title,
          description,
          due: dueDate,
          isCompleted: task.isCompleted,
          isArchived: task.isArchived
        }

        dispatch(updateTask(updatedTask));

        onClose()
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      setCategorySelected(parseInt(e.target.value))
    }

    const handleSelectWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      setWeekDaySelected(parseInt(e.target.value))
    }

    const handleSelectPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      setPrioritySelected(parseInt(e.target.value))
    }

    return(
        <Modal open={isOpen}>
        <div className = "modal_create" id = "div_moveble">
          <button className = "close_modal" onClick={onClose}>
            <span className="iconify" data-inline="false" data-icon="ant-design:close-outlined"></span>
          </button>
          <form onSubmit = {(e) => handleSubmit(e)}>
            <label>Name Task:</label>
            <input value = {title} onChange = {(e) => setTitle(e.target.value)}/>

            <label>Description:</label> 
            <textarea value = {description} onChange = {(e) => setDescription(e.target.value)}/>

            <div className = "form_group">
              <div className = "date_input">
                <label>Due:</label>
                <input type="date" value = {dueDate ? moment(dueDate).utcOffset('+0100').format("YYYY-MM-DD") : ""} onChange = {(e) => setDueDate(e.target.valueAsDate)}/>
              </div>
              <div className = "category_select">
                <label>Category:</label>
                <select defaultValue = {categorySelected} onChange = {handleCategoryChange}>
                  {categories.map(category => (
                    <option value = {category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className = "form_group">
              <div className = "select_weekday">
                <label>Week Day:</label>
                <select defaultValue = {weekDaySelected} onChange = {handleSelectWeekChange}>
                  {weeks.map(week => (
                    <option value = {week.id}>{week.day}</option>
                  ))}
                </select>   
              </div>
              <div className = "select_priority">
                <label>Priority:</label>
                <select defaultValue = {prioritySelected} onChange = {handleSelectPriorityChange}>
                 {priorities.map(priority => (
                    <option value = {priority.id}>{priority.type}</option>
                  ))}
                </select>  
              </div>
            </div>        

            <button type = "submit">Update</button>
          </form>
        </div>
      </Modal>
    )
}

export default ModalTaskEdit;