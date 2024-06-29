const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create a project
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks");
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).send();
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).send();
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
