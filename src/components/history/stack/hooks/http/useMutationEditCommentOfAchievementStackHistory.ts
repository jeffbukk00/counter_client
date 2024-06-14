import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// achievementStackHistory의 comment를 수정하는 비동기 요청.
const editCommentOfAchievementStackHistory = (achievementStackId: string) => {
  return async (updatedComment: string) => {
    return await axiosInstance().patch(
      api.history.editCommentOfAchievementStackHistory(achievementStackId),
      { updatedComment }
    );
  };
};

// achievementStackHistory의 comment를 수정하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationEditCommentOfAchievementStackHistory = (
  achievementStackId: string,
  finishEditing: () => void
) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { inactivateModal } = useNotBoxLoadingContext();

  const queryClient = useQueryClient();
  const { mutate: mutateEditCommentOfAchievementStackHistory } = useMutation({
    mutationFn: editCommentOfAchievementStackHistory(achievementStackId),
    onSuccess: () => {
      // achievementStackHistory의 comment를 수정하는 비동기 요청이 성공 했을 시,
      // 해당 achievementStackHistory의 데이터를 불러오는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.history.useQueryAchievementStackHistory(achievementStackId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // comment 수정 종료.
      finishEditing();
    },
    onError: () => {
      // achievementStackHistory의 comment를 수정하는 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("성취 스택에 대한 코멘트 수정에 실패했습니다");

      // comment 수정 종료.
      finishEditing();
    },
  });

  return { mutateEditCommentOfAchievementStackHistory };
};

export default useMutationEditCommentOfAchievementStackHistory;
