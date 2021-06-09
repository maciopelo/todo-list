import React, {useState} from 'react';
import "../styles/Modal.scss"
import Task from "../components/Task"
import axios from "../redux/services/config"
import { fetchUserToDoLists } from "../redux/services"
import {  useDispatch } from "react-redux"



const Modal = ({setIsModal}) => {

    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [toDoListName, setToDoListName] = useState("");
    const [newTask, setTask]  = useState({name:"", isDone:false})


    const handleTaskAddition = () => {
        if(Boolean(newTask.name.match(/^(?!\s*$).+/))){
            setTask({name:"", isDone:false})
            setTasks(prev => [...prev, newTask])
        }
    }

    const handleTaskState = (e) => {
        setTask(prev => ({...prev, isDone:e.target.checked}))
    }

    const handleTaskName = (e) => {
        setTask(prev => ({...prev, name:e.target.value}))
    }


    const handleModalClose = () => {
        setIsModal(false)
    }

    const handleMessage = (message) => {
        setMessage(message)
        setTimeout(()=>{
            setMessage("")
        }, 3500)
    }

    const handleClear = () => {
        setToDoListName("")
        setTasks([])
    }

    const hadleToDoSave = async () => {
        if(Boolean(toDoListName.match(/^(?!\s*$).+/))){

            const token = localStorage.getItem('token')

            const data = {
                name:toDoListName,
                task:tasks
            }
    
            const response = await axios.post("to-do-lists", data, {
                headers: {
                    Authorization:"Bearer " + token
                }
            })

            dispatch(fetchUserToDoLists({ token }));
            handleClear();
            handleMessage("New todo list has been added");

        }else{
            handleMessage("Please insert a new todo list name");
        }
    }

    const handleExistingTaskState = (idx) => {
        const newTasks = [...tasks]
        newTasks[idx].isDone = !newTasks[idx].isDone
        setTasks(newTasks)
    }

    const handleTaskRemove = (idx) => {
        const newTasks = tasks.filter((_,i) => i !== idx)
        setTasks(newTasks)
    }

    return(
        <div className="modal-container">
            <div className="modal-content">
                <input 
                    className="new-todo-name" 
                    type="text" 
                    placeholder="List name"
                    value={toDoListName}
                    onChange={(e) => setToDoListName(e.target.value)}
                />

                <div className="divider"/>

                <div className="todo-tasks">
                    <ul>
                        {tasks.map((task,idx) => (
                            <Task 
                                key={idx}
                                task={task}
                                onChange={() => handleExistingTaskState(idx)}
                                remove={() => handleTaskRemove(idx)}
                            />
                        ))}
                    </ul>

                    <>
                        <div className="new-task-content">

                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={newTask.isDone}
                                    onChange={handleTaskState}
                                />
                                <span/>
                            </label>

                            <input 
                                type="text" 
                                placeholder="Task name"
                                value={newTask.name}
                                onChange={handleTaskName}
                            />
                        </div>

                        <div className="add-new-task-menu">
                            <button 
                                className="cancel-new-todo" 
                                onClick={() => setTask({name:"", isDone:false})}
                            >Cancel</button>

                            <button 
                                className="add-new-todo" 
                                onClick={handleTaskAddition}
                            >Add</button>
                        </div>
                    </> 
                            
                </div>

                <div className="modal-footer">
                    <p className="modal-close" onClick={handleModalClose} >Cancel</p>
                    { Boolean(message) && <p className="modal-message">{message}</p>}
                    <button className="save-todo-btn"onClick={hadleToDoSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;