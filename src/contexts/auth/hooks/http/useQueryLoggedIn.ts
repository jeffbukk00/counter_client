import { useQuery } from "@tanstack/react-query";

import { AuthContextType } from "@/contexts/auth/types";
import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

const getLoggedIn: () => Promise<AuthContextType> = async () => {
  const { data } = await axiosInstance.get(api.auth.getLoggedIn);
  return data;
};

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
