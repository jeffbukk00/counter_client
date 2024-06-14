import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// counter의 achievementStack을 리셋하는 비동기 요청.
const resetAchievementStack = async (counterId: string) => {
  return await axiosInstance().patch(
    api.counter.resetAchievementStack(counterId)
  );
};

// counter의 achievementStack을 리셋하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationResetAchievementStack = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateResetAchievementStack } = useMutation({
    mutationFn: () => resetAchievementStack(counterId),
    onSuccess: () => {
      // counter의 achievementStack을 리셋하는 비동기 요청이 성공했을 시,
      // 해당 counter에 대한 데이터를 가져 오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);
    },
    onError: () => {
      // counter의 achievementStack을 리셋하는 비동기 요청이 실패했을 시,
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);

      // 비동기 요청 실패 시, 유저 피드백.
      openAsyncError("카운터 성취 스택 리셋에 실패했습니다");
    },
  });

  return { mutateResetAchievementStack };
};

export default useMutationResetAchievementStack;
