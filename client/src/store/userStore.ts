import axios from "axios";
import { create } from "zustand";
import { usersState, user } from "../types/usersType";
import { showSuccess, showError } from "../toast/ToastUtils";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

export const useUserStore = create<usersState>((set) => ({
  loading: false,
  error: "",
  user: null,
  usersData: {
    total: 1,
    page: 1,
    totalPages: 1,
    users: [],
  },

  // Fetch users based on given parameters
  getUsers: async (params: { searchTerm: string; page: string }) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}users/get/`, { params });
      set({ usersData: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching users data:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch user based on given parameters
  getUser: async (id: string) => {
    set({ loading: true });

    try {
      // Fetch the user data from the server
      const response = await axios.get(`${Api_Url}users/get/${id}`);

      set({ user: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching user's data:", error);
    } finally {
      // Always stop the loading state after the fetch attempt
      set({ loading: false });
    }
  },

  // Add a new user
  addUsers: async (newUser: user) => {
    try {
      const response = await axios.post(`${Api_Url}users/add`, newUser);

      // Corrected update for usersData
      set((state) => ({
        usersData: {
          ...state.usersData, // Spread the existing usersData
          users: [...state.usersData.users, response.data],
        },
      }));
      showSuccess("მომხმარებელი დაემატა წარმატებით");
    } catch (error) {
      // Check if the error is an AxiosError and has a response
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          set({ error: "User already exists" });
        }
        showError("მომხმარებლი უკვე არსებობს");
      } else {
        console.error("Error adding user:", error);
        set({ error: "Error adding user" });
        showError("შეცდომა მომხმარებლის ინფორმაციის დამატებისას");
      }
    }
  },

  updateUser: async (user: user) => {
    try {
      const { id, ...updatedUser } = user;
      const response = await axios.put(
        `${Api_Url}users/update/${id}`,
        updatedUser
      );
      set((state) => ({
        usersData: {
          ...state.usersData,
          users: [...state.usersData.users, response.data],
        },
      }));
      showSuccess("მომხმარებლის ინფორმაცია განახლდა წარმატებით");
    } catch (error) {
      console.error("Error updating component:", error);
      showError("შეცდომა მომხმარებლის ინფორმაციის განახლებისას");
    }
  },

  deleteUser: async (id: string) => {
    try {
      await axios.delete(`${Api_Url}users/delete/${id}`);
      set((state) => ({
        usersData: {
          ...state.usersData,
          users: state.usersData.users.filter((user) => user.id !== id),
        },
      }));
      showSuccess("მომხმარებლის წაიშალა წარმატებით");
    } catch (error) {
      console.error("Error deleting user:", error);
      showError("შეცდომა მომხმარებლის წაშლისას");
    }
  },

  deleteAlternativeContact: async (params: { id: string; type: string }) => {
    const { id, type } = params;
    try {
      // Ensure that type is either 'email' or 'mobile'
      if (type !== "email" && type !== "mobile") {
        throw new Error("Invalid contact type. Use 'email' or 'mobile'.");
      }

      // Make the DELETE request to the server, passing the type as a query parameter
      await axios.delete(`${Api_Url}users/deleteContact/${id}/?type=${type}`);

      // Update the state to remove the specific contact type from the user's data
      set((state) => ({
        usersData: {
          ...state.usersData,
          users: state.usersData.users.map((user) =>
            user.id === id
              ? {
                  ...user,
                  [type === "email"
                    ? "alternative_email"
                    : "alternative_mobile_number"]: "",
                }
              : user
          ),
        },
      }));
      if (type == "email") {
        showSuccess("ალტერნატიული მეილი წარმატებით წაიშალა");
      } else {
        showSuccess("ალტერნატიული მობილურის ნომერი წარმატებით წაიშალა");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      if (type == "email") {
        showError("შეცდომა ალტერნატიული მეილის წაშლისას");
      } else {
        showSuccess("შეცდომა ალტერნატიული მობილურის ნომერი წაიშალისას");
      }
    }
  },
}));
