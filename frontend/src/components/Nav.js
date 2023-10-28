import { Disclosure, Menu } from "@headlessui/react";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";

export default function Nav() {
  const darkMode = useSelector((state) => state.tasks.darkMode);

  return (
    <Disclosure
      as="nav"
      className={`${darkMode ? "bg-dark text-dark" : "bg-light text-light"}`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center justify-start">
              <h1
                className={`${
                  darkMode ? "bg-dark text-dark" : "bg-light text-light"
                } font-bold `}
              >
                Task Management App
              </h1>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              {/* dark mode toggle component  */}
              <DarkModeToggle />
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
