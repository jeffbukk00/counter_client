import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const createMotivationText = (boxId: string, boxType: number) => {
  return async (text: string) => {
    return await axiosInstance.post(
      api.motivationText.createMotivationText(boxId, boxType),
      { text }
    );
  };
};

const useMutationCreateMotivationText = (boxId: string, boxType: number) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateCreateMotivationText } = useMutation({
    mutationFn: createMotivationText(boxId, boxType),
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
      openAsyncError("모티베이션 텍스트 생성에 실패했습니다");
    },
  });

  return { mutateCreateMotivationText };
};

export default useMutationCreateMotivationText;
