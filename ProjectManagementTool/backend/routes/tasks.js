const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a task
router.post("/", async (req, res) => {
  try {
    const { title, description, project, deadline, status } = req.body;

    // Validate required fields
    if (!title || !project || !status) {
      return res
        .status(400)
        .json({ message: "Title, project, and status are required fields." });
    }

    // Check if the project ID is valid
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    // Create and save the task
    const task = new Task({
      title,
      description,
      project,
      deadline,
      status,
    });

    await task.save();

    // Update the project with the new task
    projectExists.tasks.push(task._id);
    await projectExists.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task.", error });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, project, deadline, status } = req.body;

    // Validate required fields
    if (!title || !project || !status) {
      return res
        .status(400)
        .json({ message: "Title, project, and status are required fields." });
    }

    // Check if the project ID is valid
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    // Find and update the task
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, project, deadline, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task.", error });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Remove the task reference from the project
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    res.status(200).json({ message: "Task deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task.", error });
  }
});

module.exports = router;
