import { useEffect, useState } from "react";
import { useFetch } from "@/utils/hooks/useFetch";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = useFetch(
    `${import.meta.env.VITE_SERVER_URL}/user/getusers`
  );

  useEffect(() => {
    try {
      const { loading, data, error } = fetchUsers;
      if (!loading && !error && data && data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [fetchUsers]);

  return (
    <div className="users-list-container w-2/4 my-12 mx-auto bg-white rounded-xl shadow-lg p-5 overflow-y-auto max-h-80 transition-transform transform ease-in hover:shadow-xl hover:transition-all hover:ease-in-out">
      <h1 className="text-2xl text-gray-800 text-center mb-5">
        All Users List
      </h1>
      <div className="grid gap-4 ">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md transition-transform transform ease-in"
          >
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-600">
                {user.username}
              </span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </div>
            {/* used to open a modal that updates the user details */}
            {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md transition-colors ease-in">
              View Details
            </button> */}
            <span className="text-lg font-bold text-gray-600">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
