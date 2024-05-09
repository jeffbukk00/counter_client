import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const getCounterIds: (
  bucketId: string
) => Promise<{ counterIds: string[] }> = async (bucketId) => {
  const { data } = await axiosInstance.get(api.counter.getCounterIds(bucketId));
  return data;
};

const useQueryCounterIds = (bucketId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
    queryFn: () => getCounterIds(bucketId),
  });

  return { counterIds: data?.counterIds, isLoading };
};

export default useQueryCounterIds;
