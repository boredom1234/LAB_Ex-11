import React, { useState, useEffect } from "react";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [editWarningMessage, setEditWarningMessage] = useState("");

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log("Stored tasks:", storedTasks);
      if (storedTasks.length > 0) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Error loading tasks from local storage:", error);
    }
  }, []);

  const addTask = () => {
    if (!newTask || newTask.trim() === "") {
      // Show a warning message
      setWarningMessage("Warning: Please enter a valid task before adding.");
      // Clear the warning message after 3 seconds
      setTimeout(() => {
        setWarningMessage("");
      }, 3000);
      return; // Don't add an empty task
    }

    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask("");

    // Update local storage with the new task list
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (index, updatedTask) => {
    if (!updatedTask || updatedTask.trim() === "") {
      // Show a warning message for empty task when editing
      setEditWarningMessage("Warning: Task cannot be empty.");
      // Clear the warning message after 3 seconds
      setTimeout(() => {
        setEditWarningMessage("");
      }, 3000);
      return; // Don't update with an empty task
    }

    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedTask;
    setTasks(updatedTasks);
    setEditTask(null);
    setEditedTask("");

    // Update local storage with the edited task list
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleEditInputChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleEditClick = (index) => {
    setEditedTask(tasks[index].text);
    setEditTask(index);
  };

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className="navbar bg-secondary text-primary-content">
        <a className="btn btn-ghost normal-case text-lg">Only List</a>
      </div>
      <br />
      <br />
      <div className="flex justify-center items-center join">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          className="input input-bordered join-item"
          onChange={(e) => setNewTask(e.target.value)}
        />
        &nbsp;
        <button
          className="btn join-item rounded-r-full btn-warning"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th
                style={{ width: "5%", fontSize: "20px", textAlign: "center" }}
              >
                Completed
              </th>
              <th style={{ width: "85%", fontSize: "20px", textAlign: "center" }}>
                To-Do
              </th>
              <th style={{ paddingRight: "150px", fontSize: "20px", textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="font-bold">
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="checkbox checkbox-success"
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  {editTask === index ? (
                    <div className="flex justify-center items-center join">
                      <input
                        type="text"
                        value={editedTask}
                        onChange={handleEditInputChange}
                        className="input input-md input-bordered join-item"
                      />
                      &nbsp;
                      <button
                        className="btn btn-md join-item rounded-r-full btn-warning"
                        onClick={() => updateTask(index, editedTask)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                    >
                      {task.text}
                    </span>
                  )}
                </td>
                <td style={{ paddingLeft: "0px", paddingRight: "50px" }}>
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add task warning message with fade-out effect */}
      {warningMessage && (
        <div className="alert alert-warning fade-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Edit task warning message with fade-out effect */}
      {editWarningMessage && (
        <div className="alert alert-warning fade-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{editWarningMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TaskList;
