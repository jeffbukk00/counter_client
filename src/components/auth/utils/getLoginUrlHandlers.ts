import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";

export const getOauthLoginPage = async (provider: string) => {
  const {
    data: { loginUrl },
  } = await axiosInstance().get(api.auth.getOauthLoginPage(provider));

  window.location.assign(loginUrl);
};
