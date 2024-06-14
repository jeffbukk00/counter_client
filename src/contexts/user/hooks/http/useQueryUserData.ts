import { useQuery } from "@tanstack/react-query";

import { UserContextType } from "@/contexts/user/types";
import axiosInstance from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

// 유저 정보를 불러오는 비동기 요청.
const getUserData: () => Promise<{ userData: UserContextType }> = async () => {
  const { data } = await axiosInstance().get(api.user.getUserData);
  return data;
};

// 유저 정보를 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryUserData = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.user.useQueryUserData,
    queryFn: getUserData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { userData: data?.userData, isLoading };
};

export default useQueryUserData;
