import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompletion } from "../redux/slice/taskSlice";
import TaskItem from "./TaskItem";
import Confirmation from "./Confirmation";

function TaskList() {
  // local State variables to control functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationTaskId, setConfirmationTaskId] = useState(null);
  const tasks = useSelector((state) => state?.tasks?.tasks);
  const dispatch = useDispatch();

  // toggle between complete and incomplete tasks
  const handleToggleCompletion = (taskId) => {
    dispatch(toggleCompletion(taskId));
  };

  // Function to open the modal
  const handleTaskItem = (task) => {
    setSelectedTask(task); // Store the selected task
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedTask(null); // Clear the selected task
    setIsModalOpen(false);
  };

  // Function to open confirmation component
  const handleConfirmation = (taskId) => {
    setConfirmationTaskId(taskId);
    setIsConfirmationOpen(true);
  };

  // Function to close confirmation component
  const closeConfirmation = () => {
    setConfirmationTaskId(null);
    setIsConfirmationOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <TaskItem
          isOpen={isModalOpen}
          onClose={closeModal}
          task={selectedTask}
        />
      )}
      {isConfirmationOpen && (
        <Confirmation
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          taskId={confirmationTaskId}
        />
      )}
      {/* listing of tasks  */}
      {tasks?.map((task) => (
        <tr key={task._id}>
          <td className="px-6 sm:w-16 sm:px-8">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={task?.completed}
              onChange={() => handleToggleCompletion(task)}
            />
          </td>
          <td
            onClick={() => {
              handleTaskItem(task);
            }}
            className={`text-center cursor-pointer whitespace-nowrap py-4 pr-3 text-sm font-medium ${
              task?.completed ? "line-through text-gray-500" : "text-gray-500"
            }`}
          >
            {task?.title}
          </td>
          <td
            onClick={() => {
              handleTaskItem(task);
            }}
            className={`text-center  cursor-pointer whitespace-nowrap px-3 py-4 text-sm ${
              task?.completed ? "line-through text-gray-500" : "text-gray-500"
            }`}
          >
            {""}
            {task?.description.length > 50
              ? `${task?.description.slice(0, 50)}...`
              : task?.description}
          </td>
          <td
            onClick={() => {
              handleTaskItem(task);
            }}
            className="text-center cursor-pointer whitespace-nowrap px-3 py-4 text-sm text-gray-500"
          >
            {task?.completed ? "completed" : "not completed"}
          </td>
          <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <RiDeleteBin6Fill
              className="mx-auto h-4 w-4 text-red-600 hover:text-red-700 cursor-pointer"
              onClick={() => {
                handleConfirmation(task?._id);
              }}
            />
          </td>
        </tr>
      ))}
    </>
  );
}

export default TaskList;
