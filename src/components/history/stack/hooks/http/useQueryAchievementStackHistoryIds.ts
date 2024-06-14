import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// counter의 모든 achievementStackHistory들의 id를 불러오는 비동기 요청.
const getAchievementStackHistoryIds: (
  counterId: string
) => Promise<{ achievementStackHistoryIds: string[] }> = async (counterId) => {
  const { data } = await axiosInstance().get(
    api.history.getAchievementStackHistoryIds(counterId)
  );

  return data;
};

// counter의 모든 achievementStackHistory들의 id를 불러오는 비동기 요청을 호출하는 커스텀 훅.
const useQueryAchievementStackHistoryIds = (counterId: string) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.history.useQueryAchievementStackHistoryIds(counterId),
    queryFn: () => getAchievementStackHistoryIds(counterId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("성취 스택 히스토리들을 가져오는데 실패했습니다");
    }
  }, [isError, openAsyncError]);

  return {
    achievementStackHistoryIds: data?.achievementStackHistoryIds,
    isLoading,
    isFetching,
  };
};

export default useQueryAchievementStackHistoryIds;
