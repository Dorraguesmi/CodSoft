import React from "react";
import "../App.css";

const TaskList = ({ tasks }) => {
  console.log("Tasks:", tasks);

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="card">
            {task.title || "No title found"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
