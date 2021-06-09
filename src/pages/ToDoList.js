import React, { useEffect, useState } from 'react';
import "../styles/ToDo.scss"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserToDoLists } from "../redux/services"
import Modal from "../components/Modal"
import { parseDate } from "../helpers"
import { sortToDoListsBy, searchToDoList } from "../redux/slices/UserSlice"
import { SORT } from "../helpers"


const ToDoList = () => {

    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false);
    const {filteredTodoLists} = useSelector(state => state.user);


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
                <input placeholder="Search" onChange={(e) => dispatch(searchToDoList(e.target.value))}/>

                
                <select placeholder="Search" onChange={(e)=> dispatch(sortToDoListsBy(e.target.value))}>
                    <option value={SORT.BY_DATE}>Sort by</option> 
                    <option value={SORT.ALPH}>alphabetically</option>
                    <option value={SORT.BY_DONE}>by done tasks</option>
                    <option value={SORT.BY_UNDONE}>by undone tasks</option>
                </select>


            </menu>

            <ul className="to-do-lists">
             {filteredTodoLists.map(todo => {

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