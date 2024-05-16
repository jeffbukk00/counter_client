import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const editMotivationLink = (motivationLinkId: string) => {
  return async (motivationLinkData: { title: string; link: string }) => {
    return axiosInstance.put(
      api.motivationLink.editMotivationLink(motivationLinkId),
      { title: motivationLinkData.title, link: motivationLinkData.link }
    );
  };
};

const useMutationEditMotivationLink = (
  motivationLinkId: string,
  boxId: string
) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateEditMotivationLink } = useMutation({
    mutationFn: editMotivationLink(motivationLinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.motivationLink.useQueryMotivationLink(motivationLinkId),
      });
      inactivate(boxId);
    },
    onError: () => {
      inactivate(boxId);
      openAsyncError("모티베이션 링크 수정에 실패했습니다");
    },
  });

  return { mutateEditMotivationLink };
};

export default useMutationEditMotivationLink;
