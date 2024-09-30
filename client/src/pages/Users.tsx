import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const Users = () => {
  const { id } = useParams();
  const {
    getUsers,
    //loading,
    //error,
    usersData,
  } = useUserStore();

  useEffect(() => {
    getUsers({ search_term: "", page: "" });
  }, [id, getUsers]);

  return (
    <div>
      {usersData.users.map((user) => (
        <div key={user.id}>{user.first_name}</div>
      ))}
    </div>
  );
};

export default Users;
