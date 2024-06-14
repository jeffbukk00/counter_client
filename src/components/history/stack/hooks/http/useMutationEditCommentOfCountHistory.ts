import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

// countHistory의 comment를 수정 하기 위한 비동기 요청.
const editCommentOfCountHistory = (countId: string) => {
  return async (updatedComment: string) => {
    return await axiosInstance().patch(
      api.history.editCommentOfCountHistory(countId),
      { updatedComment }
    );
  };
};

// countHistory의 comment를 수정 하기 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationEditCommentOfCountHistory = (
  countId: string,
  achievementStackId: string,
  finishEditing: () => void
) => {
  const { openAsyncError } = useAsyncErrorContext();

  const { inactivateModal } = useNotBoxLoadingContext();

  const queryClient = useQueryClient();
  const { mutate: mutateEditCommentOfCountHistory } = useMutation({
    mutationFn: editCommentOfCountHistory(countId),
    onSuccess: () => {
      // countHistory의 comment를 수정 하기 위한 비동기 요청이 성공 했을 시,
      // 해당 achievementStackHistory의 모든 countHistory들의 데이터를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.history.useQueryCountsHistoryAll(achievementStackId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // comment 수정 종료.
      finishEditing();
    },
    onError: () => {
      // countHistory의 comment를 수정 하기 위한 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("카운트에 대한 코멘트 수정에 실패했습니다");

      // comment 수정 종료.
      finishEditing();
    },
  });

  return { mutateEditCommentOfCountHistory };
};

export default useMutationEditCommentOfCountHistory;
