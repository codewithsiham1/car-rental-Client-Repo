import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://your-server-url.com", // এখানে তোমার server URL দাও
    withCredentials: true,
  });

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
