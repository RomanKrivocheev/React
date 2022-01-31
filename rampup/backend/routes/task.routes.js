const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

router.post("/", async (req, res) => {
  const { id, task, complete } = req.body;
  const newTask = new Task({ id, task, complete });
  await newTask.save();
  res.json({ status: "Task saved" });
});

router.put("/:id", async (req, res) => {
  let updates = req.body;
  Task.findOneAndUpdate({ id: req.params.id }, updates, { new: true })
    .then(async (updatedTask) => {
      const tasks = await Task.find();
      res.json(tasks);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/", async (req, res) => {
    await Task.deleteMany({});
    res.json({ status: "All tasks deleted" });
});

router.delete("/deleteManys", async (req, res) => {
    await Task.deleteMany({});
    
    req.body.forEach(async taskN => {
        const { id, task, complete } = taskN;
        const newTask = new Task({ id, task, complete });
        await newTask.save();
    });
    res.json("Deleted many");
});

module.exports = router;
