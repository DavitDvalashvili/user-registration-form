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
      const response = await axios.post(`${Api_Url}/uploadImage`, formData);
      if (response && response.status === 400) {
        console.error(response);
        return response.status;
      }
      if (response && response.status === 200) {
        const { photoUrl } = response.data;
        return photoUrl;
      } else {
        console.error("Upload failed or response is missing data.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  },
}));
