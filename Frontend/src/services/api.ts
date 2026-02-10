import axios from "axios";

export const uploadVideo = (formData: FormData) => {
 

  return axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
};





