import axios from "axios";
export const axiosUser = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

axiosUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("CarFaxUser");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const axiosUsa = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_USAVINAPI_URL}/`,
});

export const axiosKorea = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_KOREAVINAPI_URL}/`,
});