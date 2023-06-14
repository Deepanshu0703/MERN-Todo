// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());    
// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Middleware
app.use(express.json());

// Task model
const Task = mongoose.model('Task', {
  title: String,
  description: String,
  status: String,
});

// Routes
// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a task
app.post('/api/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  const task = new Task({
    title,
    description,
    status,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    else{
      res.json({ message: 'Task updated successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
