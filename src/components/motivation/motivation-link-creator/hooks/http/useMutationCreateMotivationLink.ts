import axiosInstance from "@/axios/axiosInstance";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createMotivationLink = (boxId: string, boxType: number) => {
  return async (motivationLinkData: { title: string; link: string }) => {
    return await axiosInstance().post(
      api.motivationLink.createMotivationLink(boxId, boxType),
      { title: motivationLinkData.title, link: motivationLinkData.link }
    );
  };
};

const useMutationCreateMotivationLink = (boxId: string, boxType: number) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateCreateMotivationLink } = useMutation({
    mutationFn: createMotivationLink(boxId, boxType),
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
      openAsyncError("모티베이션 링크 생성에 실패했습니다");
    },
  });

  return { mutateCreateMotivationLink };
};

export default useMutationCreateMotivationLink;
