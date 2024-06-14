import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// bucket에 속한 모든 counter들의 id를 불러오기 위한 비동기 요청.
const getCounterIds: (
  bucketId: string
) => Promise<{ counterIds: string[] }> = async (bucketId) => {
  const { data } = await axiosInstance().get(
    api.counter.getCounterIds(bucketId)
  );
  return data;
};

// bucket에 속한 모든 counter들의 id를 불러오기 위한 비동기 요청을 호출하는 커스텀 훅.
const useQueryCounterIds = (bucketId: string) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
    queryFn: () => getCounterIds(bucketId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // 비동기 요청 실패 시, 유저 피드백.
    if (isError) {
      openAsyncError("카운터들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return { counterIds: data?.counterIds, isLoading, isFetching };
};

export default useQueryCounterIds;
