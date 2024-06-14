import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

// shareLink로부터 공유 된 bucket을 다운로드 받는 비동기 요청.
const downloadFromShareLink = (downloadLink: string) => {
  return async (downloadType: number) => {
    return await axiosInstance().post(
      api.sharing.downloadFromShareLink(downloadLink, downloadType)
    );
  };
};

// shareLink로부터 공유 된 bucket을 다운로드 받는 비동기 요청을 담고 있는 커스텀 훅.
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
      // shareLink로부터 공유 된 bucket을 다운로드 받는 비동기 요청이 성공 했을 시,
      // bucket들을 불러오는 비동기 요청들의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // sharing modal 닫기.
      closeModal();
    },
    onError: () => {
      // shareLink로부터 공유 된 bucket을 다운로드 받는 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("공유 링크로부터 버킷을 다운로드 받는데 실패했습니다");
    },
  });

  return { mutateDownloadFromShareLink, isPending };
};

export default useMutationDownloadFromShareLink;
