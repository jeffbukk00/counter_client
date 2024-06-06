import { axiosInstance } from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const editCommentOfCountHistory = (countId: string) => {
  return async (updatedComment: string) => {
    return await axiosInstance.patch(
      api.history.editCommentOfCountHistory(countId),
      { updatedComment }
    );
  };
};

const useMutationEditCommentOfCountHistory = (
  countId: string,
  achievementStackId: string,
  finishEditing: () => void
) => {
  const queryClient = useQueryClient();
  const { openAsyncError } = useAsyncErrorContext();
  const { inactivateModal } = useNotBoxLoadingContext();
  const { mutate: mutateEditCommentOfCountHistory } = useMutation({
    mutationFn: editCommentOfCountHistory(countId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.history.useQueryCountsHistoryAll(achievementStackId),
      });
      finishEditing();
      inactivateModal();
    },
    onError: () => {
      finishEditing();
      inactivateModal();
      openAsyncError("카운트에 대한 코멘트 수정에 실패했습니다");
    },
  });

  return { mutateEditCommentOfCountHistory };
};

export default useMutationEditCommentOfCountHistory;
