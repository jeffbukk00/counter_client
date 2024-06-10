import axiosInstance from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CountHistoryType } from "../../types";

const getCountHistoryAll: (achievementStackId: string) => Promise<{
  countHistoryAll: CountHistoryType[];
}> = async (achievementStackId) => {
  const { data } = await axiosInstance().get(
    api.history.getCountHistoryAll(achievementStackId)
  );

  return data;
};

const useQueryCountHistoryAll = (achievementStackId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: queryKeys.history.useQueryCountsHistoryAll(achievementStackId),
    queryFn: () => getCountHistoryAll(achievementStackId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      openAsyncError(
        "선택한 성취 스택 히스토리 정보를 가져오는데 실패했습니다"
      );
    }
  }, [isError, openAsyncError]);

  return { countHistoryAll: data?.countHistoryAll, isFetching, isLoading };
};

export default useQueryCountHistoryAll;
