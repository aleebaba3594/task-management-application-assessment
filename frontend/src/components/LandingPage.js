import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

export default function LandingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {/* task form component  */}
          <TaskForm />
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="w-12 px-6 sm:w-16 sm:px-8">
                      &nbsp;
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-center text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="text-center px-3 py-3.5 text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="text-center px-3 py-3.5 text-sm font-semibold text-gray-900"
                    >
                      Status
                      {/* task filter component  */}
                      <TaskFilter />
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* task list component  */}
                  <TaskList />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
