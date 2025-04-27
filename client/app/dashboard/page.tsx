"use client"
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const {loggedInUserData} = useUser();
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Manage your app
        </h2>
      </div>
          <div className="mx-auto">
            <div className="bg-white rounded-3xl mb-5">
              <hr className="my-8" />
              <div className="grid grid-cols-2 gap-x-20">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="p-4 bg-green-100 rounded-xl">
                        <div className="font-bold text-xl text-gray-800 leading-none">
                          Good day, <br />
                          {loggedInUserData && loggedInUserData.name}
                          {loggedInUserData && loggedInUserData.role}
                        </div>
                        <div className="mt-5">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                          >
                            Start tracking
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">20</div>
                      <div className="mt-2">Orders Finished</div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">554,80€</div>
                      <div className="mt-2">Total Price</div>
                    </div>
                    <div className="col-span-2">
                      <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                        <div className="font-bold text-xl leading-none">
                          Biggest Order
                        </div>
                        <div className="mt-2">102.30€</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Last Orders</h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Number 10</div>
                        <div className="text-gray-400 text-xs">4h</div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="font-bold hover:text-yellow-800 hover:underline"
                      >
                        Blog and social posts
                      </a>
                      <div className="text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          className="text-gray-800 inline align-middle mr-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        Deadline is today
                      </div>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Grace Aroma</div>
                        <div className="text-gray-400 text-xs">7d</div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="font-bold hover:text-yellow-800 hover:underline"
                      >
                        New campaign review
                      </a>
                      <div className="text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          className="text-gray-800 inline align-middle mr-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        New feedback
                      </div>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Petz App</div>
                        <div className="text-gray-400 text-xs">2h</div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="font-bold hover:text-yellow-800 hover:underline"
                      >
                        Cross-platform and browser QA
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default Dashboard;
