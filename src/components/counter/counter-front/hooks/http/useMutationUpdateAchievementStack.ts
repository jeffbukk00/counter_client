import axiosInstance from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateAchievementStack = (counterId: string) => {
  return async (updatedAchievementStack: number) => {
    return await axiosInstance().patch(
      api.counter.updateAchievementStack(counterId),
      { updatedAchievementStack }
    );
  };
};

const useMutationUpdateAchievementStack = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateUpdateAchievementStack } = useMutation({
    mutationFn: updateAchievementStack(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
      inactivate(counterId);
    },
    onError: () => {
      inactivate(counterId);
      openAsyncError("카운터 성취 스택 업데이트에 실패했습니다");
    },
  });

  return { mutateUpdateAchievementStack };
};

export default useMutationUpdateAchievementStack;
