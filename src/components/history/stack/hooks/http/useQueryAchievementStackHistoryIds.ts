import { axiosInstance } from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const getAchievementStackHistoryIds: (
  counterId: string
) => Promise<{ achievementStackHistoryIds: string[] }> = async (counterId) => {
  const { data } = await axiosInstance.get(
    api.history.getAchievementStackHistoryIds(counterId)
  );

  return data;
};

const useQueryAchievementStackHistoryIds = (counterId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: queryKeys.history.useQueryAchievementStackHistoryIds(counterId),
    queryFn: () => getAchievementStackHistoryIds(counterId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
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
