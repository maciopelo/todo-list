import React from 'react';
import { ImBin } from 'react-icons/im';


const Task = ({task, onChange, remove, disabled}) => {

    return (
        <div>
            <div className="new-task-content">
         
                <label className="checkbox">
                    <input
                        data-testid="task-checkbox"
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    <span/>
                </label>

                <input 
                    type="text" 
                    placeholder="Task name"
                    value={task.name}
                    disabled
                />
                {!disabled && <ImBin className="remove-btn" onClick={remove} />}
            </div>

        </div>  
    )

}


export default Task