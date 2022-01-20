/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserToDoLists, removeUserToDoList } from "../../redux/services";
import Modal from "../../components/Modal/Modal";
import ToDoPanel from "../../components/ToDoPanel/ToDoPanel";
import styles from "./ToDoList.module.scss";
import TodoList from "../../components/TodoList/TodoList";

const ToDoList = () => {
  const dispatch = useDispatch();
  const { filteredTodoLists } = useSelector((state) => state.user);

  const [isModal, setIsModal] = useState(false);
  const [chosenToDoIdx, setChosenToDoIdx] = useState(-1);

  const handleNewTodo = (e) => {
    setChosenToDoIdx(-1);
    setIsModal(true);
  };

  const handleExistingTodoClick = (e, idx) => {
    if (e.currentTarget === e.target) {
      setChosenToDoIdx(idx);
      setIsModal(true);
    }
  };

  const handleDelete = async (id) => {
    dispatch(removeUserToDoList(id));
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const foundUserToken = JSON.parse(loggedInUser).token;
    dispatch(fetchUserToDoLists({ foundUserToken }));
  }, []);

  return (
    <main className={styles.todosContainer}>
      <ToDoPanel />

      <ul className={styles.todosListList}>
        {filteredTodoLists.map((todo) => {
          return (
            <TodoList
              todo={todo}
              onClick={handleExistingTodoClick}
              remove={handleDelete}
            />
          );
        })}
      </ul>

      {isModal && (
        <Modal
          setIsModal={setIsModal}
          chosenToDoId={chosenToDoIdx}
          isNewTodoModal={chosenToDoIdx === -1}
        />
      )}

      <div className={styles.newTodoButton} onClick={handleNewTodo} />
    </main>
  );
};

export default ToDoList;
