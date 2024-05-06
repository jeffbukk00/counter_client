import { useQuery } from "@tanstack/react-query";

import { LoggedInDataType } from "@/contexts/auth/types";
import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";

const getLoggedIn: () => Promise<LoggedInDataType> = async () => {
  const { data } = await axiosInstance.get("/auth/logged-in");
  return data;
};

const useQueryLoggedIn = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: queryKeys.useQueryLoggedIn,
    queryFn: getLoggedIn,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { authData, isLoading };
};

export default useQueryLoggedIn;