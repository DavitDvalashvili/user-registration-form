import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";

const Users = () => {
  const { getUsers, usersData } = useUserStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    getUsers({ searchTerm: `${searchTerm}`, page: `${page}` });
  }, [getUsers, searchTerm, page]);

  console.log(usersData.totalPages);

  return (
    <div className="overflow-x-auto py-10 px-[100px] ">
      <div className="flex justify-between items-center">
        <SearchBox setSearchTerm={setSearchTerm} />
        <Pagination totalPages={usersData.totalPages} setPage={setPage} />
      </div>

      {usersData?.users?.length > 0 ? (
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
                <td className="pl-6 border-b border-gray-200 align-middle">
                  <img
                    src={user.photo_url}
                    alt="profile"
                    className="h-[80px] w-[80px] rounded-full"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 align-middle">
                  {user.first_name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 align-middle">
                  {user.last_name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 align-middle">
                  {user.personal_id}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 align-middle">
                  {user.mobile_number}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-5">
                    დეტალურად
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-5">
                    რედაქტირება
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-5">
                    წაშლა
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users available</div>
      )}
    </div>
  );
};

export default Users;
