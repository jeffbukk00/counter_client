import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";

const uploadShareLink: (
  bucketId: string
) => Promise<{ shareLink: string }> = async (bucketId) => {
  const { data } = await axiosInstance.post(api.sharing.uploadShareLink, {
    bucketId,
  });
  return data;
};

const useMutationUploadShareLink = (
  onCreationSuccessHandler: (shareLink: string) => void
) => {
  const {
    mutate: mutateUploadShareLink,

    isPending,
  } = useMutation({
    mutationFn: uploadShareLink,
    onSuccess: (data) => {
      if (data) {
        onCreationSuccessHandler(data.shareLink);
      }
    },
  });

  return { mutateUploadShareLink, isPending };
};

export default useMutationUploadShareLink;