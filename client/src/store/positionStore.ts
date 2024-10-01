import axios from "axios";
import { create } from "zustand";
import { positionsState } from "../types/positionsType";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

export const usePositionStore = create<positionsState>((set) => ({
  loading: false,
  error: "",
  positions: [],

  // Fetch users based on given parameters
  getPositions: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(`${Api_Url}positions/get/`);
      set({ positions: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching positions data:", error);
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
