import { axiosInstance } from "@/axios/axiosInstance";

export const handleGoogleLogin = async () => {
  const {
    data: { loginUrl },
  } = await axiosInstance.get("/auth/oauth/url/google");

  window.location.assign(loginUrl);
};

export const handleNaverLogin = async () => {
  const {
    data: { loginUrl },
  } = await axiosInstance.get("/auth/oauth/url/naver");

  window.location.assign(loginUrl);
};

export const handleKakaoLogin = async () => {
  const {
    data: { loginUrl },
  } = await axiosInstance.get("/auth/oauth/url/kakao");

  window.location.assign(loginUrl);
};
