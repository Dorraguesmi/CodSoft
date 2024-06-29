// Example Mongoose Task model validation
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ["todo", "inprogress", "completed"],
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
