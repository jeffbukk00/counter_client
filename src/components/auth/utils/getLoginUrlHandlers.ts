import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";

// (oauth) 플랫폼 로그인 페이지로 이동하기 위한 URL을 서버로부터 얻기 위한 비동기 요청.
export const getOauthLoginPage = async (provider: string) => {
  const {
    data: { loginUrl },
  } = await axiosInstance().get(api.auth.getOauthLoginPage(provider));

  // 비동기 요청 성공 시, 응답 받은 URL을 할당하여, 플랫폼 로그인 페이지로 이동.
  window.location.assign(loginUrl);
};
