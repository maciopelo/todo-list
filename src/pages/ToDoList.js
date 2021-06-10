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
    const [chosenToDoIdx, setChosenToDoIdx] = useState(-1);
    const {filteredTodoLists} = useSelector(state => state.user);


    const handleNewTodo = () => {
        setChosenToDoIdx(-1);
        setIsModal(true);
    }

    const handleExistingTodoClick = (idx) =>{
        setChosenToDoIdx(idx)
        setIsModal(true);
    }


    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        const foundUserToken = JSON.parse(loggedInUser).token;
        dispatch(fetchUserToDoLists({ foundUserToken }));
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
             {filteredTodoLists.map((todo,idx) => {

                const allTasks = todo.task.length
                const doneTasks = todo.task.filter(task => task.isDone).length
                const date = parseDate(todo.created_at)

                 return(
                     <li key={todo.id} onClick={() => handleExistingTodoClick(idx)}>
                         
                         <span className="to-do-name">{todo.name}</span>

                         <span className="to-do-creation-date">{`Created at: ${date}`}</span>
                         
                         <span className="to-do-tasks-status" >
                             {`Completed: ${doneTasks} Uncompleted: ${allTasks-doneTasks} All: ${allTasks}`}
                         </span>
                        
                     </li>
                 )
                 })}

            <div className="add-new-to-do" onClick={handleNewTodo}>
                <div className="add-new-to-do"/>
            </div>

            </ul>

            {isModal && <Modal setIsModal={setIsModal} chosenToDoIdx={chosenToDoIdx}/>}

            
        </div>
   
    );
}
 
export default ToDoList;