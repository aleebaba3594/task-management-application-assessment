import { createTask, deleteTask, listTasks, updateTask } from "../services/taskService.js";

// controller to post (add) tasks
export async function createTaskController(req, res) {
  try {
    const data = req.body;
    const newTask = await createTask(data);
    res.status(201).json({ data: newTask, message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating the task.' });
  }
}

// controller for listing tasks filtered by completion status
export async function listTasksController(req, res) {
  try {
    // Extract query parameters for filtering (e.g., isCompleted)
    const { isCompleted } = req.query;

    // Create a filter object based on query parameters
    const filter = {};
    if (isCompleted !== undefined) {
      filter.completed = isCompleted === 'true';
    }
    // destruct the tasks and total number of tasks from service
    const { tasks, totalTasks } = await listTasks(filter);
    res.status(200).json({ total: totalTasks, message: "Total tasks", data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error listing tasks' });
  }
}

// controller to update a task on complete/incomplete
export async function updateTaskController(req, res) {
  try {
    const { taskId } = req.params;
    const { isCompleted } = req.body;
    const updatedTask = await updateTask(taskId, isCompleted);
    res.status(200).json({data:updatedTask , message:"updated task"});
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Task not found' });
  }
}

// controller to delete task
export async function deleteTaskController(req, res) {
  try {
    const { taskId } = req.params;
    const deletedTask = await deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted successfully', data: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Task not found' });
  }
}
