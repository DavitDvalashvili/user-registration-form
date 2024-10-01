import axios from "axios";
import { create } from "zustand";
import { usersState } from "../types/usersType";

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
}));
