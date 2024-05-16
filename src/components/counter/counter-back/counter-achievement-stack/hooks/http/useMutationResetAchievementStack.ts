import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const resetAchievementStack = async (counterId: string) => {
  return await axiosInstance.patch(
    api.counter.resetAchievementStack(counterId)
  );
};

const useMutationResetAchievementStack = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateResetAchievementStack } = useMutation({
    mutationFn: () => resetAchievementStack(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
      inactivate(counterId);
    },
    onError: () => {
      inactivate(counterId);
      openAsyncError("카운터 성취 스택 리셋에 실패했습니다");
    },
  });

  return { mutateResetAchievementStack };
};

export default useMutationResetAchievementStack;
