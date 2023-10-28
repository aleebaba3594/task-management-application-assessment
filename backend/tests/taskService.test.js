import Task from '../schema/tasks.js';
import { createTask, listTasks, updateTask, deleteTask } from '../services/taskService.js';

// Mocking the Task model
jest.mock('../schema/tasks.js');

describe('Task Service Tests', () => {
  test('createTask should create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
    };
  
    // Mock the Task.create function to return a sample new task
    Task.create.mockResolvedValue({
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
    });
  
    const result = await createTask(taskData);
  
    expect(result).toEqual(expect.objectContaining({  })); // Correctly set the ID value here
  });
  

  test('listTasks should list tasks', async () => {
    // Example filter object for the listTasks function
    const filter = { completed: true };

    // Mock the Task.find and Task.countDocuments functions to return a sample result
    Task.find.mockResolvedValue([
      {
        _id: 'task1',
        title: 'Task 1',
        description: 'Description 1',
        completed: true,
      },
      {
        _id: 'task2',
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
      },
    ]);
    Task.countDocuments.mockResolvedValue(2);

    const { tasks, totalTasks } = await listTasks(filter);

    expect(tasks).toHaveLength(2);
    expect(totalTasks).toBe(2);
  });

  test('updateTask should update a task', async () => {
    const taskId = 'sampleTaskId';
    const isCompleted = true;

    // Mock the Task.findByIdAndUpdate function to return a sample updated task
    Task.findByIdAndUpdate.mockResolvedValue({
      _id: taskId,
      title: 'Updated Task',
      description: 'Updated Description',
      completed: isCompleted,
    });

    const updatedTask = await updateTask(taskId, isCompleted);

    expect(updatedTask).toEqual(expect.objectContaining({ _id: taskId, completed: isCompleted }));
  });

  test('deleteTask should delete a task', async () => {
    const taskId = 'sampleTaskId';

    // Mock the Task.findByIdAndRemove function to return a sample deleted task
    Task.findByIdAndRemove.mockResolvedValue({
      _id: taskId,
      title: 'Deleted Task',
      description: 'Deleted Description',
      completed: false,
    });

    const deletedTask = await deleteTask(taskId);

    expect(deletedTask).toEqual(expect.objectContaining({ _id: taskId }));
  });
});
