import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

const Users = () => {
  const {
    getUsers,
    //loading,
    //error,
    usersData,
  } = useUserStore();

  useEffect(() => {
    getUsers({ search_term: "", page: "" });
  }, [getUsers]);

  return (
    <div className="overflow-x-auto py-10 px-[60px] ">
      <table className="min-w-full bg-white mt-10">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              პროფილის ფოტო
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              სახელი
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              გვარი
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              პირადი ნომერი
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              მობილურის ნომერი
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {usersData.users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 border-b border-gray-200">
                <img
                  src={user.photo_url}
                  alt="profile"
                  className="h-[80px] w-[80px] rounded-full"
                />
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.first_name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.last_name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.personal_id}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.mobile_number}
              </td>
              <td className="px-6 py-[50px] border-b border-gray-200 flex gap-5 justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  დეტალურად
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  რედაქტირება
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  წაშლა
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
