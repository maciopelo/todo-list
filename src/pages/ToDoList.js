import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { fetchUserToDoLists } from "../redux/services"


const ToDoList = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { email, login, todoLists} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUserToDoLists({ token: localStorage.getItem('token') }));
      }, []);

  
    return ( 
        <div>
             <h1>ToDoList</h1>
             <h2>{email}</h2>
             <h2>{login}</h2>

             {todoLists.map(todo => {
                 return(
                     <div>
                         <span>{todo.name}</span>
                         <span>{todo.created_at}</span>
                     </div>
                 )
             })}
        </div>
   
    );
}
 
export default ToDoList;