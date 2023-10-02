const express = require("express");
const router = express.Router();
const Task = require("./TaskModal");

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task({
    description: req.body.description,
  });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const removedTask = await Task.findByIdAndDelete(req.params.id);
    res.json(removedTask);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
