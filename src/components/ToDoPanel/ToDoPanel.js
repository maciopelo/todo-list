import React from "react";
import { useDispatch } from "react-redux";
import { SORT } from "../../helpers";
import { searchToDoList, sortToDoListsBy } from "../../redux/slices/UserSlice";
import styles from "./ToDoPanel.module.scss";

const ToDoPanel = () => {
  const dispatch = useDispatch();

  return (
    <menu className={styles.todoPanel}>
      <input
        className={styles.search}
        placeholder="Search"
        onChange={(e) => dispatch(searchToDoList(e.target.value))}
      />

      <select
        className={styles.select}
        placeholder="Search"
        onChange={(e) => dispatch(sortToDoListsBy(e.target.value))}
      >
        <option value={SORT.BY_DATE}>Sort by</option>
        <option value={SORT.ALPH}>alphabetically</option>
        <option value={SORT.BY_DONE}>by done tasks</option>
        <option value={SORT.BY_UNDONE}>by undone tasks</option>
      </select>
    </menu>
  );
};

export default ToDoPanel;
