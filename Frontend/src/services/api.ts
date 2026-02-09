import axios from "axios";

export const uploadVideo = (formData: FormData) =>
  axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
  console.log("UPLOAD URL →", `${import.meta.env.VITE_API_BASE_URL}/upload`);



  
