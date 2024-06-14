import { useQuery } from "@tanstack/react-query";

import { AuthContextType } from "@/contexts/auth/types";
import axiosInstance from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

// 유저의 로그인 여부를 확인하기 위한 비동기 요청.
const getLoggedIn: () => Promise<AuthContextType> = async () => {
  const { data } = await axiosInstance().get(api.auth.getLoggedIn);
  return data;
};

// 유저의 로그인 여부를 확인하기 위한 비동기 요청을 호출하는 커스텀 훅.
const useQueryLoggedIn = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: queryKeys.auth.useQueryLoggedIn,
    queryFn: getLoggedIn,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { authData, isLoading };
};

export default useQueryLoggedIn;
