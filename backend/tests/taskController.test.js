import {
  listTasksController,
  updateTaskController,
  deleteTaskController
} from '../controllers/taskController.js';

import { createTaskController } from '../controllers/taskController.js';
import { createTask } from '../services/taskService.js';
import { deleteTask, listTasks, updateTask } from '../services/taskService.js';

// Mocking the service functions
jest.mock('../services/taskService.js');

describe('Task Controller Tests', () => {
  test('createTaskController should create a new task', async () => {
    const req = {
      body: {
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createTask.mockResolvedValue({
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
    });

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: expect.any(Object), message: 'Task created successfully' });
  });

  test('listTasksController should list tasks', async () => {
    const req = {
      query: {
        isCompleted: 'false', // Example query parameter
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the listTasks function to return a sample result
    listTasks.mockResolvedValue({ tasks: [], totalTasks: 0 });

    await listTasksController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ total: 0, message: 'Total tasks', data: [] });
  });

  test('updateTaskController should update a task', async () => {
    const req = {
      params: {
        taskId: 'sampleTaskId', // Example task ID
      },
      body: {
        isCompleted: true, // Example request body
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the updateTask function to return a sample result
    updateTask.mockResolvedValue({
      _id: 'sampleTaskId',
      title: 'Sample Task',
      description: 'Sample Description',
      completed: true,
    });

    await updateTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: expect.objectContaining({ _id: 'sampleTaskId' }),
      message: 'updated task',
    });
  });

  test('deleteTaskController should delete a task', async () => {
    const req = {
      params: {
        taskId: 'sampleTaskId', // Example task ID
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the deleteTask function to return a sample result
    deleteTask.mockResolvedValue({
      _id: 'sampleTaskId',
      title: 'Sample Task',
      description: 'Sample Description',
      completed: false,
    });

    await deleteTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task deleted successfully',
      data: expect.objectContaining({ _id: 'sampleTaskId' }),
    });
  });
});
