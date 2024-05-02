import { useQuery } from "@tanstack/react-query";

import { UserDataType } from "@/contexts/user/types";
import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";

const getUserData: () => Promise<UserDataType> = async () => {
  const { data } = await axiosInstance.get("/user/user-data");
  return data;
};

const useQueryUserData = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.useQueryUserData,
    queryFn: getUserData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { userData: data?.userData, isLoading };
};

export default useQueryUserData;
