import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// 모든 bucket들을 불러오는 비동기 요청.
const getBuckets: () => Promise<{
  buckets: { _id: string; title: string }[];
}> = async () => {
  const { data } = await axiosInstance().get(api.bucket.getBuckets);

  return data;
};

// 모든 bucket들을 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryBuckets = () => {
  const { openAsyncError } = useAsyncErrorContext();

  const {
    data: bucketsData,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: queryKeys.bucket.useQueryBuckets,
    queryFn: getBuckets,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
      openAsyncError("버킷 선택 목록을 가져오는데 실패했습니다");
    }
  }, [openAsyncError, isError]);
  return { buckets: bucketsData?.buckets, isLoading, isFetching };
};

export default useQueryBuckets;
