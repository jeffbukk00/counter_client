import { axiosInstance } from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const editCommentOfAchievementStackHistory = (achievementStackId: string) => {
  return async (updatedComment: string) => {
    return await axiosInstance.patch(
      api.history.editCommentOfAchievementStackHistory(achievementStackId),
      { updatedComment }
    );
  };
};

const useMutationEditCommentOfAchievementStackHistory = (
  achievementStackId: string,
  finishEditing: () => void
) => {
  const queryClient = useQueryClient();
  const { openAsyncError } = useAsyncErrorContext();
  const { inactivateModal } = useNotBoxLoadingContext();
  const { mutate: mutateEditCommentOfAchievementStackHistory } = useMutation({
    mutationFn: editCommentOfAchievementStackHistory(achievementStackId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.history.useQueryAchievementStackHistory(achievementStackId),
      });
      finishEditing();
      inactivateModal();
    },
    onError: () => {
      finishEditing();
      inactivateModal();
      openAsyncError("성취 스택에 대한 코멘트 수정에 실패했습니다");
    },
  });

  return { mutateEditCommentOfAchievementStackHistory };
};

export default useMutationEditCommentOfAchievementStackHistory;
