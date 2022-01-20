import React from "react";
import { ImBin } from "react-icons/im";
import styles from "../Modal/Modal.module.scss";

const Task = ({ task, onChange, remove, disabled }) => {
  return (
    <div>
      <div className={styles.newTaskContent}>
        <label className={styles.checkbox}>
          <input
            data-testid="task-checkbox"
            type="checkbox"
            checked={task.isDone}
            onChange={onChange}
          />
          <span />
        </label>

        <input type="text" placeholder="Task name" value={task.name} disabled />
        {!disabled && <ImBin className={styles.removeBtn} onClick={remove} />}
      </div>
    </div>
  );
};

export default Task;
