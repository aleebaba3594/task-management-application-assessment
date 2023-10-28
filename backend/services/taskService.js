import Task from "../schema/tasks.js";

// service to add tasks
export async function createTask(data) {
  try {
    const { title, description, completed } = data;
    const newTask = new Task({ title, description, completed });
    return await newTask.save();
  } catch (error) {
    throw error;
  }
}

// service to delete task
export async function deleteTask(taskId) {
  try {
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      throw new Error('Task not found');
    }
    return deletedTask;
  } catch (error) {
    throw error;
  }
}

// service to update a task on complete/incomplete
export async function updateTask(taskId, isCompleted) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: isCompleted }, { new: true });
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  } catch (error) {
    throw error;
  }
}

// service for listing tasks filtered by completion status
export async function listTasks(filter = {}) {
  try {
    const tasks = await Task.find(filter);
    const totalTasks = await Task.countDocuments(filter);
    return { tasks, totalTasks };
  } catch (error) {
    throw error;
  }
}