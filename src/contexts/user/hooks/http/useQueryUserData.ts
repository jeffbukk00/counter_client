import { useQuery } from "@tanstack/react-query";

import { UserContextType } from "@/contexts/user/types";
import axiosInstance from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

const getUserData: () => Promise<{ userData: UserContextType }> = async () => {
  const { data } = await axiosInstance().get(api.user.getUserData);
  return data;
};

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
