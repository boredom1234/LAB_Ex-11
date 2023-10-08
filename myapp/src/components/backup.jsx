import React, { useState, useEffect } from "react";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

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
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask("");

      // Update local storage with the new task list
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedTask;
    setTasks(updatedTasks);
    setEditTask(null);
    setEditedTask("");
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
  }, [tasks]); // This effect will run whenever tasks change

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
              <th style={{paddingRight:"150px", fontSize: "20px", textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}  className="font-bold">
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
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.text}
                    </span>
                  )}
                </td>
                <td style={{ paddingLeft: "0px", paddingRight: "50px"}}>
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
    </div>
  );
};

export default TaskList;
