import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../../store/action-creators/taskActionCreator';
import Modal from '../../../Utils/Modal';
import './ModalTask.css';
import { Task } from '../../../models';
import { priorities, weeks, categories } from '../../../constraints/dummyData'

interface ModalTaskProps{
    isOpen: boolean,
    onClose: () => void
}

const ModalTask = ({isOpen, onClose}: ModalTaskProps) =>{
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categorySelected, setCategorySelected] = useState(1);
    const [weekDaySelected, setWeekDaySelected] = useState(1);
    const [prioritySelected, setPrioritySelected] = useState(1);
    const [ dueDate, setDueDate ] = useState<Date | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();     
        const newTask = new Task(
          weekDaySelected,
          prioritySelected,
          categorySelected,
          title,
          description,
          dueDate
        )

        dispatch(createTask(newTask));

        onClose();

        setTitle("");
        setDescription("");
        setDueDate(null)
        setCategorySelected(1);
        setWeekDaySelected(1);
        setPrioritySelected(1);
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
                <input type="date" onChange = {(e) => setDueDate(e.target.valueAsDate)}/>
              </div>
              <div className = "category_select">
                <label>Category:</label>
                <select onChange = {handleCategoryChange}>
                  {categories.map(category => (
                    <option value = {category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className = "form_group">
              <div className = "select_weekday">
                <label>Week Day:</label>
                <select onChange = {handleSelectWeekChange}>
                  {weeks.map(week => (
                    <option value = {week.id}>{week.day}</option>
                  ))}
                </select>   
              </div>
              <div className = "select_priority">
                <label>Priority:</label>
                <select onChange = {handleSelectPriorityChange}>
                  {priorities.map(priority => (
                    <option value = {priority.id}>{priority.type}</option>
                  ))}
                </select>  
              </div>
            </div>        

            <button type = "submit">Save</button>
          </form>
        </div>
      </Modal>
    )
}

export default ModalTask;