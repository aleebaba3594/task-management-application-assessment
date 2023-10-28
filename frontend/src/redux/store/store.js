// store.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice/taskSlice";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    // Other reducers can be added here
  },
});

export default store;
