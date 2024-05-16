import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const editMotivationText = (motivationTextId: string) => {
  return async (text: string) => {
    return await axiosInstance.put(
      api.motivationText.editMotivationText(motivationTextId),
      { text }
    );
  };
};

const useMutationEditMotivationText = (
  motivationTextId: string,
  boxId: string
) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateEditMotivationText } = useMutation({
    mutationFn: editMotivationText(motivationTextId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.motivationText.useQueryMotivationText(motivationTextId),
      });
      inactivate(boxId);
    },
    onError: () => {
      inactivate(boxId);
      openAsyncError("모티베이션 텍스트 수정에 실패했습니다");
    },
  });

  return { mutateEditMotivationText };
};

export default useMutationEditMotivationText;
