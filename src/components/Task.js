import React from 'react';
import { ImBin } from 'react-icons/im';


const Task = ({task, onChange, remove}) => {

    return (
        <div>
            <div className="new-task-content">
         
                <label class="checkbox">
                    <input 
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChange}
                    />
                    <span/>
                </label>

                <input 
                    type="text" 
                    placeholder="Task name"
                    value={task.name}
                    disabled
                />
                <ImBin className="remove-btn"onClick={remove} />
            </div>

        </div>  
    )

}


export default Task