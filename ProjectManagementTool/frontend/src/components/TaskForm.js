import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const TaskForm = ({ projects }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    deadline: "",
    status: "todo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title: formData.title,
        description: formData.description,
        project: formData.project,
        deadline: formData.deadline,
        status: formData.status,
      });

      console.log("Task added:", response.data);
      // Reset form or update state as needed
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Project</label>
        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          required
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
