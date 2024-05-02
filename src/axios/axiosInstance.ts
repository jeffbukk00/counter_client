import axios, { AxiosRequestConfig } from "axios";

import { SERVER_HOST } from "./constants";

axios.defaults.withCredentials = true;

export function getJWTHeader(userToken: string): Record<string, string> {
  return { Authorization: `Bearer ${userToken}` };
}

const config: AxiosRequestConfig = { baseURL: SERVER_HOST };
export const axiosInstance = axios.create(config);
