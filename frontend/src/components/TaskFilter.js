import React, { useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { fetchSortedTasks } from "../redux/slice/taskSlice";
import { useDispatch } from "react-redux";

function TaskFilter() {
  const [isCompletedSorted, setIsCompletedSorted] = useState(true);
  const dispatch = useDispatch();

  // function to handle sorted tasks
  const handleSortTasks = () => {
    setIsCompletedSorted(!isCompletedSorted);
    dispatch(fetchSortedTasks(isCompletedSorted));
  };

  return (
    <>
      <BsArrowDownCircle
        className={`inline-block h-4 w-4 ml-1 cursor-pointer ${
          isCompletedSorted ? "rotate-180" : ""
        }`}
        onClick={handleSortTasks}
      />
    </>
  );
}

export default TaskFilter;
