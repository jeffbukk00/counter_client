import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useEffect } from "react";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const getCounterIds: (
  bucketId: string
) => Promise<{ counterIds: string[] }> = async (bucketId) => {
  const { data } = await axiosInstance.get(api.counter.getCounterIds(bucketId));
  return data;
};

const useQueryCounterIds = (bucketId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
    queryFn: () => getCounterIds(bucketId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError("카운터들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { counterIds: data?.counterIds, isLoading, isFetching };
};

export default useQueryCounterIds;
