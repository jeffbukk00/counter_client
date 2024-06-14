import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// shareLink를 생성하는 비동기 요청.
const uploadShareLink: (
  bucketId: string
) => Promise<{ shareLink: string }> = async (bucketId) => {
  const { data } = await axiosInstance().post(api.sharing.uploadShareLink, {
    bucketId,
  });
  return data;
};

// shareLink를 생성하는 비동기 요청을 담고 있는 커스텀 훅.
const useMutationUploadShareLink = (
  onCreationSuccessHandler: (shareLink: string) => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const { mutate: mutateUploadShareLink } = useMutation({
    mutationFn: uploadShareLink,
    onSuccess: (data) => {
      if (data) {
        // shareLink를 생성하는 비동기 요청이 성공 했을 시,
        // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
        inactivateModal();

        // 성공 시 호출하고자 했던 함수 호출.
        onCreationSuccessHandler(data.shareLink);
      }
    },
    onError: () => {
      // shareLink를 생성하는 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
      openAsyncError("공유 링크 생성에 실패했습니다");
    },
  });

  return { mutateUploadShareLink };
};

export default useMutationUploadShareLink;
