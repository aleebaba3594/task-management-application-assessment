import express from 'express';
import { createTaskController, deleteTaskController, listTasksController, updateTaskController } from '../controllers/taskController.js';

const taskRoutes = express.Router();

// List tasks and filter by completion status (GET)
taskRoutes.get('/', listTasksController);

// Create a task (POST)
taskRoutes.post('/add', createTaskController);

// Update a task to mark it as complete/incomplete (PUT)
taskRoutes.put('/update/:taskId', updateTaskController);

// Delete a task (DELETE)
taskRoutes.delete('/delete/:taskId', deleteTaskController);

export default taskRoutes;
