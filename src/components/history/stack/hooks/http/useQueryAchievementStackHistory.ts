import axiosInstance from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const getAchievementStackHistory: (achievementStackId: string) => Promise<{
  achievementStack: {
    _id: string;
    isAchieved: boolean;
    stack: number;
    comment: string;
    createdAt: Date;
    achievedAt: Date | null;
    latestCountAt: Date | null;
  };
}> = async (achievementStackId) => {
  const { data } = await axiosInstance().get(
    api.history.getAchievementStackHistory(achievementStackId)
  );

  return data;
};

const useQueryAchievementStackHistory = (achievementStackId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey:
      queryKeys.history.useQueryAchievementStackHistory(achievementStackId),
    queryFn: () => getAchievementStackHistory(achievementStackId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError(
        "선택한 성취 스택 히스토리 정보를 가져오는데 실패했습니다"
      );
    }
  }, [isError, openAsyncError]);

  return {
    achievementStackHistory: data?.achievementStack,
    isLoading,
    isFetching,
  };
};

export default useQueryAchievementStackHistory;
