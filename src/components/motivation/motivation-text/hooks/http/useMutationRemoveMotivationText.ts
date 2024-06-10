import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const removeMotivationText = async (
  boxId: string,
  boxType: number,
  motivationTextId: string
) => {
  return await axiosInstance().delete(
    api.motivationText.removeMotivationText(boxId, boxType, motivationTextId)
  );
};

const useMutationRemoveMotivationText = (
  boxId: string,
  boxType: number,
  motivationTextId: string
) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveMotivationText } = useMutation({
    mutationFn: () => removeMotivationText(boxId, boxType, motivationTextId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationText.useQueryMotivationTextIds(
          boxId,
          boxType
        ),
      });
      inactivate(boxId);
    },
    onError: () => {
      inactivate(boxId);
      openAsyncError("모티베이션 텍스트 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveMotivationText };
};

export default useMutationRemoveMotivationText;
