import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

const downloadFromShareLink = (downloadLink: string) => {
  return async (downloadType: number) => {
    return await axiosInstance.post(
      api.sharing.downloadFromShareLink(downloadLink, downloadType)
    );
  };
};

const useMutationDownloadFromShareLink = (
  downloadLink: string,
  closeModal: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateDownloadFromShareLink, isPending } = useMutation({
    mutationFn: downloadFromShareLink(downloadLink),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
      inactivateModal();
      closeModal();
    },
    onError: () => {
      inactivateModal();
      openAsyncError("공유 링크로부터 버킷을 다운로드 받는데 실패했습니다");
    },
  });

  return { mutateDownloadFromShareLink, isPending };
};

export default useMutationDownloadFromShareLink;
