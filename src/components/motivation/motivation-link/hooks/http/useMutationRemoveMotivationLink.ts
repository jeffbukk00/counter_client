import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const removeMotivationLink = (
  boxId: string,
  boxType: number,
  motivationLinkId: string
) => {
  return axiosInstance().delete(
    api.motivationLink.removeMotivationLink(boxId, boxType, motivationLinkId)
  );
};

const useMutationRemoveMotivationLink = (
  boxId: string,
  boxType: number,
  motivationLinkId: string
) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveMotivationLink } = useMutation({
    mutationFn: () => removeMotivationLink(boxId, boxType, motivationLinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.motivationLink.useQueryMotivationLinkIds(
          boxId,
          boxType
        ),
      });
      inactivate(boxId);
    },
    onError: () => {
      inactivate(boxId);
      openAsyncError("모티베이션 링크 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveMotivationLink };
};

export default useMutationRemoveMotivationLink;
