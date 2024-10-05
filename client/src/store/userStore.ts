import axios from "axios";
import { create } from "zustand";
import { usersState, user } from "../types/usersType";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

export const useUserStore = create<usersState>((set) => ({
  loading: false,
  error: "",
  usersData: {
    total: 1,
    page: 1,
    totalPage: 1,
    users: [],
  },

  // Fetch users based on given parameters
  getUsers: async (params) => {
    set({ loading: true });

    try {
      const response = await axios.get(`${Api_Url}users/get/`, { params });
      set({ usersData: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching users data:", error);
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  // Add a new user
  addUsers: async (newUser: user) => {
    try {
      const response = await axios.post(`${Api_Url}/users/add`, newUser);
      set((state) => ({
        usersData: {
          ...state.usersData,
          users: [...state.usersData.users, response.data],
        },
      }));
    } catch (error) {
      // Check if the error is an AxiosError and has a response
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          set({ error: "User already exists" });
        }
      } else {
        console.error("Error adding user:", error);
        set({ error: "Error adding user" });
      }
    }
  },
}));
