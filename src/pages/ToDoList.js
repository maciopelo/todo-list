import React, { useEffect, useState } from 'react';
import "../styles/ToDo.scss"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserToDoLists } from "../redux/services"
import Modal from "../components/Modal"
import { parseDate } from "../helpers"


const ToDoList = () => {

    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false);
    const {todoLists} = useSelector(state => state.user);


    const handleModal = () => {
        setIsModal(true);
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(fetchUserToDoLists({ token }));
      }, []);

  
    return ( 
        <div className="to-do-lists-container">

            <menu className="to-do-lists-menu">
                <input placeholder="Search"/>
                <select placeholder="Search">
                    <option value="sort-by">Sort by</option>
                    <option value="by-date">Date</option>
                    <option value="alph">Alpha</option>
                    <option value="done-task">Done tasks</option>
                </select>
            </menu>

            <ul className="to-do-lists">
             {todoLists.map(todo => {

                const allTasks = todo.task.length
                const doneTasks = todo.task.filter(task => task.isDone).length
                const date = parseDate(todo.created_at)

                 return(
                     <li key={todo.id}>
                         
                         <span className="to-do-name">{todo.name}</span>

                         <span className="to-do-creation-date">{`Created at: ${date}`}</span>
                         
                         <span className="to-do-tasks-status" >
                             {`Completed: ${doneTasks} Uncompleted: ${allTasks-doneTasks} All: ${allTasks}`}
                         </span>
                        
                     </li>
                 )
                 })}

                <div className="add-new-to-do" onClick={handleModal}>
                    <div className="add-new-to-do"/>
                </div>
                
            </ul>

            {isModal && <Modal setIsModal={setIsModal}/>}
        </div>
   
    );
}
 
export default ToDoList;