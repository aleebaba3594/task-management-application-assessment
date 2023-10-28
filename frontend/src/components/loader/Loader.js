import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <div className="bg-blue-900 flex justify-center items-center min-h-screen">
      <HashLoader
        size={100}
        color="white"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
