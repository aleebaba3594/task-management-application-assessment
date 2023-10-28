// taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await api.get("/");
  return response.data.data;
});

// Async thunk to fetch sorted tasks
export const fetchSortedTasks = createAsyncThunk(
  "tasks/fetchSortedTasks",
  async (isCompleted) => {
    const response = await api.get("/", { params: { isCompleted } });
    return response.data.data;
  }
);

// Async thunk to add a task
export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await api.post("/add", newTask);
  return response.data.data;
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await api.delete(`/delete/${taskId}`);
    return taskId;
  }
);

// Async thunk to toggle completion of a task
export const toggleCompletion = createAsyncThunk(
  "tasks/toggleCompletion",
  async (taskId) => {
    const response = await api.put(`/update/${taskId._id}`, {
      isCompleted: !taskId.completed,
    });
    return response.data.data;
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    darkMode: true,
    loading: "",
    error: null,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload; // Update the darkMode state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = "succeeded"; // Update fetchTasks loading state
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = "loading"; // Update fetchTasks loading state
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = "failed"; // Update fetchTasks loading state
        state.error = action.error.message;
      })
      // Case for when fetching sorted tasks is successful
      .addCase(fetchSortedTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = "succeeded"; // Update fetchSortedTasks loading state
      })
      // Case for when fetching sorted tasks is rejected
      .addCase(fetchSortedTasks.rejected, (state, action) => {
        // state.loading = 'failed'; // Update fetchSortedTasks loading state
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = "succeeded"; // Update addTask loading state
      })
      .addCase(addTask.pending, (state) => {
        state.loading = "loading"; // Update addTask loading state
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = "failed"; // Update addTask loading state
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.loading = "succeeded"; // Update deleteTask loading state
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = "loading"; // Update deleteTask loading state
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = "failed"; // Update deleteTask loading state
        state.error = action.error.message;
      })
      .addCase(toggleCompletion.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === updatedTask._id
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
          state.loading = "succeeded"; // Update toggleCompletion loading state
        }
      })
      .addCase(toggleCompletion.pending, (state) => {
        state.loading = "loading"; // Update toggleCompletion loading state
      })
      .addCase(toggleCompletion.rejected, (state, action) => {
        state.loading = "failed"; // Update toggleCompletion loading state
        state.error = action.error.message;
      });
  },
});

export const { setDarkMode } = taskSlice.actions;
export default taskSlice.reducer;
