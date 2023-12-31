import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/slice/taskSlice";

export default function Confirmation({ isOpen, onClose, taskId }) {
  const darkMode = useSelector((state) => state.tasks.darkMode);
  const dispatch = useDispatch();

  // to delete task
  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={onClose}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${
                  darkMode ? "bg-dark text-dark" : "bg-light text-light"
                }relative rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6`}
              >
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className={`text-lg leading-6 font-medium ${
                        darkMode ? "bg-dark text-dark" : "bg-light text-light"
                      }`}
                    >
                      Are you sure?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p
                        className={`text-sm ${
                          darkMode ? "bg-dark text-dark" : "bg-light text-light"
                        }`}
                      >
                        This action will not be undone
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" sm:mt-1 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteTask}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
