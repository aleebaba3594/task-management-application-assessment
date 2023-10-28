import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  setDarkMode,
  fetchTasks,
  addTask,
  deleteTask,
  toggleCompletion,
} from "./taskSlice";

describe("Task Slice Tests", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
    });
  });

  it("should set dark mode", () => {
    store.dispatch(setDarkMode(true));
    const darkMode = store.getState().darkMode;
    expect(darkMode).toBe(true);
  });

  it("should fetch tasks successfully", () => {
    // Mock the API response (You should use a mocking library or mock implementation)
    const mockTasks = [{ id: 1, title: "Task 1" }];

    // Dispatch the action
    store.dispatch(fetchTasks.fulfilled(mockTasks));

    // Check the state after dispatch
    const tasks = store.getState().tasks;
    expect(tasks).toEqual(mockTasks);
  });

  it("should add a task successfully", () => {
    const newTask = { title: "New Task" };

    store.dispatch(addTask.fulfilled(newTask));

    const tasks = store.getState().tasks;
    expect(tasks).toContainEqual(newTask);
  });

  it("should delete a task successfully", () => {
    const taskIdToDelete = 1;
    const initialTasks = [{ id: 1 }];

    // Set initial tasks in the state
    store.dispatch(fetchTasks.fulfilled(initialTasks));

    // Dispatch the action to delete a task
    store.dispatch(deleteTask.fulfilled(taskIdToDelete));

    // Check that the task is removed from the state
    const tasks = store.getState().tasks;
    expect(tasks).not.toContainEqual({ id: taskIdToDelete, title: "Task 1" });
  });
});
