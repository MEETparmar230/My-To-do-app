const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});


// Add new todo
router.post("/", async (req, res) => {
  try{
  const newTodo = new Todo({ text: req.body.text });
  const saved = await newTodo.save();
  res.json({saved,message: "Task added" })
}
  catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// mark-all
router.put("/mark-all", async (req, res) => {
  try {
    await Todo.updateMany({}, { completed: true });
    const updatedTodos = await Todo.find();
    res.json(updatedTodos);
  } catch (err) {
    console.error("Mark all error:", err);
    res.status(500).json({ error: "Failed to mark all", details: err.message });
  }
});


// Toggle a todo (toggle complete)
router.put("/:id", async (req, res) => {
  try {
    // Make sure we have a valid request body
    if (!req.body || typeof req.body.completed === 'undefined') {
      return res.status(400).json({ error: "Completed status is required" });
    }

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Toggle failed:", error);
    res.status(500).json({ error: "Failed to update todo state" });
  }
});




// Delete a todo
router.delete("/:id", async (req, res) => {
  try{
  const todos = await Todo.findByIdAndDelete(req.params.id);
  res.json({ todos,message: "Task Deleted" });
}
  catch (error) {
    res.status(500).json({ error: "Failed to delete todos" });
  }
});

//Delete all todos
router.delete("/", async (req, res) => {
  try{
  const todos = await Todo.deleteMany({});
  res.json({ deleted: todos.deletedCount, message: "All tasks deleted" });
  }
  catch (error) {
    res.status(500).json({ error: "Failed delete todos" });
  }
});






module.exports = router;
