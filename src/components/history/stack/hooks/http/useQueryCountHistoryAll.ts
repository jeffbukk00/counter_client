import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { CountHistoryType } from "../../types";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// achievementStackHistroy의 모든 countHistory들의 데이터를 불러오기 위한 비동기 요청.
const getCountHistoryAll: (achievementStackId: string) => Promise<{
  countHistoryAll: CountHistoryType[];
}> = async (achievementStackId) => {
  const { data } = await axiosInstance().get(
    api.history.getCountHistoryAll(achievementStackId)
  );

  return data;
};

// achievementStackHistroy의 모든 countHistory들의 데이터를 불러오기 위한 비동기 요청을 호출하는 커스텀 훅.
const useQueryCountHistoryAll = (achievementStackId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: queryKeys.history.useQueryCountsHistoryAll(achievementStackId),
    queryFn: () => getCountHistoryAll(achievementStackId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError(
        "선택한 성취 스택 히스토리 정보를 가져오는데 실패했습니다"
      );
    }
  }, [isError, openAsyncError]);

  return { countHistoryAll: data?.countHistoryAll, isFetching, isLoading };
};

export default useQueryCountHistoryAll;
