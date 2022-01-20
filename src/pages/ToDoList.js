/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import "../styles/ToDo.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserToDoLists, removeUserToDoList } from "../redux/services";
import Modal from "../components/Modal";
import { parseDate } from "../helpers";
import { sortToDoListsBy, searchToDoList } from "../redux/slices/UserSlice";
import { SORT } from "../helpers";

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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const foundUserToken = JSON.parse(loggedInUser).token;
    dispatch(fetchUserToDoLists({ foundUserToken }));
  }, []);

  const handleDelete = async (id) => {
    dispatch(removeUserToDoList(id));
  };

  return (
    <div className="to-do-lists-container">
      <menu className="to-do-lists-menu">
        <input
          placeholder="Search"
          onChange={(e) => dispatch(searchToDoList(e.target.value))}
        />

        <select
          placeholder="Search"
          onChange={(e) => dispatch(sortToDoListsBy(e.target.value))}
        >
          <option value={SORT.BY_DATE}>Sort by</option>
          <option value={SORT.ALPH}>alphabetically</option>
          <option value={SORT.BY_DONE}>by done tasks</option>
          <option value={SORT.BY_UNDONE}>by undone tasks</option>
        </select>
      </menu>

      <ul className="to-do-lists">
        {filteredTodoLists.map((todo, idx) => {
          const allTasks = todo.tasks.length;
          const doneTasks = todo.tasks.filter((task) => task.isDone).length;
          const date = parseDate(todo.created_at);

          return (
            <li
              key={todo.id}
              onClick={(e) => handleExistingTodoClick(e, todo.id)}
            >
              <span className="to-do-name">{todo.name}</span>

              <span className="to-do-creation-date">{`Created at: ${date}`}</span>

              <span className="to-do-tasks-status">
                {`Completed: ${doneTasks} Uncompleted: ${
                  allTasks - doneTasks
                } All: ${allTasks}`}
              </span>
              <button onClick={() => handleDelete(todo.id)}>delete</button>
            </li>
          );
        })}

        <div className="add-new-to-do" onClick={handleNewTodo}>
          <div className="add-new-to-do" />
        </div>
      </ul>

      {isModal && (
        <Modal
          setIsModal={setIsModal}
          chosenToDoId={chosenToDoIdx}
          isNewTodoModal={chosenToDoIdx === -1}
        />
      )}
    </div>
  );
};

export default ToDoList;
