import React, { useState, useEffect } from "react";
import "../styles/Modal.scss";
import Task from "../components/Task";
import axios from "../redux/services/config";
import { fetchUserToDoLists } from "../redux/services";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ setIsModal, chosenToDoId, isNewTodoModal }) => {
  const dispatch = useDispatch();
  const { filteredTodoLists } = useSelector((state) => state.user);

  const [toDoListName, setToDoListName] = useState("");
  const [tasks, setTasks] = useState([]);

  const [message, setMessage] = useState("");
  const [newTask, setTask] = useState({ name: "", isDone: false });

  useEffect(() => {
    if (!isNewTodoModal) {
      const todoList = filteredTodoLists.filter(
        (list) => list.id === chosenToDoId
      )[0];
      setToDoListName(todoList.name);
      setTasks(todoList.tasks);
    }
  }, [filteredTodoLists, chosenToDoId, isNewTodoModal]);

  const handleTaskAddition = () => {
    if (Boolean(newTask.name.match(/^(?!\s*$).+/))) {
      setTask({ name: "", isDone: false });
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const handleTaskState = (e) => {
    setTask((prev) => ({ ...prev, isDone: e.target.checked }));
  };

  const handleTaskName = (e) => {
    setTask((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3500);
  };

  const handleClear = () => {
    setToDoListName("");
    setTasks([]);
  };

  const validateToDoListName = () => {
    if (!Boolean(toDoListName.match(/^(?!\s*$).+/))) {
      handleMessage("Please insert a new todo list name");
      return false;
    }
    return true;
  };

  const hadleToDoSave = async () => {
    let valid = validateToDoListName();
    if (valid) {
      const loggedInUser = localStorage.getItem("user");
      const foundUserToken = JSON.parse(loggedInUser).token;

      const data = {
        id: chosenToDoId,
        name: toDoListName,
        tasks: tasks,
      };

      const isPost = isNewTodoModal ? true : false;

      try {
        if (isPost) {
          await axios.post("to-do-lists", data, {
            headers: {
              Authorization: "Bearer " + foundUserToken,
            },
          });
        } else {
          await axios.put(`to-do-lists/${chosenToDoId}`, data, {
            headers: {
              Authorization: "Bearer " + foundUserToken,
            },
          });
        }
      } catch (e) {
        console.log("Error " + e.response.data);
      }

      dispatch(fetchUserToDoLists({ foundUserToken }));
      handleClear();
      handleMessage("New todo list has been added");
    }
  };

  const handleExistingTaskState = (idx) => {
    setTasks((prev) =>
      prev.map((item, i) => {
        if (i === idx) return { ...item, isDone: !item.isDone };

        return item;
      })
    );
  };

  const handleTaskRemove = (idx) => {
    const newTasks = tasks.filter((_, i) => i !== idx);
    setTasks(newTasks);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <input
          className="new-todo-name"
          type="text"
          placeholder="List name"
          value={toDoListName}
          onChange={(e) => setToDoListName(e.target.value)}
        />

        <div className="divider" />

        <div className="todo-tasks">
          <ul>
            {tasks.map((task, idx) => (
              <Task
                key={idx}
                task={task}
                onChange={() => handleExistingTaskState(idx)}
                remove={() => handleTaskRemove(idx)}
                disabled={!isNewTodoModal}
              />
            ))}
          </ul>
          {isNewTodoModal && (
            <>
              <div className="new-task-content">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={newTask.isDone}
                    onChange={handleTaskState}
                  />
                  <span />
                </label>

                <input
                  type="text"
                  placeholder="Task name"
                  value={newTask.name}
                  onChange={handleTaskName}
                />
              </div>

              <div className="add-new-task-menu">
                <button
                  className="cancel-new-todo"
                  onClick={() => setTask({ name: "", isDone: false })}
                >
                  Cancel
                </button>

                <button className="add-new-todo" onClick={handleTaskAddition}>
                  Add
                </button>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <p className="modal-close" onClick={handleModalClose}>
            Cancel
          </p>
          {Boolean(message) && <p className="modal-message">{message}</p>}

          <button className="save-todo-btn" onClick={hadleToDoSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
