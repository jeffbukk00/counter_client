import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";
import { useEffect } from "react";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const getBucketIds: () => Promise<{ bucketIds: string[] }> = async () => {
  const { data } = await axiosInstance.get(api.bucket.getBucketIds);
  return data;
};

const useQueryBucketIds = () => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: queryKeys.bucket.useQueryBucketIds,
    queryFn: getBucketIds,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError("버킷들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { bucketIds: data?.bucketIds, isFetching, isLoading, isError };
};

export default useQueryBucketIds;
