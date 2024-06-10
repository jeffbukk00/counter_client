import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const uploadShareLink: (
  bucketId: string
) => Promise<{ shareLink: string }> = async (bucketId) => {
  const { data } = await axiosInstance().post(api.sharing.uploadShareLink, {
    bucketId,
  });
  return data;
};

const useMutationUploadShareLink = (
  onCreationSuccessHandler: (shareLink: string) => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const { mutate: mutateUploadShareLink } = useMutation({
    mutationFn: uploadShareLink,
    onSuccess: (data) => {
      if (data) {
        inactivateModal();
        onCreationSuccessHandler(data.shareLink);
      }
    },
    onError: () => {
      inactivateModal();
      openAsyncError("공유 링크 생성에 실패했습니다");
    },
  });

  return { mutateUploadShareLink };
};

export default useMutationUploadShareLink;
