import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// 모든 bucket들의 id를 가져오는 비동기 요청.
const getBucketIds: () => Promise<{ bucketIds: string[] }> = async () => {
  const { data } = await axiosInstance().get(api.bucket.getBucketIds);
  return data;
};

// 모든 bucket들의 id를 가져오는 비동기 요청을 보내는 커스텀 훅.
const useQueryBucketIds = () => {
  const { openAsyncError } = useAsyncErrorContext();

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: queryKeys.bucket.useQueryBucketIds,
    queryFn: getBucketIds,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청에서 에러 발생 시 유저 피드백.
      openAsyncError("버킷들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { bucketIds: data?.bucketIds, isFetching, isLoading, isError };
};

export default useQueryBucketIds;
