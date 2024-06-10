import axios, { AxiosRequestConfig } from "axios";

import { SERVER_HOST } from "./constants";

axios.defaults.withCredentials = true;

function getToken() {
  const token = localStorage.getItem("token");

  if (!token) return "";
  return token;
}

function getJWTHeader(userToken: string): Record<string, string> {
  return { Authorization: `Bearer ${userToken}` };
}

const getAxiosInstance = () => {
  const config: AxiosRequestConfig = {
    baseURL: SERVER_HOST,
    headers: getJWTHeader(getToken()),
  };

  return axios.create(config);
};

export default getAxiosInstance;
