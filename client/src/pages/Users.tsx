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
    <div>
      {usersData.users.map((user) => (
        <div key={user.id}>{user.first_name}</div>
      ))}
    </div>
  );
};

export default Users;
