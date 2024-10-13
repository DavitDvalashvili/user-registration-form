import axios from "axios";
import { create } from "zustand";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

export const useUploadStore = create(() => ({
  // Upload files and update component images

  uploadImage: async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${Api_Url}uploadImage`, formData);

      // Check for successful upload
      if (response && response.status === 200) {
        const { photoUrl } = response.data;
        return photoUrl;
      }
    } catch (error) {
      // Handle Axios errors specifically
      if (axios.isAxiosError(error)) {
        // Check if it's a 400 error, which includes file size errors
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message;
          return errorMessage;
        }
      } else {
        console.error("Error uploading file:", error);
      }
    }
  },
}));
