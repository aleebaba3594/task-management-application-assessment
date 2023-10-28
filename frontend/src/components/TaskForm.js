import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slice/taskSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// schema for field validations
const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
});

function TaskForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    // Dispatch the addTask action to add the new task
    dispatch(addTask(values));
    // Reset the form input fields
    reset();
  };

  return (
    <form
      className="rounded-lg editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="rounded-lg title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
        placeholder="Title"
        type="text"
        {...register("title")}
      />
      {errors.title && (
        <span className=" text-red-500 -mt-4 ">{errors.title.message}</span>
      )}
      <textarea
        className="rounded-lg description bg-gray-100 sec p-3 h-16 border border-gray-300 outline-none"
        placeholder="Description"
        {...register("description")}
      />
      {errors.description && (
        <span className="field_level_error text-red-500">
          {errors.description.message}
        </span>
      )}
      <div className="buttons flex">
        <button
          type="submit"
          className="btn border-indigo-500 p-1 ont-semibold cursor-pointer ml-auto mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
