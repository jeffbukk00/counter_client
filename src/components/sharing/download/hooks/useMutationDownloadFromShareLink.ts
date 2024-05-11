import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

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
  const queryClient = useQueryClient();
  const { mutate: mutateDownloadFromShareLink, isPending } = useMutation({
    mutationFn: downloadFromShareLink(downloadLink),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
      closeModal();
    },
  });

  return { mutateDownloadFromShareLink, isPending };
};

export default useMutationDownloadFromShareLink;
