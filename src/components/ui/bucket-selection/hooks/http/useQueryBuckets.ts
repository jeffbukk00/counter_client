import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { useEffect } from "react";

const getBuckets: () => Promise<{
  buckets: { _id: string; title: string }[];
}> = async () => {
  const { data } = await axiosInstance().get(api.bucket.getBuckets);

  return data;
};

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
      openAsyncError("버킷 선택 목록을 가져오는데 실패했습니다");
    }
  }, [openAsyncError, isError]);
  return { buckets: bucketsData?.buckets, isLoading, isFetching };
};

export default useQueryBuckets;
