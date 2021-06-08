import React, { useEffect } from 'react';
import "../styles/ToDo.scss"
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchUserToDoLists } from "../redux/services"


const parseDate = (date) =>{
    const result = date.substr(0,10).split("-")
    return `${result[2]}-${result[1]}-${result[0]}`
}

const ToDoList = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { email, login, todoLists} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUserToDoLists({ token: localStorage.getItem('token') }));
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

                console.log(todo)

                const allTasks = todo.task.length
                const doneTasks = todo.task.filter(task => task.isDone).length
                const date = parseDate(todo.created_at)

                 return(
                     <li key={todo.id}>
                         
                         <span>{todo.name}</span>
                         <span>{`Created at: ${date}`}</span>
                         
                         <span>{`Completed: ${doneTasks} Uncompleted: ${allTasks-doneTasks} All: ${allTasks-doneTasks}`}</span>
                        
                     </li>
                 )
                 })}
            </ul>
        </div>
   
    );
}
 
export default ToDoList;