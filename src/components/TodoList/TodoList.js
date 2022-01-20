import React from "react";
import { parseDate } from "../../helpers";
import styles from "./TodoList.module.scss";

const TodoList = ({ todo, onClick, remove }) => {
  const allTasks = todo.tasks.length;
  const doneTasks = todo.tasks.filter((task) => task.isDone).length;
  const date = parseDate(todo.created_at);

  return (
    <li
      key={todo.id}
      className={styles.todoListItem}
      onClick={(e) => onClick(e, todo.id)}
    >
      <span>{todo.name}</span>

      <span>{`Created at: ${date}`}</span>

      <span>
        <span>{`Completed: ${doneTasks}`}</span>

        <span>{`Uncompleted: ${allTasks - doneTasks}`}</span>

        <span>{`All: ${allTasks}`}</span>
      </span>

      <button
        className={styles.removeTodoButton}
        onClick={() => remove(todo.id)}
      >
        delete
      </button>
    </li>
  );
};

export default TodoList;
