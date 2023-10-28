import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../redux/slice/taskSlice";
import { useState } from "react";
import { Switch } from "@headlessui/react";

function DarkModeToggle() {
  const [enabled, setEnabled] = useState("");

  const darkMode = useSelector((state) => state.tasks.darkMode);
  const dispatch = useDispatch();

  // Function to handle dark mode toggle
  const handleDarkModeToggle = () => {
    dispatch(setDarkMode(!darkMode));
    setEnabled(!enabled); // Toggle the local state
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleDarkModeToggle}
      className={`${darkMode ? "bg-light text-light" : "bg-dark text-dark"}
        relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 `}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0"} ${
          darkMode ? "bg-dark text-dark" : "bg-light text-light"
        } pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
}

export default DarkModeToggle;
