/*
  axios의 요청 인스턴스 기본 설정
*/

import axios, { AxiosRequestConfig } from "axios";

import { SERVER_HOST } from "./constants";

// 서버와 쿠키 주고 받을 시 필요한 설정.
axios.defaults.withCredentials = true;

// 로컬 스토리지에 저장된 jwt 토큰을 가져오는 함수.
function getToken() {
  const token = localStorage.getItem("token");

  if (!token) return "";
  return token;
}

// Authorization 요청 헤더에 jwt 토큰 설정.
function getJWTHeader(userToken: string): Record<string, string> {
  return { Authorization: `Bearer ${userToken}` };
}

// axios 인스턴스 반환하는 함수.
const getAxiosInstance = () => {
  const config: AxiosRequestConfig = {
    baseURL: SERVER_HOST,
    headers: getJWTHeader(getToken()),
  };

  return axios.create(config);
};

export default getAxiosInstance;
