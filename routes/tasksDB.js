const express = require("express");
const router = express.Router();
const config = require("config");
const { Task, schema } = require("../models/task.js");
const auth = require("../middleware/auth");

// Create a task
router.post("/", auth, async (req, res) => {
  let task = {
    title: req.body.title,
    task: req.body.task,
    owner: req.user._id,
    category: req.body.category,
    severity: req.body.severity,
    completed: req.body.completed,
  };

  const { error, value } = schema.validate(task);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    task = new Task(value);
    try {
      task = await task.save();
      res.send("Task added successfully... \n" + task);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Read all tasks by author
router.get("/", auth, async (req, res) => {
  try {
    if (config.get("requireAuth") === false) {
      const tasks = await Task.find();
      res.send(tasks);
    }

    if (config.get("requireAuth") === true) {
      const tasks = await Task.find({ owner: req.user._id });
      res.send(tasks);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Read a single task
router.get("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send("The task with the given ID was not found.");
  }

  if (config.get("requireAuth") === true) {
    if (task.owner != req.user._id) {
      return res.status(401).send("Access denied.");
    }
  }

  res.send(task);
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  let requestedTask = {
    title: req.body.title,
    task: req.body.task,
    owner: req.user._id,
    category: req.body.category,
    severity: req.body.severity,
    completed: req.body.completed,
  };
  const { error, value } = schema.validate(requestedTask);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const currentTask = await Task.findById(req.params.id);
      if (!currentTask) {
        return res
          .status(404)
          .send("The task with the given ID was not found.");
      }
      if (
        currentTask.owner != req.user._id &&
        config.get("requireAuth") === true
      ) {
        return res.status(401).send("Access denied.");
      }
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, value, {
        new: true,
      });
      res.send("Task updated successfully... \n" + updatedTask);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  const currentTask = await Task.findById(req.params.id);
  if (!currentTask) {
    return res.status(404).send("The task with the given ID was not found.");
  }
  if (currentTask.owner != req.user._id && config.get("requireAuth") === true) {
    return res.status(401).send("Access denied.");
  }
  const removedTask = await Task.findByIdAndRemove(req.params.id);
  res.send(removedTask);
});

module.exports = router;
