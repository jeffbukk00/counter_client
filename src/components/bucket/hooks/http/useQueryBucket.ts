import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { queryKeys } from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const getBucket: (
  bucketId: string
) => Promise<{ bucket: { title: string } }> = async (bucketId) => {
  const { data } = await axiosInstance.get(api.bucket.getBucket(bucketId));
  return data;
};

const useQueryBucket = (bucketId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.bucket.useQueryBucket(bucketId),
    queryFn: () => getBucket(bucketId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError("버킷을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { bucketData: data?.bucket, isFetching, isLoading };
};

export default useQueryBucket;
