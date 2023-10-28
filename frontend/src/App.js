import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./redux/slice/taskSlice";
import Loader from "./components/loader/Loader";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.tasks.darkMode);
  const loading = useSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      {loading === "loading" ? (
        <Loader />
      ) : (
        <div
          className={`min-h-screen ${
            darkMode ? "bg-dark text-dark" : "bg-light text-light"
          }`}
        >
          <Nav />
          <LandingPage />
        </div>
      )}
    </>
  );
}

export default App;
